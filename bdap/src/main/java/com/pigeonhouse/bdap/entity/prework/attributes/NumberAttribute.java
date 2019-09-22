package com.pigeonhouse.bdap.entity.prework.attributes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/21 23:00
 * 输入数字类型的参数
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NumberAttribute extends Attribute {
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
}
