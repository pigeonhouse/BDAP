package com.bigdataplayground.demo.MolulesSpark;

import com.bigdataplayground.demo.MolulesSpark.util.HdfsClient;
import com.bigdataplayground.demo.MolulesSpark.util.LivyContact;
import com.bigdataplayground.demo.MolulesSpark.util.ToolSet;
import com.bigdataplayground.demo.controller.Node;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@RestController
@EnableAutoConfiguration
public class App {
    //配置时将appAddr改成自己的地址（只需要改这一处)。涉及到结果回传，因此不能用127.0.0.1
    private String appAddr = "10.122.217.207:5000"; //后端所在地址（本机地址)
    private String livyAddr = "10.105.222.90:8998"; //livy 服务器+端口
    private String hdfsAddr = "10.105.222.90:9000"; //HDFS namenode

    private HttpServletResponse response;
    private ObjectMapper objectMapper = new ObjectMapper();
    private String runningData;
    private String inputData;

    @RequestMapping(path={"/"}, method = {RequestMethod.POST,RequestMethod.GET})
    String home() {
        return "yo!";
    }

    @CrossOrigin(origins = "*") //跨域请求
    @RequestMapping(path = {"/handleInput"}, method = {RequestMethod.POST})
    String handleInput(@RequestBody String body) throws IOException {

        Path path = Paths.get("src/main/scala/handleFile.scala");

        String code = String.format(ToolSet.openFile(path), body.replace("\"",""),//应该是要去除双引号的
                "http://"+appAddr+"/inputPost");//App.java所在主机地址
        //提交scala
        LivyContact.postCode(livyAddr,code);

        return inputData;
    }

    @RequestMapping(path = {"/RunningPost"}, method = {RequestMethod.POST})
    public String runningPost(@RequestBody String body){
        runningData = body;
        System.out.println(body);
        return "received";
    }

    @RequestMapping(path = {"/inputPost"}, method = {RequestMethod.POST})
    public String inputPost(@RequestBody String body){
        inputData = body;
        System.out.println(body);
        return "received";
    }

    /**
     * 处理hdfs的相关操作，因为大部分操作不幂等，所以只接受POST
     * 目前的功能有：
     * String param
     * String kind 功能
     *
     * tree 目录/文件结构，返回一个jsonlist，json里面包含了文件/目录信息，如果是目录的话，subDirectory里面是子目录的jsonList
     * mkdir 创建目录，返回成功信息
     * rm 删除文件/目录，param = R时递归地删除目录，param 时可以删除文件和空目录 返回成功信息
     * read 读文件，返回文件内容
     * save 写文件，文件内容在content="",不加入content或content=""创建空文件，类似于touch
     *      param = O (Big O) 时支持覆盖，否则不支持。 返回成功信息
     *
     * upload 从本地上传文件 例如从 src/main/scala/handleFile.scala 上传至 ./test/1.scala

     * String user 用户名 确定了权限和./的位置（对了，多用户存储的时候需要传入读写权限，现在先不考虑这个。。)
     * String path 目录或文件路径 示例：
     *              /dst/src.txt    ./dst.txt   得到      ./dst.txt       上传并重命名
     *              /dst/src.txt    ./          得到      ./src.txt       上传至目录（同名)
     *              也就是 目标路径path 可以是一个未创建的文件名或者是已创建的目录（不能是未创建的目录)
     * String localPath 上传文件的本地路径
     *
     * 文件名中不能含有 反斜杠(\)、引号("")、花括号({})
     * @return
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/hdfs")
    @ResponseBody
    public String hdfs(@RequestBody @Valid HdfsOptRequest hdfsOptRequest)
            throws URISyntaxException, IOException, InterruptedException {

        if(hdfsOptRequest.getPath()==null) return "Error:path = null!";
        if(hdfsOptRequest.getUser()==null) return "Error:user = null!";
        if(hdfsOptRequest.getKind()==null) return "Error:kind = null!";

        HdfsClient hdfsClient = new HdfsClient("hdfs://" + hdfsAddr,hdfsOptRequest.getUser());
        switch (hdfsOptRequest.getKind()) {
            case "tree": {
                List<String> fileList = hdfsClient.getAllFilePath(
                        new org.apache.hadoop.fs.Path(hdfsOptRequest.getPath())
                );
                //jackson会不断在里面加入反斜杠，为自己的反斜杠加入反斜杠，子子孙孙无穷尽
                String jsonFileList = fileList.toString();
                jsonFileList = jsonFileList.replace("\\", "")
                        .replace("\"{", "{")
                        .replace("}\"", "}");
                //这虽然不符合JSON标准，而且如果含有非法字符可能会报错，但目前是可用的
                return jsonFileList;
            }
            case "mkdir":
                return hdfsClient.makeDirectory(hdfsOptRequest.getPath());
            case "rm"://R:递归地删除文件夹，高危操作，要让用户确定一下。为避免误操作，删除文件时不能加参数。
                if(hdfsOptRequest.getParam().equals("R")) {
                    return hdfsClient.removeR(hdfsOptRequest.getPath());
                }else{
                    return hdfsClient.remove(hdfsOptRequest.getPath());
                }
            case "read":
                return hdfsClient.readFile(hdfsOptRequest.getPath());
            case "save":
                if(hdfsOptRequest.getContent()==null) hdfsOptRequest.setContent("");
                boolean override = (hdfsOptRequest.getPath()!=null && hdfsOptRequest.getParam().equals("O"));
                return hdfsClient.saveFile(hdfsOptRequest.getPath(),hdfsOptRequest.getContent(),override);
            case "upload":
                return hdfsClient.uploadFromLocal(hdfsOptRequest.getPath(),hdfsOptRequest.getLocalPath());
            default:
                break;
        }

        return "Error Kind";
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(path = {"/run"}, method = {RequestMethod.POST})
    @ResponseBody
    public String run(@RequestBody String body) throws IOException {

        SparkExecutor sparkExecutor = new SparkExecutor(livyAddr,appAddr);

        System.out.println(body);
        //此处要用TypeReference，用list.class会出错
        List<Node> nodeList= objectMapper.readValue(body,new TypeReference<List<Node>>(){});
        System.out.println(nodeList);

        List<List<Object>>finalData = new ArrayList<>();

        for(Node node : nodeList){
            System.out.println(node.getLabel()+" is running");

            sparkExecutor.executeNode(node);

            if(!node.getLabel().equals("hdfsFile")){
                List<Object> tmp = new ArrayList<>();
                //不加双引号会识别不了
                tmp.add("\""+node.getId()+"\"");
                tmp.add(runningData);

                System.out.println("#Result of "+node.getLabel()+"#");
                System.out.println(tmp);
                finalData.add(tmp);
            }
        }

        System.out.println("#finalData sent to front#");
        System.out.println(finalData.toString());

        return finalData.toString();
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}

