package com.pigeonhouse.bdap.controller.filesystem;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.metadata.CsvHeader;
import com.pigeonhouse.bdap.service.ResponseService;
import com.pigeonhouse.bdap.service.filesystem.FileHeaderAttriService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.FileHeadStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class FileHeaderAttriController {

    @Autowired
    FileHeaderAttriService fileHeaderAttriService;
    @Autowired
    ResponseService responseService;
    /**
     * 请求CSV文件字段信息
     *
     * @param filePath 文件路径
     * @return 文件字段信息
     */
    @PostMapping("/csvHeader")
    public Response getCsvHeader(String filePath, HttpServletRequest request) {
        CsvHeader csvHeader = fileHeaderAttriService.findByFilePath(filePath);
        if (csvHeader == null) {
            return responseService.response(FileHeadStatus.NO_SUCH_FILE, null,request);
        }
        return responseService.response(FileHeadStatus.HEAD_PUT_SUCCESS, JSONObject.toJSONString(csvHeader),request);
    }
}
