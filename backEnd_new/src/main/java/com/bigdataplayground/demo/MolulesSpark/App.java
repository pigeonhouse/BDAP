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

    private HttpServletRequest request;
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
     * 因为直接输出太丑了， 因此System.out里面用了格式输出，并且每个文件单独输出一个json
     * @return
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(path = {"/hdfs"},method = {RequestMethod.GET})
    public String hdfs() throws URISyntaxException, IOException, InterruptedException {

        HdfsClient hdfsClient = new HdfsClient("hdfs://"+hdfsAddr);
        //List<String> fileList = hdfsClient.getFileList("/");
        List<String> fileList = hdfsClient.getAllFilePath(new org.apache.hadoop.fs.Path("/"));

        //jackson会不断在里面加入\。。。。只好手动删掉了，不然太难看了
        String fileL = fileList.toString();
        while (fileL.contains("\\\\")){
            fileL = fileL.replace("\\\\","\\");
        }
        return fileL;
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
            //设置地址并执行
            sparkExecutor.executeNode(node);

            if(!node.getLabel().equals("hdfsFile")){
                List<Object> tmp = new ArrayList<>();
                //不加双引号前端会识别不了。。。。略玄学
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

