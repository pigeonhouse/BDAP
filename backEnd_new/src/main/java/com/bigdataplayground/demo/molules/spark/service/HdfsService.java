package com.bigdataplayground.demo.MolulesSpark.service;

import com.bigdataplayground.demo.MolulesSpark.domain.ApiResult;
import com.bigdataplayground.demo.MolulesSpark.domain.FileStatusEx;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.IOUtils;
import org.springframework.scheduling.annotation.Async;

import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@Async
public class HdfsService {
    private Configuration conf = new Configuration();
    private URI hdfsHome ;
    private FileSystem fileSystem ;
    private ObjectMapper objectMapper = new ObjectMapper();

    public HdfsService(String hdfsHome, String userName) throws URISyntaxException, IOException, InterruptedException {
        //配置hosts https://my.oschina.net/gordonnemo/blog/3017724
        if(userName==null||userName=="") userName = "tseg"; //用开发阶段
        this.hdfsHome= new URI(hdfsHome);
        conf.set("fs.defaultFS", hdfsHome);
        conf.set("fs.hdfs.impl","org.apache.hadoop.hdfs.DistributedFileSystem");
        conf.set("dfs.client.use.datanode.hostname", "true"); //需要添加hosts 将集群别名映射到公网地址10.105.222.***
        fileSystem = FileSystem.get(this.hdfsHome,conf,userName);
    }

    /**
     * 递归地创建目录
     * @param newDir 新目录
     * @return 返回api结果
     * @throws IOException
     */
    @Async("asyncExecutor")
    public ApiResult makeDirectory(String newDir) throws IOException {
        if(fileSystem.exists(new Path(newDir))){
            return ApiResult.createNgMsg("Already Exists.");
        }else if(fileSystem.mkdirs(new Path(newDir))){
            return ApiResult.createOKMsg( newDir+" is successfully Created");
        }else{
            return ApiResult.createNgMsg("mkdir:Failed");
        }
    }

    /**
     * 删除文件、删除空目录
     * @param filePath
     * @return
     * @throws IOException
     */
    public ApiResult remove(String filePath) throws IOException {
        if (fileSystem.exists(new Path(filePath))) {
            if (fileSystem.getFileStatus(new Path(filePath)).isFile()) {
                if (fileSystem.delete(new Path(filePath), false)) {
                    System.out.println(filePath + "Successfully Deleted");
                    return ApiResult.createOKMsg(filePath + "Successfully Deleted");
                } else {
                    System.out.println(filePath+" rm:Failed");
                    return ApiResult.createNgMsg("rm:Failed");
                }
            } else {
                //判断目录是否空
                if(fileSystem.listStatus(new Path(filePath)).length==0) {
                    if (fileSystem.delete(new Path(filePath), false)) {
                        System.out.println(filePath + "Successfully Deleted");
                        return ApiResult.createOKMsg(filePath + "Successfully Deleted");
                    } else {
                        System.out.println("rm:Failed");
                        return ApiResult.createNgMsg("rm:Failed");
                    }
                }else{
                    System.out.println(filePath+" Directory is not empty. Use param = R to remove it recursively");
                    return ApiResult.createNgMsg("Directory is not empty. Use param = R to remove it recursively");
                }
            }
        }else {
            System.out.println(filePath+" not exists");
            return ApiResult.createNgMsg("Path not exists");
        }
    }

    /**
     * 递归删除，仅限文件夹（删文件本来也可以，但如果打错名字可能会很危险）
     * @param filePath
     * @return
     * @throws IOException
     */
    public ApiResult removeR(String filePath) throws IOException {
        if (fileSystem.exists(new Path(filePath))) {
            if (fileSystem.getFileStatus(new Path(filePath)).isFile()) {
                System.out.println("To avoid accidentally deletion, DO NOT use param = R to remove file");
                return ApiResult.createNgMsg("To avoid accidentally deletion, DO NOT use param = R to remove file");
            }
            if (fileSystem.delete(new Path(filePath), true)) {
                System.out.println(filePath + " Successfully Deleted Recursively");
                return ApiResult.createOKMsg(filePath + " Successfully Deleted Recursively");
            } else {
                System.out.println(filePath+" rm -R:Failed");
                return ApiResult.createNgMsg("rm -R:Failed");
            }
        }else {
            System.out.println(filePath+" not exists");
            return ApiResult.createNgMsg("Path not exists");
        }
    }

