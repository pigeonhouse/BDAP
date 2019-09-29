package com.pigeonhouse.bdap.service.filesystem;

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

    public void saveFileHeader(String fileName, String filePath, Map<String, String> headers) {

        ArrayList<HeaderAttribute> attributes = new ArrayList<>();
        for (String key : headers.keySet()) {
            HeaderAttribute attribute = new HeaderAttribute(key, headers.get(key));
            attributes.add(attribute);
        }
        CsvHeader csvHeader = new CsvHeader(fileName, filePath, attributes);
        fileHeaderAttriDao.saveCsvHeader(csvHeader);
    }

    /**
     * 如数据库中有此条目,则更新字段，如果数据库中无此条目,则保存为新的文档
     *
     * @param fileName 文件名
     * @param filePath 文件路径
     * @param headers  文件头集合
     * @author 邢天宇
     */
    public void saveOrUpdateFileHeader(String fileName, String filePath, Map<String, String> headers) {
        ArrayList<HeaderAttribute> attributes = new ArrayList<>();
        for (String key : headers.keySet()) {
            HeaderAttribute attribute = new HeaderAttribute(key, headers.get(key));
            attributes.add(attribute);
        }
        CsvHeader csvHeader = new CsvHeader(fileName, filePath, attributes);
        if (fileHeaderAttriDao.findByFilePath(filePath) != null) {
            fileHeaderAttriDao.updateCsvHeader(csvHeader);
        } else {
            fileHeaderAttriDao.saveCsvHeader(csvHeader);
        }
    }

    public CsvHeader findByFilePath(String filePath) {
        CsvHeader csvHeader = fileHeaderAttriDao.findByFilePath(filePath);
        return csvHeader;
    }

    /**
     * 根据样本数据判别数据类型
     *
     * @param data 样本数据
     * @return String 数据类型
     * @author 邢天宇
     */
    public String dataTypeCheck(String data) {
        String Float = "(\\-)?\\d+(\\.\\d*)";
        String Int = "(\\-)?\\d+";
        String dateTime1 = "\\d{4}[-,/]\\d{1,2}[-,/]\\d{1,2}[\\s]\\d{1,2}[-,:]\\d{1,2}[-,:]\\d{1,2}";
        //YYYY-MM-DD H-M-S 式匹配,未加合法性校验
        String dateTime2 = "\\d{1,2}[-,/]\\d{1,2}[-,/]\\d{4}[\\s]\\d{1,2}[-,:]\\d{1,2}[-,:]\\d{1,2}";
        //DD/MM/YYYY H-M-S 式匹配
        String date1 = "\\d{1,2}[-,/]\\d{1,2}[-,/]\\d{4}";
        String date2 = "\\d{4}[-,/]\\d{1,2}[-,/]\\d{1,2}";
        if (data.matches(Float)) {
            return "float";
        } else if (data.matches(Int)) {
            return "Int";
        } else if (data.matches(dateTime1) || data.matches(dateTime2)) {
            return "dateTime";
        } else if (data.matches(date1) || data.matches(date2)) {
            return "date";
        } else {
            return "string";
        }
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
