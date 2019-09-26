package com.pigeonhouse.bdap.service;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.dao.FileHeaderAttriDao;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.attributes.HeaderAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;


@Service
public class FileHeaderAttriService {

    @Autowired
    FileHeaderAttriDao fileHeaderAttriDao;

    public void SaveFileHeader(String fileName, String filePath,Map<String, String> headers){

        ArrayList<HeaderAttribute> attributes = new ArrayList<>();
        for (String key: headers.keySet()){
            HeaderAttribute attribute = new HeaderAttribute(key, headers.get(key));
            attributes.add(attribute);
        }
        CsvHeader csvHeader = new CsvHeader(fileName, filePath,attributes);
        fileHeaderAttriDao.saveCsvHeader(csvHeader);
    }

    public CsvHeader findByFilePath(String filePath){
        CsvHeader csvHeader = fileHeaderAttriDao.findByFilePath(filePath);
        return csvHeader;
    }
//    public void SaveFileHeaderJSON(String json){
//        JSONObject jsonObject = new JSONObject(json);
//        ArrayList<HeaderAttribute> attributes = new ArrayList<>();
//        JSONArray attrHeaderSet = (JSONArray) jsonObject.get("attrHeaderSet");
//        for(int i = 0; i < attrHeaderSet.length(); i++){
//            JSONObject o = (JSONObject) attrHeaderSet.get(i);
//            HeaderAttribute attribute = new HeaderAttribute((String) o.get("colName"), (String) o.get("dataType"));
//            attributes.add(attribute);
//        }
//        CsvHeader header = new CsvHeader((String) jsonObject.get("fileId"), (String) jsonObject.get("fileName"), (String) jsonObject.get("filePath"), attributes);
//        System.out.println(header);
//        fileHeaderAttriDao.saveCsvHeader(header);
//    }
}
