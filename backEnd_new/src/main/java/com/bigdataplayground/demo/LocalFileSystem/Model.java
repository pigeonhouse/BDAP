//package com.bigdataplayground.demo.LocalFileSystem;
//
//import com.alibaba.fastjson.JSON;
//import com.alibaba.fastjson.JSONObject;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.*;
//
//@RestController
//public class Model {
//    @RequestMapping("/saveModel")
//    public Boolean saveModel(@RequestParam("model") String body)throws IOException{
//        JSONObject j = JSON.parseObject(body);
//        String fileName = j.getString("name");
//        String data = body;
//
//        File file = new File("C:\\Users\\Surface\\SavedFile\\"+ fileName + ".json");
//        if(file.exists()){
//            return false;
//        }
//        file.createNewFile();
//
//        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file,false), "UTF-8"));
//        writer.write(data);
//
//        if(writer != null){
//            writer.close();
//        }
//
//        System.out.println("文件写入成功！");
//        return true;
//    }
//}
