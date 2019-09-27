package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.entity.prework.Hdfsfile;
import com.pigeonhouse.bdap.service.HdfsService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.CommonFileStatus;
import com.pigeonhouse.bdap.util.response.statusimpl.HdfsStatus;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.LinkedHashMap;

/**
 * @Author: Xingtianyu
 * @Date: 2019/9/19 20:38
 */
@RestController
public class HDFSApi {

    @Autowired
    HdfsService hdfsService;

    /**
     * 获取文件树函数
     * 返回值:带有文件树的JSON字符串
     */
    @PostMapping("/hdfs/getfilelist")
    public Object getFileList(@RequestParam(value = "filepath") String hdfsPath) {
        try {
            Hdfsfile fileList = hdfsService.listFiles(hdfsPath, null);
            JSONObject fileListJson = new JSONObject(new LinkedHashMap());
            for (int idx = 0; idx < fileList.getFilelist().size(); idx++) {
                JSONObject fileJson = new JSONObject(fileList.getFilelist().get(idx));
                fileListJson.put("fileInfo" + (idx + 1), fileJson);
            }
            return fileListJson;
        } catch (Exception e) {
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());
        }
    }

    /**
     * 创建HDFS文件夹函数
     * 返回值:带有提示信息的JSON字符串
     */
    @PostMapping("/hdfs/mkdir")
    public Object mkdir(@RequestParam(value = "filepath") String hdfsPath) {
        try {
            boolean success = hdfsService.mkdir(hdfsPath);
            if (success) {
                JSONObject successJson = new JSONObject();
                successJson.put("issuccess", "create directory successfully!");
                return successJson;
            } else {
                JSONObject existJson = new JSONObject();
                existJson.put("issuccess", "directory has existed!");
                return existJson;

            }
        } catch (Exception e) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("error", e.toString());
            return errorJson;

        }
    }

    /**
     * 删除HDFS文件夹函数
     * 返回值:带有提示信息的JSON字符串
     */
    @PostMapping("/hdfs/delete")
    public Object delete(@RequestParam(value = "filepath") String Hdfspath) {
        try {
            boolean success = hdfsService.delete(Hdfspath);
            if (success) {
                return new Response(HdfsStatus.FILE_DELETE_SUCCESS, null);
            } else {
                return new Response(HdfsStatus.FILE_NOT_EXISTED, null);

            }

        } catch (Exception e) {
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());

        }
    }

    /**
     * 将文件上传至HDFS文件夹函数
     * 返回值:带有提示信息的JSON字符串
     */
    @PostMapping("/hdfs/upload")
    @ResponseBody
    //超大规模文件尚未通过测试，有待后续补充，已知文件超过500M浏览器会崩掉，切片功能还在写
    //xls支持尚在开发中
    public Object upload(MultipartFile file, String dstPath) throws IOException {
        try {
            if (StringUtils.isEmpty(dstPath) || file.getBytes() == null) {
                return new Response(HdfsStatus.INVALID_INPUT,null);
            }
            String returnInfo = (String) hdfsService.upload(file, dstPath);
             return new Response(HdfsStatus.FILE_UPLOAD_SUCCESS,null);
        } catch (Exception e) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("info", e.toString());
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());

        }

    }

    /**
     * 下载文件所用函数
     * 返回值:文件流
     */
    @PostMapping("/hdfs/download")
    public Object download(@RequestParam("filepath") String dstPath, HttpServletResponse response) throws IOException {
        try {
            if (StringUtils.isEmpty(dstPath)) {
                return new Response(HdfsStatus.INVALID_INPUT,null);
            }
            InputStream inputStream = (InputStream) hdfsService.download(dstPath);
            if(inputStream!=null) {
                String[] buf = dstPath.split("\\.");
                switch (buf[buf.length - 1]) {
                    case "bmp":
                        response.setContentType("image/bmp");
                        break;
                    case "gif":
                        response.setContentType("image/gif");
                        break;
                    case "jpeg":
                        response.setContentType("image/jpeg");
                        break;
                    case "jpg":
                        response.setContentType("image/jpeg");
                        break;
                    case "html":
                        response.setContentType("text/html");
                        break;
                    case "txt":
                        response.setContentType("text/plain");
                        break;
                    case "csv":
                        response.setContentType("text/plain");
                        break;
                    case "xml":
                        response.setContentType("text/xml");
                        break;
                    default:
                        break;
                }
                OutputStream os = response.getOutputStream();
                byte[] b = new byte[4096];
                int length;

                while ((length = inputStream.read(b)) > 0) {
                    os.write(b, 0, length);
                }
                os.close();
                inputStream.close();
                return new Response(HdfsStatus.FILE_DOWNLOAD_SUCCESS, null);
            }
            else
            {
                return new Response(HdfsStatus.FILE_NOT_EXISTED, null);
            }
        } catch (Exception e) {
            JSONObject errorJson = new JSONObject();
            errorJson.put("info", e.toString());
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());

        }

    }
}
