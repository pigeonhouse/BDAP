package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;
/**
 * Author：ZhangJiaYi
 * Time:2019/9/29 17:10
 */

    public enum ExperimentStatus implements Status {

        EXPERIMENT_SEARCH_SUCCESS(200, "示例查找成功!"),
        EXPERIMENT_SEARCH_ERROR(401, "示例查找失败!"),
        BACKEND_ERROR(999, "后端出现算法错误,仅供调试使用,不显示给用户");

        Integer code;
        String message;

        ExperimentStatus(Integer code, String message) {
            this.code = code;
            this.message = message;
        }

        @Override
        public Integer getCode() {
            return code;
        }

        @Override
        public String getMessage() {
            return message;
        }

    }

