package com.pigeonhouse.filesystemservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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