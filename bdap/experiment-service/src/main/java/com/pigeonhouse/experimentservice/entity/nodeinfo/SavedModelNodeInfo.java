package com.pigeonhouse.experimentservice.entity.nodeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavedModelNodeInfo extends NodeInfo implements Serializable {
    private String modelId;
    private String name;
    private String algorithmType;
}
