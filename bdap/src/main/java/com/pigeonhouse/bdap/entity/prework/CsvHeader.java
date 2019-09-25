package com.pigeonhouse.bdap.entity.prework;

import com.pigeonhouse.bdap.entity.prework.attributes.HeaderAttribute;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CsvHeader {

    /**
     * 文件编码
     */
    private String fileId;

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 文件路径
     */
    private String filePath;

    /**
     * 文件字段头信息
     */
    private ArrayList<HeaderAttribute> attrHeaderSet;

}
