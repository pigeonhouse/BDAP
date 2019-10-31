package com.pigeonhouse.filesystemservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifiedHeaderAttribute {
    private String colName;
    private String modifiedColName;

    private String dataType;
    private String modifiedDataType;

    private boolean selected;
}
