package com.pigeonhouse.bdap.entity.nodeinfo;

import com.pigeonhouse.bdap.entity.nodeinfo.attrinfo.AttrInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * 前端在用户连接完成拓扑图并选择完参数后
 * 将返回一个以此对象构成的数组
 * Note:其中已经包含了用户选择完的参数值
 *
 * @Author: XueXiaoYue HouWeiying
 * @Date: 2019/9/7 11:18
 */
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
     * 每一个属性的参数及值
     */
    private ArrayList<AttrInfo> attributes;

    /**
     * 是否在此保存中间结果
     */
    private Boolean isCheckPoint = true;

    /**
     * 拖动到右侧标签框的大小，默认"200*40"
     */
    private String size = "200*40";

    /**
     * 组件在画布上的位置x
     */
    private int x;

    /**
     * 组件在画布上的位置y
     */
    private int y;


    /**
     * 用于算法测试的构造器
     */
    public NodeInfo(String id, LabelName labelName, LabelName groupName, String[] sourceIdList, int[] anchor, ArrayList<AttrInfo> attributes, Boolean isCheckPoint) {
        this.id = id;
        this.labelName = labelName;
        this.groupName = groupName;
        this.sourceIdList = sourceIdList;
        this.anchor = anchor;
        this.attributes = attributes;
        this.isCheckPoint = isCheckPoint;
    }

    /**
     * 用于上传新模块的构造器
     */
    public NodeInfo(LabelName labelName, LabelName groupName, int[] anchor, ArrayList<AttrInfo> attributes) {
        this.labelName = labelName;
        this.groupName = groupName;
        this.anchor = anchor;
        this.attributes = attributes;
    }
}
