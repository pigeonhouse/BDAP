package com.pigeonhouse.livyservice.controller;

import com.pigeonhouse.livyservice.entity.HeaderAttribute;
import com.pigeonhouse.livyservice.entity.LivySessionInfo;
import com.pigeonhouse.livyservice.service.SessionService;
import com.pigeonhouse.livyservice.util.OutputParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.RespectBinding;
import java.util.List;

@RestController
public class OutputController {

    @Autowired
    SessionService sessionService;

    @PostMapping("/output/schema")
    public List<HeaderAttribute> getSchema(@RequestBody LivySessionInfo livySessionInfo) {
        try {
            String readSchemaDDL = "println(df.schema.toDDL)";
            String schemaResultUrl = sessionService.postCode(livySessionInfo, readSchemaDDL);
            String schemaDDL = OutputParser.getOutput(schemaResultUrl);
            return OutputParser.parseDDL(schemaDDL);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @PostMapping("/output/csv")
    public String getCsv(@RequestBody LivySessionInfo livySessionInfo,
                         @RequestParam("numOfRowsToShow") int numOfRowsToShow) {
        try {
            String previewDataCode = "df.show(" + numOfRowsToShow + ",false)";
            String previewDataResultUrl = sessionService.postCode(livySessionInfo, previewDataCode);
            return OutputParser.convertToCsv(OutputParser.getOutput(previewDataResultUrl));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
