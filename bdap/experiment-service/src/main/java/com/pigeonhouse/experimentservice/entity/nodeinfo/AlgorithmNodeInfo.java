package com.pigeonhouse.experimentservice.entity.nodeinfo;

import com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo.AttrInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlgorithmNodeInfo extends NodeInfo implements Serializable {
    /**
     * 这个节点的源点Id集合
     */
    private String[] sourceIdList;

    /**
     * 上下锚点个数
     * 如：[2,1]表示两个输入，一个输出
     */
    private int[] anchor;
    /**
     * 新增列的类型及属性
     */
    private List<NewCol> newCols;

    /**
     * 每一个属性的参数及值
     */
    private ArrayList<AttrInfo> attributes;

    private LabelName algorithmType;
}
