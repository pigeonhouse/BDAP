package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;
/**
 * Author：ZhangJiaYi
 * Time:2019/9/29 17:10
 */

    public enum ExperimentStatus implements Status {
        //
        EXPERIMENT_SEARCH_SUCCESS(200, "示例查找成功!"),
        EXPERIMENT_SEARCH_ERROR(401, "示例查找失败!"),
        EXPERIMENT_SAVE_SUCCESS(201, "保存成功!"),
        EXPERIMENT_DELETE_SUCCESS(202, "删除成功!"),
        EXPERIMENT_UPDATE_SUCCESS(203, "更新成功!"),
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

