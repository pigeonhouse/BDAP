package com.bigdataplayground.demo.MolulesSpark;

import com.bigdataplayground.demo.MolulesSpark.util.LivyContact;
import com.bigdataplayground.demo.MolulesSpark.util.ToolSet;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@RestController
@EnableAutoConfiguration
public class App {
    private String livyAddr = "10.105.222.90:8998"; //livy 服务器+端口
    private String appAddr = "10.122.217.207:5000"; //后端所在地址+端口号 配置在application.properties
    private HttpServletRequest request;
    private HttpServletResponse response;
    private ObjectMapper objectMapper = new ObjectMapper();
    private LivySessionInfo availableSession;
    private String runningData;
    private String inputData;

    @RequestMapping(path={"/"}, method = {RequestMethod.POST,RequestMethod.GET})
    String home() {
        return "yo!";
    }

    @CrossOrigin(origins = "*") //跨域请求
    @RequestMapping(path = {"/handleInput"}, method = {RequestMethod.POST})
    String handleInput(@RequestHeader ("host") String hostName,
                       @RequestBody String body) throws IOException {

        Path path = Paths.get("src/main/scala/handleInput.scala");

        String code = ToolSet.openFile(path);

        String data = String.format(code, body.replace("\"",""),//应该是要去除双引号的
                "http://"+appAddr+"/inputPost");//App.java所在主机地址

        Map<String,String> map = new HashMap<>();
        map.put("code",data);
        map.put("kind","spark");
        String jsonData = objectMapper.writeValueAsString(map);

        LivySessionDescription livySessionDescription = LivyContact.getSession(livyAddr);
        availableSession = LivyContact.selectIdleSession(livySessionDescription);

        if(livySessionDescription.getTotal()==0 || availableSession==null){
            availableSession = LivyContact.createSession();
            System.out.print("Wait");
            while(!LivyContact.getSession(livyAddr,availableSession.getId()).getState().equals("idle")){
                System.out.print(".");
            }
            System.out.println("Create A New Session"+"Session ID = :"+availableSession.getId());
        }


        String availableSessionUrl = "http://"+livyAddr+"/sessions/"+availableSession.getId();


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        System.out.println(jsonData);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonData, headers);

        RestTemplate restTemplate = new RestTemplate();

        System.out.println(availableSessionUrl + "/statements");

        ResponseEntity<String> compute = restTemplate.exchange(
                availableSessionUrl + "/statements",
                HttpMethod.POST, httpEntity, String.class
        );

        String resultUrl = "http://"+livyAddr+ compute.getHeaders().get("location").get(0);
        System.out.println(resultUrl);

        String result = new String();
        while(true){
             if(objectMapper.readValue(
                     restTemplate.getForObject(resultUrl,String.class),Map.class)
                     .get("state").equals("available")
             ){
                 System.out.println("finish");
                 break;
             }
        }

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
    public String run(@RequestBody String body) throws IOException {
        String finalData = new String();
        System.out.println(body);
        /**
         * @Jackson 此处要用TypeReference，用list.class会出错
         */
        List<Node> nodeList= objectMapper.readValue(body,new TypeReference<List<Node>>(){});
        System.out.println(nodeList);
        for(Node node : nodeList){
            System.out.println(node.getLabel());
        }
        return finalData;
    }






    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}

