package com.pigeonhouse.bdap.controller.filesystem;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.service.filesystem.FileHeaderAttriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileHeaderAttriController {

    @Autowired
    FileHeaderAttriService fileHeaderAttriService;

    /**
     * 请求CSV文件字段信息
     *
     * @param filePath 文件路径
     * @return 文件字段信息
     */
    @PostMapping("/csvHeader")
    public String getCsvHeader(@RequestParam("filePath") String filePath) {
        CsvHeader csvHeader = fileHeaderAttriService.findByFilePath(filePath);
        return JSONObject.toJSONString(csvHeader);
    }
}
