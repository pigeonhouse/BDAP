package com.bigdataplayground.demo.LocalFileSystem;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

@RestController
public class handleFile {
    @RequestMapping("/handleFile")
    public String[] handleFile(@RequestParam("file") MultipartFile file) {
        String path = "C:/Users/Surface/SavedFile/";
        String fileName = file.getOriginalFilename();
        File saveFile = new File(path+fileName);

        try {
            file.transferTo(saveFile);
            String[] fileList = saveFile.getParentFile().list();
            return fileList;
        } catch (Exception e) {
            e.printStackTrace();
            return new String[1];
        }
    }

}
