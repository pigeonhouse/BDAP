package com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo.style;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class NumberStyle {
    /**
     * 数字下界
     */
    String min;

    /**
     * 数字上界
     */
    String max;
    /**
     * 步长，供前端使用上调下调按钮提高用户体验。
     */
    String step;


}
