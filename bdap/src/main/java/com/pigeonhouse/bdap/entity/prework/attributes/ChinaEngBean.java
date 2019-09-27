package com.pigeonhouse.bdap.entity.prework.attributes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: 邱吉
 * @Date: 2019/9/27 10:33
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChinaEngBean {

    /**
     * 中文标签
     */
    private String label;

    /**
     * 英文标签
     */
    private String elabel;
}
