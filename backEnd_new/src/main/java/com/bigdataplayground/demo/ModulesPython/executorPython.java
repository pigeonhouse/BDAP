package com.bigdataplayground.demo.ModulesPython;

import com.alibaba.fastjson.JSONObject;
import com.bigdataplayground.demo.controller.Node;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
public class executorPython {
    public static void runCode(String[] arguments){
        try {
            Process process = Runtime.getRuntime().exec(arguments);
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = null;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            int re = process.waitFor();
            System.out.println(re);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @RequestMapping("/runPython")
    public String runPython(@RequestBody String body)throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Node> nodeList= objectMapper.readValue(body,new TypeReference<List<Node>>(){});
        String[] arguments = new String[]{"python","/home/tseg/mnist.py"};
        runCode(arguments);
        String pathname = "/home/tseg/final_acc.txt";
        try (FileReader reader = new FileReader(pathname);
             BufferedReader br = new BufferedReader(reader)
        ) {
            String line = br.readLine();
            System.out.println(line);
            return line;
        } catch (IOException e) {
            e.printStackTrace();
            return "error";
        }

//        int len = nodeList.size();
//        JSONObject obj = new JSONObject(new LinkedHashMap());
//
//        for (int i = 0; i < len; i++) {
//            System.out.println(nodeList.get(i).getGroup());
//            if(nodeList.get(i).getGroup().equals("dl")){
//                obj.put(nodeList.get(i).getLabel() + "_" + i,nodeList.get(i).getAttribute());
//            }
//            //runCode(arguments);
//        }
//
//        String a = obj.toJSONString();
//        StringBuilder sb = new StringBuilder();
//        for (int i = 0; i < a.length(); i++) {
//            if(a.charAt(i) == '\"'){
//                sb.append("\\");
//            }
//            sb.append(a.charAt(i));
//        }
//        System.out.println(sb);
//        String[] arguments = new String[]{"python","src/main/python/test.py",sb.toString()};
//        runCode(arguments);

    }
}
