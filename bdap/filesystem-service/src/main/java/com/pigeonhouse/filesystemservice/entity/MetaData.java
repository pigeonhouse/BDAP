package com.pigeonhouse.filesystemservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MetaData {
    String fileName;
    String path;
    List<HeaderAttribute> headerAttributes;
    String previewData;

    public MetaData(String fileName, List<HeaderAttribute> headerAttributes, String previewData) {
        this.fileName = fileName;
        this.headerAttributes = headerAttributes;
        this.previewData = previewData;
    }
}
