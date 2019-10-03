package com.pigeonhouse.bdap.entity.mapinfo;

import com.pigeonhouse.bdap.entity.mapinfo.edgeinfo.EdgeInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/3 21:18
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapInfo {
    ArrayList<NodeInfo> nodes;
    ArrayList<EdgeInfo> edges;
}
