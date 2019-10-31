package com.pigeonhouse.filesystemservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModifiedMetaData {
    String fileName;
    String modifiedFileName;
    String path;
    List<ModifiedHeaderAttribute> headerAttributes;
    String previewData;

}
