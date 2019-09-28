package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.FileHeadStatus;
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
    public Response getCsvHeader(@RequestParam("filePath") String filePath) {
        CsvHeader csvHeader = fileHeaderAttriService.findByFilePath(filePath);
        if(csvHeader == null){
            return new Response(FileHeadStatus.NO_SUCH_FILE, null);
        }
        return new Response(FileHeadStatus.HEAD_PUT_SUCCESS, JSONObject.toJSONString(csvHeader));
    }
}
