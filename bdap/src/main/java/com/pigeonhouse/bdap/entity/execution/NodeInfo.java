package com.pigeonhouse.bdap.entity.execution;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

/**
 * @Author: XueXiaoYue
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
     * code序号，对应SparkCode.codeId
     */
    private String codeId;
    @JsonIgnore
    private String code;
    /**
     * 参数
     */
    private HashMap<String, String> attributes;
    /**
     * 是否在此保存中间结果
     */
    private Boolean isCheckPoint;

}
