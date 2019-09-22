package com.pigeonhouse.bdap.entity.prework.attributes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/21 23:00
 * 输入框类型的参数
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InputAttribute extends Attribute {
    /**
     * 规范输入的正则表达式
     */
    String regexp;
}
