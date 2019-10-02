package com.pigeonhouse.bdap.entity.execution;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * ！未完成！
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
     * Node在整个flow里的唯一序号
     */
    private Integer index;
    /**
     * 算法名（直接对应scala文件），对应SparkCode.algorithmName
     */
    private String algorithmName;

    /**
     * 这个节点的源点Id集合
     */
    private ArrayList<String> sourceId;

    /**
     * 参数
     */
    private ArrayList<ValueAttributes> attributes;
    
    /**
     * 是否在此保存中间结果
     */
    private Boolean isCheckPoint;

}
