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
public class HeaderAttribute {

    /**
     * 字段头属性名称
     */
    private String colName;

    /**
     * 字段头属性类型
     */
    private String dataType;

}
