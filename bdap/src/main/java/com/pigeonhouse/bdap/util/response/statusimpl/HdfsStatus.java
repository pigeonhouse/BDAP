package com.pigeonhouse.bdap.util.response.statusimpl;

import com.pigeonhouse.bdap.util.response.Status;

public enum HdfsStatus implements Status {
    //正确信息
    FILE_UPLOAD_SUCCESS(200, "上传文件成功!"),
    FILETREE_GET_SUCCESS(201, "获取文件树成功!"),
    FILE_DOWNLOAD_SUCCESS(202,"获取下载源成功!"),
    DIRECTORY_CREATE_SUCCESS(203,"创建文件夹成功!"),
    FILE_DELETE_SUCCESS(204,"删除文件夹成功!"),
    //错误信息
    FILE_NOT_EXISTED(409, "文件不存在!"),
    INVALID_INPUT(410,"输入非法!"),
    //其他信息
    BACKEND_ERROR(999,"后端出现算法错误,仅供调试使用,不显示给用户");


    Integer code;
    String message;


    HdfsStatus(Integer code, String message) {
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
