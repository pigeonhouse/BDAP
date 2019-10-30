package com.pigeonhouse.experimentservice.entity.nodeinfo.attrinfo;

import com.pigeonhouse.experimentservice.entity.nodeinfo.LabelName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttrInfo {
    /**
     * 包含中文名与英文名
     */
    LabelName labelName;

    /**
     * 返回值对应的scala类型
     * 如：
     * Int
     * String
     * Array[String]
     * ...
     */
    String valueType;

    /**
     * 对应./style文件夹下的各种属性类型的style
     */
    Object style;

    /**
     * style的类型
     * Select
     * Number
     * Input
     * ChooseCol
     * CheckBox
     */
    String styleType;

    /**
     * Note:该value在前端第一次请求时表示默认值
     * 在用户选择完参数后返回给后端的数据中该value才有值
     */
    Object value;

    public AttrInfo(LabelName labelName, String valueType, Object value) {
        this.labelName = labelName;
        this.valueType = valueType;
        this.value = value;
    }
}
