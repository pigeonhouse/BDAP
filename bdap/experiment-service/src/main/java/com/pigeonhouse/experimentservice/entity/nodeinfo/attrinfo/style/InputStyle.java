package com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo.style;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class InputStyle implements Serializable {

    /**
     * 规范输入的正则表达式
     */
    String regexp;


}
