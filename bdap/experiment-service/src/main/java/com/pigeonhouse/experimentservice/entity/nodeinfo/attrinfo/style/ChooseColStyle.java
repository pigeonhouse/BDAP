package com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo.style;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
