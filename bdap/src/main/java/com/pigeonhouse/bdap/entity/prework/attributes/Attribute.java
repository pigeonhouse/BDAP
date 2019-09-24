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

    /**
     * 规范输入的正则表达式
     */
    String regexp;

    /**
     * 数字下界
     */
    double min;

    /**
     * 数字上界
     */
    double max;
    /**
     * 步长，供前端使用上调下调按钮提高用户体验。
     */
    double step;

    /**
     * 下拉菜单显示的参数值，
     * 如["平均值","中位数","最大值","最小值"]
     */
    ArrayList<String> value;

    /**
     * 能否多选
     */
    Boolean multiChoice;

    public Attribute(String label, String elabel, String attrType, String regexp) {
        this.label = label;
        this.elabel = elabel;
        this.attrType = attrType;
        this.regexp = regexp;
    }

    public Attribute(String label, String elabel, String attrType, double min, double max, double step) {
        this.label = label;
        this.elabel = elabel;
        this.attrType = attrType;
        this.min = min;
        this.max = max;
        this.step = step;
    }

    public Attribute(String label, String elabel, String attrType, ArrayList<String> value, Boolean multiChoice) {
        this.label = label;
        this.elabel = elabel;
        this.attrType = attrType;
        this.value = value;
        this.multiChoice = multiChoice;
    }
}
