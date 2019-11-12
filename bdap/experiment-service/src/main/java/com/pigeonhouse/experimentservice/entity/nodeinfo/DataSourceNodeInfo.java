package com.pigeonhouse.experimentservice.entity.nodeinfo;

import com.pigeonhouse.experimentservice.entity.FileAttr.HeaderAttribute;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataSourceNodeInfo extends NodeInfo implements Serializable {
    private String filePath;

}
