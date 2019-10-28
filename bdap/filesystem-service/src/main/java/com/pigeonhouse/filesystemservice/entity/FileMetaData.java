package com.pigeonhouse.filesystemservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileMetaData {
    String fileName;
    String modifiedFileName;
    String path;
    String modifiedPath;
    List<HeaderAttribute> headerAttributes;
    String previewData;
}
