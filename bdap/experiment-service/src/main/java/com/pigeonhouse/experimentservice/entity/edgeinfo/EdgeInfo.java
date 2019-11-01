package com.pigeonhouse.experimentservice.entity.edgeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EdgeInfo {
    /**
     * 边的id
     */
    String id;

    int index;

    /**
     * 源组件id
     */
    String source;

    /**
     * 源组件锚点位置
     */
    int sourceAnchor;

    /**
     * 目标组件id
     */
    String target;

    /**
     * 目标组件位置
     */
    int targetAnchor;

}
