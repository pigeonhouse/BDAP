package com.bigdataplayground.demo.MolulesSpark;

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
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.Future;


@RestController
@EnableAutoConfiguration
public class App {
    private String livyAddr = "10.105.222.90:8998";
    private String appAddr = "localhost:5000";
    private HttpServletRequest request;
    private HttpServletResponse response;
    private ObjectMapper objectMapper = new ObjectMapper();
    private LivySessionInfo availableSession;
    private String runningData;
    private String inputData;

    @RequestMapping(path={"/"}, method = {RequestMethod.POST,RequestMethod.GET})
    String home() {
        return "Hello World!";
    }

    @CrossOrigin(origins = "*") //跨域请求
    @RequestMapping(path = {"/handleInput"}, method = {RequestMethod.POST})
    String handleInput(@RequestHeader ("host") String hostName,
                       @RequestBody String body) throws IOException {

        System.out.println("entered");

        Path path = Paths.get("src/main/scala/handleFile.scala");

        String code = openFile(path);
        System.out.println(code);

        String data = String.format(code, body.replace("\"",""),//应该是要去除双引号的
                "http://"+appAddr+"/inputPost");//App.java所在主机地址

        Map<String,String> map = new HashMap<>();
        map.put("code",data);
        map.put("kind","spark");
        String jsonData = objectMapper.writeValueAsString(map);

        LivySessionDescription livySessionDescription = objectMapper.readValue(
                getLivySession(-1),
                LivySessionDescription.class
        );

        availableSession = selectIdle(livySessionDescription);

        if(livySessionDescription.getTotal()==0 || availableSession==null){
            availableSession = createLivySession();
            System.out.print("Waiting...");
            while(!objectMapper.readValue(getLivySession(availableSession.getId()),
                    LivySessionInfo.class).getState().equals("idle")){
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

    @RequestMapping(path = {"/InputPost"}, method = {RequestMethod.POST})
    public String inputPost(@RequestBody String body){
        inputData = body;
        System.out.println(body);
        return "received";
    }

    public LivySessionInfo selectIdle(LivySessionDescription livySessionDescription){
        for(LivySessionInfo sessionInfo:livySessionDescription.getSessions()){
            if(sessionInfo.getState().equals("idle")){
                return sessionInfo;
            }
        }
        return null;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(path = {"/run"}, method = {RequestMethod.POST})
    public String run(@RequestBody String body) throws IOException {
        String finalData;
        System.out.println(body);
        List<Node> nodeList= objectMapper.readValue(body,new TypeReference<List<Node>>(){});
        System.out.println(nodeList);
        for(Node node : nodeList){
            System.out.println(node.getLabel());
        }
        return null;
    }

    public String openFile(Path path) throws IOException{

        AsynchronousFileChannel channel = null;

        channel = AsynchronousFileChannel.open(path);
        ByteBuffer byteBuffer = ByteBuffer.allocate(1024);//声明1024个字节的buff
        Future future = channel.read(byteBuffer, 0);
        System.out.println("文件读取中...");
        while (!future.isDone()) {
            System.out.print('.');
        }
        System.out.println("文件读取完成");
        byteBuffer.flip();
        //打印bytebuff中的内容
        String codeString = Charset.forName("utf-8").decode(byteBuffer).toString();

        //     System.out.println(RequestBody);
        channel.close();

        return codeString;
    }

    /**
     *
     * @param id id = -1 get all ; id>=0 get one
     * @return String id = -1 return LivySessionDescription(jsonString) ; id>=0 return LivySessionInfo(jsonString)
     * @throws IOException
     */
  //  @RequestMapping(path={"/get"}, method = {RequestMethod.POST,RequestMethod.GET})
    public String getLivySession(int id) throws IOException {
        String sessionUrl = new String();
        if(id!=-1)
            sessionUrl = "http://"+ livyAddr +"/sessions/"+id;
        else
            sessionUrl = "http://"+ livyAddr +"/sessions";


        RestTemplate restTemplate=new RestTemplate();

        String res = restTemplate.getForObject(sessionUrl,String.class);

        return res;

    }


    public LivySessionInfo createLivySession() throws IOException {
        Map<String, Object> hashMap = new HashMap<>();

        String session_url = "http://10.105.222.90:8998/sessions";
        //header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        //body map2json
        hashMap.put("kind","spark");
        List<String>jarsList = Arrays.asList("hdfs:///livy_jars/scalaj-http_2.10-2.0.0.jar");
        hashMap.put("jars",jarsList);
        ObjectMapper objectMapper = new ObjectMapper();
        String bodyJson = null;

        bodyJson = objectMapper.writeValueAsString(hashMap);

        //restTemplate
        RestTemplate restTemplate=new RestTemplate();
        HttpEntity<String> httpEntity=new HttpEntity<>(bodyJson,headers);
        ResponseEntity<String> res = restTemplate.exchange(session_url,HttpMethod.POST,httpEntity,String.class);

        LivySessionInfo livySessionInfo = objectMapper.readValue(res.getBody(),LivySessionInfo.class);


        return livySessionInfo;
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}

