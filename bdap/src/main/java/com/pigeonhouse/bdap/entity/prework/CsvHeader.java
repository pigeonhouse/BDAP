package com.pigeonhouse.bdap.entity.prework;

import com.pigeonhouse.bdap.entity.prework.valueattrs.HeaderAttribute;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @Author: 邱吉
 * @Date: 2019/9/27 10:33
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CsvHeader {

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
