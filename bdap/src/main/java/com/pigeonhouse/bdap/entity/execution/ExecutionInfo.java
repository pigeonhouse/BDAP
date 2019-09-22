package com.pigeonhouse.bdap.entity.execution;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/8 22:27
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExecutionInfo {
    Integer index;
    String jobId;
    String resultUrl;
}
