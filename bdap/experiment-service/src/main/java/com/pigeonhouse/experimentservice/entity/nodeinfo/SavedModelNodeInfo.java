package com.pigeonhouse.experimentservice.entity.nodeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavedModelNodeInfo extends NodeInfo{
    String modelId;
    String name;

}
