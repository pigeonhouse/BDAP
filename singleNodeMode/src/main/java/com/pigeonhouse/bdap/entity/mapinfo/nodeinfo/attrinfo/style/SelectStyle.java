package com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.attrinfo.style;

import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.LabelName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/3 14:58
 * 下拉框类型
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectStyle {

    /**
     * 下拉菜单显示的参数值，
     * 如["平均值","中位数","最大值","最小值"]
     */
    LabelName[] menu;


}
