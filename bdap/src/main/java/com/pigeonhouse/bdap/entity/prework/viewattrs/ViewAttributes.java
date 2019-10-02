package com.pigeonhouse.bdap.entity.prework.viewattrs;

import com.pigeonhouse.bdap.entity.prework.valueattrs.LabelName;
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
public class ViewAttributes {
    /**
     * 中文属性名（页面上显示的）
     */
    String label;

    /**
     * 英文属性名（代码中的）
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
    String min;

    /**
     * 数字上界
     */
    String max;
    /**
     * 步长，供前端使用上调下调按钮提高用户体验。
     */
    String step;

    /**
     * 下拉菜单显示的参数值，
     * 如["平均值","中位数","最大值","最小值"]
     */
    ArrayList<LabelName> value;

    /**
     * 能否多选
     */
    Boolean multiChoice;

    public ViewAttributes(String label, String elabel, String attrType, String regexp) {
        this.label = label;
        this.elabel = elabel;
        this.attrType = attrType;
        this.regexp = regexp;
    }

    public ViewAttributes(String label, String elabel, String attrType, String min, String max, String step) {
        this.label = label;
        this.elabel = elabel;
        this.attrType = attrType;
        this.min = min;
        this.max = max;
        this.step = step;
    }

    public ViewAttributes(String label, String elabel, String attrType, ArrayList<LabelName> value, Boolean multiChoice) {
        this.label = label;
        this.elabel = elabel;
        this.attrType = attrType;
        this.value = value;
        this.multiChoice = multiChoice;
    }
}
