package com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.attrinfo.style;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/3 14:58
 * 选择字段类型
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChooseColStyle {
    /**
     * 能否选择多列
     * true
     * false
     */
    String multiCol ;
    /**
     * 选的是哪一个锚点的字段
     * 0/1
     */
    String sourceAnchor;
}
