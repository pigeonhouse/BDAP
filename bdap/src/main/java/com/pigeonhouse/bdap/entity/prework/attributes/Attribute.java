package com.pigeonhouse.bdap.entity.prework.attributes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/21 22:14
 * 所有参数类型的父类，供子类继承
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attribute {
    /**
     * 中文标签（页面上显示的）
     */
    String label;

    /**
     * 英文标签（代码中的）
     */
    String elabel;


    /**
     * 参数类型
     * Select 下拉菜单类型
     * Number 数字类型
     * Input 输入框类型
     * checkBox 勾选类型
     */
    String attrType;


}
