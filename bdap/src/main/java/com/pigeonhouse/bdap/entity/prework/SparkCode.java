package com.pigeonhouse.bdap.entity.prework;

import com.pigeonhouse.bdap.entity.nodeinfo.attrinfo.AttrInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/21 16:51
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SparkCode {
    /**
     * 代码编号，共五位
     * 前两位表示类型，即type
     * 后三位按序递增
     */
    String codeId;

    /**
     * 模块中文名称
     */
    String label;

    /**
     * 模块英文名称
     */
    String elabel;

    /**
     * 代码类型
     * 如：
     * 数据预处理
     * 机器学习
     * ......
     */
    String type;

    /**
     * 原始代码（即包含占位符如%s,%d等的代码）
     */
    String originCode;

    /**
     * 有几个输入，有几个输出
     * 如：
     * one-one
     * two-one
     * one-two
     * two-two
     * .......
     */
    String shape;

    /**
     * 整个参数栏分很多个参数
     * 每个参数需要以不同的形式展现在前端供用户选择/输入/勾选
     * 这里记录了在前端如何渲染的必要信息
     */
    ArrayList<AttrInfo> viewAttributes;
}
