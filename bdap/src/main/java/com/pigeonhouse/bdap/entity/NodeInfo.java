package com.pigeonhouse.bdap.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 11:18
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NodeInfo {

    private Integer index;
    private String code;
    private Boolean isCheckPoint;

}