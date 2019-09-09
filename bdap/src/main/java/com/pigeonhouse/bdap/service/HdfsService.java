//package com.pigeonhouse.bdap.service;
//
//import com.alibaba.fastjson.JSONObject;
//import org.springframework.stereotype.Service;
//
//import java.io.ByteArrayOutputStream;
//import org.apache.hadoop.conf.Configuration;
//import org.apache.hadoop.fs.*;
//import org.apache.hadoop.io.IOUtils;
///**
// * @Author: XueXiaoYue
// * @Date: 2019/9/8 22:55
// */
//@Service
//public class HdfsService {
//
//    JSONObject readFile(){
//        FileSystem fileSystem ;
//        if(!fileSystem.exists(new Path(filePath))) {
//            return ApiResult.createNgMsg(filePath + " File does not exist");
//        }
//        FSDataInputStream fsDataInputStream = fileSystem.open(new Path(filePath));
//
//        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//
//        IOUtils.copyBytes(fsDataInputStream, byteArrayOutputStream, 4096, true);
//
//        String file = new String(byteArrayOutputStream.toByteArray(), "utf-8");
//
//        System.out.println("-----------" + "File:" + filePath + "----------");
//
//        System.out.println(file);
//
//        System.out.println("-----------" + " End " + filePath + "----------");
//
//        return ApiResult.createOKData(file);
//    }
//
//}
