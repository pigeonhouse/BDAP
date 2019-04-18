package com.bigdataplayground.demo.MolulesSpark;

import com.bigdataplayground.demo.MolulesSpark.util.HdfsClient;
import com.bigdataplayground.demo.MolulesSpark.util.LivyContact;
import com.bigdataplayground.demo.MolulesSpark.util.ToolSet;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
     * 暂时用来处理hdfs的相关操作
     * 目前的功能是返回HDFS目录结构
     * 返回一个jsonlist，json里面包含了文件或者目录信息，如果是目录的话，subDirectory里面是子目录的jsonList
     * 直接输出太丑了，因此每个文件单独输出一个json
     * 目前json有点问题（引号，反斜杠输出有点不受控），先暂时手动replace一下。
     *
     * 由于上面的问题，文件名中不能含有 反斜杠(\)、引号("")、花括号({})
     * @return
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(path={"/hdfs"}, method = {RequestMethod.POST,RequestMethod.GET})
    public String hdfs(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException {
        String optKind = request.getParameter("kind");
        String objPath = request.getParameter("path");
        String userName = request.getParameter("user");
        HdfsClient hdfsClient = new HdfsClient("hdfs://" + hdfsAddr,userName);
        switch (optKind) {
            case "tree": {
                List<String> fileList = hdfsClient.getAllFilePath(new org.apache.hadoop.fs.Path(objPath));
                //jackson会不断在里面加入反斜杠，为自己的反斜杠加入反斜杠，子子孙孙无穷尽
                String jsonFileList = fileList.toString();
                jsonFileList = jsonFileList.replace("\\", "")
                        .replace("\"{", "{")
                        .replace("}\"", "}");
                //这虽然不符合JSON标准，而且如果含有非法字符可能会报错，但目前是可用的
                return jsonFileList;
            }
            case "mkdir":
                return hdfsClient.makeDirectory(objPath);

            case "rm":
                return hdfsClient.remove(objPath);
            case "rmR"://用来递归地删除文件夹，高危操作，必须二次判，为避免误操作，只能用来删除目录，如果是文件就会报错
                return hdfsClient.removeR(objPath);

            case "upload":

            default:
                break;
        }

        return "Error Kind";
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(path = {"/run"}, method = {RequestMethod.POST})
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

