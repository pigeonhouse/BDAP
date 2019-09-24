package com.pigeonhouse.bdap.entity.prework.attributes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/21 22:59
 * 下拉菜单类型的参数
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectAttribute extends Attribute {
    /**
     * 下拉菜单显示的参数值，
     * 如["平均值","中位数","最大值","最小值"]
     */
    ArrayList<String> value;

    Boolean multiChoice;

    public SelectAttribute(String label, String elabel, String attrType, ArrayList<String> value, Boolean multiChoice) {
        super(label, elabel, attrType);
        this.value = value;
        this.multiChoice = multiChoice;
    }
}
