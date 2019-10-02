package com.pigeonhouse.bdap.entity.execution;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 前端在用户连接完成拓扑图并选择完参数后
 * 返回NodeInfo
 * 其中的参数列表为该类型构成的List
 * @Author: XueXiaoYue
 * @Date: 2019/10/2 17:09
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValueAttributes {
    String attrName;
    String attrType;
    String value;

}
