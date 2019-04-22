package com.bigdataplayground.demo.LocalFileSystem;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class loading {
    @RequestMapping("/loading")
    public String loading(){
        System.out.println("loading.svg");
        return "loading";
    }
}
