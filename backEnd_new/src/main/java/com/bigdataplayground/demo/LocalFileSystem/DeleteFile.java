package com.bigdataplayground.demo.LocalFileSystem;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
public class DeleteFile {
    @RequestMapping("/DeleteFile")
    public Boolean DeleteFile(@RequestParam("fileName") String fileName){
        File f = new File("C:\\Users\\Surface\\SavedFile\\"+fileName);
        return f.delete();
    }
}
