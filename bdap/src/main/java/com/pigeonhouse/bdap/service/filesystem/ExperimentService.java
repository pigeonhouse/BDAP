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

    /**
     *将拓扑示例信息转换成Json
     * */

    public JSONObject experimentToJson(MapInfo experiment){
        JSONObject result = new JSONObject();
        result.put("expirmentId", experiment.getExperimentId());
        JSONArray nodes = new JSONArray();
        for (int Nodeidx = 0; Nodeidx < experiment.getNodes().size(); Nodeidx++) {
            JSONObject nodesInfo = new JSONObject();
            NodeInfo node = experiment.getNodes().get(Nodeidx);
            nodesInfo.put("id", node.getId());
            nodesInfo.put("label", node.getLabelName());
            nodesInfo.put("groupName", node.getGroupName());
            nodesInfo.put("souseIdList", node.getSourceIdList());
            nodesInfo.put("anchor", node.getAnchor());
            JSONArray attributes = new JSONArray();
            for (int atidx = 0; atidx < node.getAttributes().size();atidx++) {
                JSONObject att = new JSONObject();
                AttrInfo AT = node.getAttributes().get(atidx);
                att.put("labelName", AT.getLabelName());
                att.put("valueType", AT.getValueType());
                att.put("style", AT.getStyle());
                att.put("value", AT.getValue());
                attributes.add(att);
            }
            nodesInfo.put("attributes", attributes);
         // nodesInfo.put("isCheckPoint", node.getIsCheckPoint());
            nodesInfo.put("size", node.getSize());
            nodesInfo.put("x", node.getX());
            nodesInfo.put("y", node.getY());
            nodes.add(nodesInfo);
        }
        result.put("nodes", nodes);

        JSONArray edges = new JSONArray();
        for (int Edgeidx = 0; Edgeidx < experiment.getNodes().size(); Edgeidx++) {
            JSONObject edgesInfo = new JSONObject();
            EdgeInfo edge = experiment.getEdges().get(Edgeidx);
            edgesInfo.put("id", edge.getId());
            edgesInfo.put("index", edge.getIndex());
            edgesInfo.put("source", edge.getSource());
            edgesInfo.put("sourceAnchor", edge.getSourceAnchor());
            edgesInfo.put("target", edge.getTarget());
            edgesInfo.put("targetAnchor", edge.getTargetAnchor());
        }
        result.put("edges", edges);
        return result;
        }
}
