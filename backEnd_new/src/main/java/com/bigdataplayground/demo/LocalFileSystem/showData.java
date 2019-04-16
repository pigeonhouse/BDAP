package com.bigdataplayground.demo.LocalFileSystem;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class showData {
    @RequestMapping("/showData")
    public List showData(@RequestParam("fileName") String fileName)throws IOException {
        String path = "/home/tseg/TestFile/";
        File csv = new File(path+fileName);
        BufferedReader br = null;
        try
        {
            br = new BufferedReader(new FileReader(csv));
        } catch (FileNotFoundException e)
        {
            e.printStackTrace();
        }
        String line = "";
        String everyLine = "";
        try {
            List<String> allString = new ArrayList<>();
            while ((line = br.readLine()) != null)  //读取到的内容给line变量
            {
                everyLine = line;

                allString.add(everyLine);
            }
            System.out.println("csv表格中所有行数："+allString.size());
            System.out.println(allString);
            return allString;
        } catch (IOException e)
        {
            e.printStackTrace();
            return new ArrayList<>();
        }


    }
}



