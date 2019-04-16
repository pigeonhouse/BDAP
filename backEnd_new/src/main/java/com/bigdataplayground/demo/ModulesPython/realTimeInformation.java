package com.bigdataplayground.demo.ModulesPython;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@RestController
public class realTimeInformation {
    @RequestMapping("/trainingAccuracy")
    public String trainingAccuracy(){
        String pathname = "C:\\Users\\Surface\\SavedFile\\test.txt";
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

    }
}
