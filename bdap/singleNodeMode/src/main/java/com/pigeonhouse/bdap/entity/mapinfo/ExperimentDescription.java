package com.pigeonhouse.bdap.entity.mapinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/10/15 12:44
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperimentDescription implements Serializable {
    String experimentId;
    String userId;
    String title;
    String description;
}
