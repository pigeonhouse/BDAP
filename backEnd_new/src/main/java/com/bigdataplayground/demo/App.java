package com.bigdataplayground.demo;

import com.bigdataplayground.demo.MolulesSpark.ApiResult;
import com.bigdataplayground.demo.MolulesSpark.HdfsOptRequest;
import com.bigdataplayground.demo.MolulesSpark.SparkExecutor;
import com.bigdataplayground.demo.MolulesSpark.util.HdfsClient;
import com.bigdataplayground.demo.MolulesSpark.util.ToolSet;
import com.bigdataplayground.demo.controller.Node;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Files;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.*;


@RestController
@SpringBootApplication
@EnableRedisHttpSession
public class App {
    /**
     * 配置步骤：
     * 1. appAddr改成自己的地址（只需要改这一处)。涉及到结果回传，因此不能用127.0.0.1
     * 2. 添加hosts
     * Win:
     * C:\Windows\System32\drivers\etc\hosts
     * MacOS/Linux:
     * /etc/hosts
     * 添加以下四行
     * 10.105.222.90   mirage17
     * 10.105.222.91   mirage18
     * 10.105.222.92   mirage19
     * 10.105.222.93   mirage20
     */

    private String appAddr = "10.122.217.207:5000"; //后端所在地址（本机地址)
    private String livyAddr = "10.105.222.90:8998"; //livy 服务器+端口
    private String hdfsAddr = "10.105.222.90:9000"; //HDFS namenode

    private ObjectMapper objectMapper = new ObjectMapper();
    private String runningData;
    private String inputData;


    @RequestMapping(path={"/"}, method = {RequestMethod.POST,RequestMethod.GET})
    String home() {
        return "yo!";
    }

    @RequestMapping(path = {"/handleInput"}, method = {RequestMethod.POST})
    String handleInput(@RequestBody String body) throws IOException, URISyntaxException, InterruptedException {
        HdfsClient hdfsClient = new HdfsClient("hdfs://" + hdfsAddr,"tseg");
        String data ;
        String path = body;
        String ext = Files.getFileExtension(path); //获取后缀名

        ApiResult result = hdfsClient.readFile("/demoData/"+body);

        if(result.getData()!=null){
             data = (String)result.getData();
        }else{
            return ApiResult.createNgMsg("File does not exist").toString();
        }
        switch (ext){
            case "csv":
                return ToolSet.readCSVFile(data);
            default:
        }
        return data;

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
     * String path 目录或文件路径
     * String localPath 上传文件的本地路径
     * 示例：        localPath       path
     *              /src.txt    ./dst.txt       （无同名文件） ——>./dst.txt       上传并重命名
     *              /src.txt    ./dst.txt       （有同名文件） ——> 上传失败
     *              /src.txt    ./              （目录存在）   ——>  ./src.txt     上传至目录（同名文件)
     *              /src.txt    ./directory/dst.txt     （目录不存在）  ——>  ./directory/dst.txt   新建目录、上传并重命名
     *              /src.txt    ./directory     （目录不存在）  ——>  ./directory   误上传（新文件无后缀名）**
     *              也就是 目标路径path 可以指向一个未创建的文件名或者是已创建的目录，如果中途遇到未创建的目录则会依次创建。
     *              不过真正用的时候都是要先选择路径再传文件，一般只会发生上面第三种情况。
     *
     *
     * 文件名中不能含有 反斜杠(\)、引号("")、花括号({})
     * @return
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @PostMapping(path ="/hdfs",headers="Content-Type=application/json")
    public ApiResult hdfs(@RequestBody @Valid HdfsOptRequest hdfsOptRequest)
            throws URISyntaxException, IOException, InterruptedException {

        if(hdfsOptRequest.getPath()==null) return ApiResult.createNgMsg("path = null!");
        if(hdfsOptRequest.getUser()==null) return ApiResult.createNgMsg("user = null!");
        if(hdfsOptRequest.getKind()==null) return ApiResult.createNgMsg("kind = null!");

        HdfsClient hdfsClient = new HdfsClient("hdfs://" + hdfsAddr,hdfsOptRequest.getUser());
        switch (hdfsOptRequest.getKind()) {
            case "tree": {
                return hdfsClient.tree(hdfsOptRequest.getPath());
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
                return hdfsClient.uploadFromLocal(hdfsOptRequest.getLocalPath(),hdfsOptRequest.getPath());
            default:
                return ApiResult.createNgMsg("Error Kind");
        }
    }


    @ResponseBody
    @RequestMapping(path = {"/run"}, method = {RequestMethod.POST,RequestMethod.GET})
    public String run(@RequestBody String body, HttpServletRequest request) throws IOException {

        System.out.println(request.isRequestedSessionIdValid());
        System.out.println(request.isRequestedSessionIdFromCookie());

        String preBody =null;
        List<Node> preNodeList = null;
        SparkExecutor sparkExecutor = new SparkExecutor(livyAddr,appAddr);

        preBody = (String) request.getSession().getAttribute("node");
        if(preBody!= null)
            preNodeList = objectMapper.readValue(preBody,new TypeReference<List<Node>>(){});

        List<Node> nodeList= objectMapper.readValue(body,new TypeReference<List<Node>>(){});
        request.getSession(true).setAttribute("node", body);   // 覆盖session


        System.out.println(request.getSession().getId()+"body "+(String)request.getSession(true).getAttribute("node"));

        System.out.println("preBody "+preBody);
        System.out.println("body "+body);

        List<List<Object>>finalData = new ArrayList<>();
        int i = 0;
        for(;   i<nodeList.size() &&
                preNodeList != null &&
                i < preNodeList.size() &&
                nodeList.get(i).equals(preNodeList.get(i)); i++
        ) {
            System.out.println("skip " + nodeList.get(i).getLabel());
        }
        for(int j =i;j<nodeList.size();j++){
            Node node = nodeList.get(j);
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

