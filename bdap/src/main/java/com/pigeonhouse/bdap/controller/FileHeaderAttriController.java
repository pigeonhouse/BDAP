package com.pigeonhouse.bdap.controller;

import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileHeaderAttriController {

    @Autowired
    FileHeaderAttriService fileHeaderAttriService;

//    @PostMapping("/fileUpload")
//    public String fileUpload(@RequestParam("file") MultipartFile file) {
//        if (!file.isEmpty()) {
//            String filePath = request.getSession().getServletContext().getRealPath("/") + "\\fileUpload\\" +  file.getOriginalFilename();//感觉是不是对文件名裁剪空格后保存比较好？
//            //转存文件
//            try {
//                file.transferTo(new File(filePath));
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//        // 重定向
//        return "redirect:/jsp/succ.jsp";
//    }
}
