package com.bigdataplayground.demo.MolulesSpark.domain;

public class ApiResult {

    private int code;

    private String msg;

    private Object data;

    public static ApiResult createOKData(Object data) {
        return createWithCodeAndData(ApiConstant.Code.OK, null, data);
    }

    public static ApiResult createOKMsg(String message) {
        ApiResult result = new ApiResult();
        result.setCode(ApiConstant.Code.OK);
        result.setMsg(message);
        return result;
    }

    public static ApiResult createNgMsg(String message) {
        return createWithCodeAndData(ApiConstant.Code.NG, message, null);
    }

    private static ApiResult createOKMsgAndData(String message,Object data){
        return createWithCodeAndData(ApiConstant.Code.OK, message, data);
    }

    private static ApiResult createWithCodeAndData(int code, String message, Object data) {
        ApiResult result = new ApiResult();
        result.setCode(code);
        result.setMsg(message);
        result.setData(data);
        return result;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    private static class ApiConstant{
        private static class Code{
            private static int OK = 200;
            private static int NG = 404;
        }
    }
}