    public ApiResult readFile(String filePath) throws IOException {

        if(!fileSystem.exists(new Path(filePath))) {
            return ApiResult.createNgMsg(filePath + " File does not exist");
        }
        FSDataInputStream fsDataInputStream = fileSystem.open(new Path(filePath));

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        IOUtils.copyBytes(fsDataInputStream, byteArrayOutputStream, 4096, true);

        String file = new String(byteArrayOutputStream.toByteArray(), "utf-8");

        System.out.println("-----------" + "File:" + filePath + "----------");

        System.out.println(file);

        System.out.println("-----------" + " End " + filePath + "----------");

        return ApiResult.createOKData(file);
    }

    /**
     * 要考虑是否覆盖
     * @param filePath
     * @param content
     * @return
     * @throws IOException
     */
    public ApiResult saveFile(String filePath,String content,Boolean override) throws IOException {
        if (!override && fileSystem.exists(new Path(filePath))) {
            System.out.println(filePath+" exists, set param = O (Big O)to override.");
            return ApiResult.createNgMsg("File exists, set param = O (Big O)to override.");
        }
        FSDataOutputStream fsDataOutputStream = fileSystem.create(new Path(filePath),override);

        IOUtils.copyBytes(new ByteArrayInputStream(content.getBytes()),
                fsDataOutputStream,4096,true);

        System.out.println(filePath+" saved");
        return ApiResult.createOKMsg(filePath+" saved");
    }

    /**
     * @param srcPath 本地地址 对应 请求中的srcPath
     * @param dstPath 目标地址 对应 请求中的path
     * @return
     */
    public ApiResult uploadFromLocal(String srcPath,String dstPath) throws IOException {
        Path dst = new Path(dstPath);
        Path src = new Path(srcPath);
        String msg ="";
        FSDataOutputStream out = null;
        //dst 已经存在，如果为文件就返回存在，如果是目录则修改dst
        if(fileSystem.exists(dst)) {
            if (fileSystem.getFileStatus(dst).isFile()) {
                msg =  dst + " File Exists";
                System.out.println(msg);
                return  ApiResult.createNgMsg(msg);
            } else if (fileSystem.getFileStatus(dst).isDirectory()) {
                dst = new Path(dst + "/" + src.getName());
                out = fileSystem.create(dst);
                msg = src + ":File is uploaded to Dstpath:"+dst;
            }
        }else{ //路径不存在，则直接上传
            out = fileSystem.create(dst);
            msg = srcPath+": File is uploaded to Dstpath:"+ dst;

        }
        FileInputStream fis = new FileInputStream(srcPath);
        IOUtils.copyBytes(fis, out, 4096, true);
        msg = msg +" Successfully";
        System.out.println(msg);
        return ApiResult.createOKMsg(msg);
    }

    /**
     * 获取path目录下所有文件的信息
     * @param rootPath
     * @return
     * @throws IOException
     */
    public ApiResult tree(String rootPath) throws IOException {
        List<FileStatusEx> fileTree = getAllFilePath(new Path(rootPath));
        return ApiResult.createOKData(fileTree);
    }

    public List<FileStatusEx> getAllFilePath(Path filePath) throws IOException {
        List<FileStatusEx> fileStatusExList = new ArrayList<>();
        FileStatus[] fileStatusList = fileSystem.listStatus(filePath);//存放当前目录下所有文件或子目录
        for (FileStatus fileStatus : fileStatusList) {
            //或许可以继承什么的，面向对象没学好= =，先用个笨点的办法
            FileStatusEx fileStatusEx = new FileStatusEx(fileStatus);
            if (fileStatus.isDirectory()) {
                //加入子目录
                fileStatusEx.setSubDirectory(getAllFilePath(fileStatus.getPath()));
                fileStatusExList.add(fileStatusEx);
            } else {
                //加入文件
                fileStatusExList.add(fileStatusEx);//
            }
        }
        return fileStatusExList;
    }
}