package com.bigdataplayground.demo.LocalFileSystem;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
public class FileList {
    @RequestMapping("/FileList")
    public String[] FileList(){
        String path = "C:\\Users\\Surface\\SavedFile\\";
        File f = new File(path);
        return f.list();
    }
}
