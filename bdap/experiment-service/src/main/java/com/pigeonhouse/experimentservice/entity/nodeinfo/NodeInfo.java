package com.pigeonhouse.experimentservice.entity.nodeinfo;

import com.pigeonhouse.experimentservice.entity.FileAttr.HeaderAttribute;
import com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo.AttrInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class NodeInfo {
    /**
     * 前端随机生成的id
     */
    private String id ;

    /**
     * 中文标签与英文标签
     */
    private LabelName labelName;

    /**
     * 所在类别的中文名与英文名
     * 如("数据预处理","preprocessing")
     */
    private LabelName groupName;

    private List<HeaderAttribute> columnsInfo;

    /**
     * 组件在画布上的位置x
     */
    private int x;

    /**
     * 组件在画布上的位置y
     */
    private int y;

}
