package com.pigeonhouse.filesystemservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HeaderAttribute {


    private String colName;
    private String modifiedColName;

    private String dataType;
    private String modifiedDataType;

    private boolean selected;

    public HeaderAttribute(String colName, String dataType) {
        this.colName = colName;
        this.dataType = dataType;
    }
}