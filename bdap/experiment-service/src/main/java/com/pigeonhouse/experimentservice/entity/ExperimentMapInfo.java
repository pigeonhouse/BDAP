package com.pigeonhouse.experimentservice.entity;

import com.pigeonhouse.experimentservice.entity.edgeinfo.EdgeInfo;
import com.pigeonhouse.experimentservice.entity.nodeinfo.NodeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperimentMapInfo implements Serializable {
    String experimentId;
    String userId;
    ArrayList<NodeInfo> nodes;
    ArrayList<EdgeInfo> edges;
}
