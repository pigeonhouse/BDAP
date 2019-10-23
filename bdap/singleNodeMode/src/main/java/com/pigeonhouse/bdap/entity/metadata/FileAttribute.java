package com.pigeonhouse.bdap.entity.metadata;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author XingTianYu
 * @date 2019/9/25 10:20
 */
@Data
@AllArgsConstructor

public class FileAttribute {
    private String fileName;
    private String filePath;
    private List<HeaderAttribute> fileColumnsInfo;

    public FileAttribute() {
        this.fileColumnsInfo = new ArrayList<>();
    }
}
