package com.bigdataplayground.demo.MolulesSpark;

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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@RestController
@EnableAutoConfiguration
public class App {
    //配置时将appAddr改成自己的地址（只需要该这一处)。涉及到结果回传，因此不能用127.0.0.1
    private String appAddr = "10.122.217.207:5000"; //后端所在地址（本机地址)
    private String livyAddr = "10.105.222.90:8998"; //livy 服务器+端口

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

    @CrossOrigin(origins = "*")
    @RequestMapping(path = {"/run"}, method = {RequestMethod.POST})
    public Object run(@RequestBody String body) throws IOException {

        System.out.println(body);
        //此处要用TypeReference，用list.class会出错
        List<Node> nodeList= objectMapper.readValue(body,new TypeReference<List<Node>>(){});
        System.out.println(nodeList);

        List<Object>finalData = new ArrayList<>();
        List<Object> tmp = new ArrayList<>();
        for(Node node : nodeList){
            System.out.println(node.getLabel());
            //设置地址并执行
            node.excuteNode(appAddr,livyAddr);

            if(!node.getLabel().equals("hdfsFile")){
                tmp.add(node.getId());
                tmp.add(runningData);
                System.out.println(tmp);
                finalData.add(tmp);
            }
        }

        System.out.println(finalData);
        String result = objectMapper.writeValueAsString(finalData);
        System.out.println(result);

        return finalData;
    }


    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}

