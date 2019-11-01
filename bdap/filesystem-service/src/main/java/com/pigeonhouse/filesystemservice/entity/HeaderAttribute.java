package com.pigeonhouse.filesystemservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HeaderAttribute {

    private String colName;
    private String dataType;

    public HeaderAttribute(String colName, String dataType) {
        this.colName = colName;
        this.dataType = dataType;
    }
}