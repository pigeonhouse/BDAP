package com.pigeonhouse.bdap.entity.nodeinfo;

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
public class LabelName {

    /**
     * 中文标签（页面上显示的）
     */
    private String label;

    /**
     * 英文标签（代码中的）
     */
    private String elabel;
}
