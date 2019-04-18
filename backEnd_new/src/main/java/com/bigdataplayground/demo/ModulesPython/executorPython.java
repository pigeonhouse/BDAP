package com.bigdataplayground.demo.ModulesPython;

import com.bigdataplayground.demo.controller.Node;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

@RestController
public class executorPython {
    public static void runCode(String[] arguments){
        //String[] arguments = new String[] {"python", "src/test.py"};
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
    public void execute(@RequestBody String body)throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Node> nodeList= objectMapper.readValue(body,new TypeReference<List<Node>>(){});
        int len = nodeList.size();
        for (int i = 0; i < len; i++) {
            String[] arguments = new String[]{"python","src/main/python/mnist.py"
            };

              runCode(arguments);
//            System.out.println(nodeList[i].id);
//            System.out.println(nodeList[i].label);
//            System.out.println(nodeList[i].sourceID);
//            System.out.println(nodeList[i].attribute);
//            System.out.println(nodeList[i].labelArray);
        }


    }
}
