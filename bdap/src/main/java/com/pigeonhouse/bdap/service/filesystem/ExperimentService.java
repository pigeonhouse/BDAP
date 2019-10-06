package com.pigeonhouse.bdap.service.filesystem;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.mapinfo.MapInfo;
import com.pigeonhouse.bdap.entity.metadata.FileAttribute;

import com.pigeonhouse.bdap.entity.metadata.HeaderAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pigeonhouse.bdap.dao.ExperimentDao;

/**
 * Author：ZhangJiaYi
 * Time:2019/9/26 13:59
 */
@Service
public class ExperimentService {

    @Autowired
    ExperimentDao experimentDao;
    /**
     *调用数据库操作查找拓扑示例
     * */
    public MapInfo findExperimentId(String id) {
        MapInfo experiment = experimentDao.findExperimentId(id);
        return experiment;
    }

    /**
     *将拓扑示例信息转换成Json(未测试)
     * */

    /**public JSONObject experimentToJson(MapInfo experiment){
        JSONObject result = new JSONObject();
        result.put("expirmentId", experiment.getExperimentId());
        JSONArray file = new JSONArray();
        for (int FLidx = 0; FLidx < experiment.getFileList().size(); FLidx++) {
            JSONObject fileInfo = new JSONObject();
            FileAttribute FA = experiment.getFileList().get(FLidx);
            fileInfo.put("fileName", FA.getFileName());
            fileInfo.put("filePath", FA.getFilePath());
            JSONArray colInfo = new JSONArray();
            for (int cols = 0; cols < FA.getFileColumnsInfo().size(); cols++) {
                JSONObject columnInfo = new JSONObject();
                HeaderAttribute HA = FA.getFileColumnsInfo().get(cols);
                columnInfo.put("colName", HA.getColName());
                columnInfo.put("dataType", HA.getDataType());
                colInfo.add(columnInfo);
            }
            fileInfo.put("fileColumnsInfo", colInfo);
            file.add(fileInfo);
        }
        result.put("fileList", file);
        return result;
        }*/
}
