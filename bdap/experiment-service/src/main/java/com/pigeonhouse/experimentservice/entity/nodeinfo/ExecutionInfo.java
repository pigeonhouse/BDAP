package com.pigeonhouse.experimentservice.entity.nodeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 在前端提交工作流后
 * 给前端返回此对象组成的数组
 * 用于根据此信息进行轮询以查询进度
 *
 * @Author: XueXiaoYue
 * @Date: 2019/9/8 22:27
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExecutionInfo implements Serializable {
    String id;
    String resultUrl;
}
