package com.pigeonhouse.bdap.controller;

import com.alibaba.fastjson.JSONObject;
import com.pigeonhouse.bdap.config.HdfsConfig;
import com.pigeonhouse.bdap.entity.prework.Hdfsfile;
import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.HdfsService;
import com.pigeonhouse.bdap.util.response.Response;
import com.pigeonhouse.bdap.util.response.statusimpl.HdfsStatus;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.ObjectUtils;
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
import java.util.*;

/**
 * 本文件所有Api均使用userId作为唯一性索引,在HDFS上的默认用户文件夹名称也为userId
 * @Author: Xingtianyu
 * @Date: 2019/9/19 20:38
 */
@RestController
public class HDFSApi {

    @Autowired
    HdfsService hdfsService;
    @Autowired
    FileHeaderAttriService fileHeaderAttriService;

    /**
     * 获取文件树函数
     * 返回值:带有文件树的JSON字符串
     */
    @PostMapping("/hdfs/getfilelist")
    public Object getFileList(@RequestParam(value = "userId") String userId) {
        try {
            Hdfsfile fileList = hdfsService.listFiles(userId, null);
            if (fileList!= null) {
                JSONObject fileListJson = new JSONObject(new LinkedHashMap());
                for (int idx = 0; idx < fileList.getFilelist().size(); idx++) {
                    JSONObject fileJson = new JSONObject(fileList.getFilelist().get(idx));
                    fileListJson.put("fileInfo" + (idx + 1), fileJson);
                }

                return new Response(HdfsStatus.FILETREE_GET_SUCCESS, fileListJson);
            }
            else
            {
                return new Response(HdfsStatus.USER_NOT_EXISTED,null);
            }
        } catch (Exception e) {
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());
        }
    }

    /**
     * 创建HDFS文件夹函数
     * 返回值:带有提示信息的JSON字符串
     */
    @PostMapping("/hdfs/mkdir")
    public Object mkdir(@RequestParam(value = "dirName") String dirName,@RequestParam(value = "userId") String userId) {
        try {
            boolean success = hdfsService.mkdir(userId+"/"+dirName);
            if (success) {
                return new Response(HdfsStatus.DIRECTORY_CREATE_SUCCESS, null);
            } else {
                return new Response(HdfsStatus.DIRECTORY_HAS_EXISTED, null);

            }
        } catch (Exception e) {
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());
        }
    }

    /**
     * 删除HDFS文件夹函数
     * 返回值:带有提示信息的JSON字符串
     */
    @PostMapping("/hdfs/delete")
    public Object delete(@RequestParam(value = "dirName") String dirName,@RequestParam(value = "userId") String userId) {
        try {
            boolean success = hdfsService.delete(dirName+"/"+userId);
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
    public Object upload(MultipartFile file,String userId,boolean replace) throws IOException {
        try {
            if ( file==null||file.getBytes() == null) {
                return new Response(HdfsStatus.INVALID_INPUT,null);
            }
            else {
                String status = hdfsService.upload(file, userId, replace);
                switch (status) {
                    case "success":
                        return new Response(HdfsStatus.FILE_UPLOAD_SUCCESS, null);
                    case "fileexist":
                        return new Response(HdfsStatus.FILE_HAS_EXISTED, null);
                    case "userinvalid":
                        return new Response(HdfsStatus.USER_NOT_EXISTED, null);
                    default:
                        return null;
                }
            }
        } catch (Exception e) {
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());

        }

    }

    /**
     * 将文件上传至HDFS文件夹，并解析头文件存入数据库
     * 返回值:带有提示信息的JSON字符串
     * @param file 文件传输流
     * @param userId 用户Id,唯一识别码
     * @param replace 如存在重名文件，是否覆盖标签
     * @param regex 文件分隔符
     */
    @PostMapping("/hdfs/uploadwithheader")
    @ResponseBody
    public Object upload(MultipartFile file,String userId,boolean replace,char regex) throws IOException {
        try {
            if ( file==null||file.getBytes() == null) {
                return new Response(HdfsStatus.INVALID_INPUT,null);
            }
            else {
                String []type=file.getOriginalFilename().split("\\.");
                List<String> header=new ArrayList<String>();
                List<String> sample=new ArrayList<String>();
                switch (type[type.length-1])
                {

                    case "csv": case "txt":
                        byte[] buf=file.getBytes();
                        String tmp="";
                        boolean sampleread=false;
                        for(int idx=0;idx<buf.length;idx++)
                        {
                           if(buf[idx]==10&&sampleread==true) {
                               //遇到换行符且数据样本采集完毕跳出
                               sample.add(tmp);
                               tmp="";
                               break;
                           }
                           else if(buf[idx]==10&&sampleread==false)
                           //文件名读取完毕，采集数据样本
                           {
                               header.add(tmp);
                               tmp="";
                               sampleread=true;
                           }
                           else if(idx==buf.length-1)
                           //数据只有一行
                           {
                               tmp+=(char)buf[idx];
                               sample.add(tmp);
                           }
                           else if(buf[idx]==(int)regex && sampleread==true)
                           //数据样本采集
                           {
                               sample.add(tmp);
                               tmp="";
                           }
                           else if(buf[idx]==(int)regex && sampleread==false)
                           //遇到头文件分隔符，保存新数据
                           {
                               header.add(tmp);
                               tmp="";
                           }
                           else if(buf[idx]==13)
                           //回车符跳过
                           {
                               continue;
                           }
                           else  {
                               tmp+=(char)buf[idx];
                           }

                        }
                        buf=null;
                        break;
                        default:break;
                }
                for(int idx=0;idx<sample.size();idx++)
                //将数据样本提取为数据格式
                {
                    sample.set(idx,fileHeaderAttriService.dataTypeCheck(sample.get(idx)));
                }
                Map<String,String> headermap= new HashMap<>(sample.size());
                if(sample.size()!=header.size())
                //如果数据样本或头字段有缺失，报输入非法错误
                {
                    return new Response(HdfsStatus.INVALID_INPUT,null);
                }
                else
                {
                    for(int idx=0;idx<sample.size();idx++) {
                        //生成文件头信息
                        headermap.put(header.get(idx), sample.get(idx));
                    }
                    HdfsConfig hdfsConfig=new HdfsConfig();
                    //执行更新
                    fileHeaderAttriService.saveOrUpdateFileHeader(file.getOriginalFilename(),hdfsConfig.getDefaultDirectory()+"/"+userId+"/"+file.getOriginalFilename(),headermap);
                }
                String status = hdfsService.upload(file, userId, replace);
                switch (status) {
                    case "success":
                        return new Response(HdfsStatus.FILE_UPLOAD_SUCCESS, null);
                    case "fileexist":
                        return new Response(HdfsStatus.FILE_HAS_EXISTED, null);
                    case "userinvalid":
                        return new Response(HdfsStatus.USER_NOT_EXISTED, null);
                    default:
                        return null;
                }
            }
        } catch (Exception e) {
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());

        }

    }
    /**
     * 下载文件所用函数
     * 返回值:文件流
     */
    @PostMapping("/hdfs/download")
    public Object download(@RequestParam("fileName") String fileName,@RequestParam("userId") String userId ,HttpServletResponse response) throws IOException {
        try {
            if (StringUtils.isEmpty(fileName)) {
                return new Response(HdfsStatus.INVALID_INPUT,null);
            }
            InputStream inputStream = (InputStream) hdfsService.download(userId+"/"+fileName);
            if(inputStream!=null) {
                String[] buf = fileName.split("\\.");
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
            return new Response(HdfsStatus.BACKEND_ERROR, e.toString());

        }

    }
}
