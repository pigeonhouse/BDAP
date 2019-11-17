package com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo.style;

import com.pigeonhouse.experimentservice.entity.nodeinfo.LabelName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectStyle implements Serializable {

    /**
     * 下拉菜单显示的参数值，
     * 如["平均值","中位数","最大值","最小值"]
     */
    LabelName[] menu;


}
