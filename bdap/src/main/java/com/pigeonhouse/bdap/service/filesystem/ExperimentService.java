package com.pigeonhouse.bdap.service.filesystem;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.mapinfo.MapInfo;
import com.pigeonhouse.bdap.entity.mapinfo.edgeinfo.EdgeInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.attrinfo.AttrInfo;
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

}
