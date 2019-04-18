package com.bigdataplayground.demo.MolulesSpark.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;


public class HdfsClient {
    private Configuration conf = new Configuration();
    private URI hdfsHome ;
    private FileSystem fileSystem ;
    private ObjectMapper objectMapper = new ObjectMapper();

    public HdfsClient(String hdfsHome,String userName) throws URISyntaxException, IOException, InterruptedException {
        if(userName==null) userName = "tseg";
        this.hdfsHome= new URI(hdfsHome);
        conf.set("fs.defaultFS", hdfsHome);
        fileSystem = FileSystem.get(this.hdfsHome,conf,userName);
    }

    public String makeDirectory(String newDir) throws IOException {
        if(fileSystem.exists(new Path(newDir))){
            return "Already Exists.";
        }else if(fileSystem.mkdirs(new Path(newDir))){
            return newDir+"Successfully Created";
        }else{
            return "mkdir:Failed";
        }
    }

    public boolean exists(String path) throws IOException {

        return fileSystem.exists(new Path(path));
    }

    /**
     * 删除文件、删除空目录
     * @param filePath
     * @return
     * @throws IOException
     */
    public String remove(String filePath) throws IOException {
        if (fileSystem.exists(new Path(filePath))) {
            if (fileSystem.getFileStatus(new Path(filePath)).isFile()) {
                if (fileSystem.delete(new Path(filePath), false)) {
                    return filePath + "Successfully Deleted";
                } else {
                    return "rm:Failed";
                }
            } else {
                //判断是否空
                if(fileSystem.listStatus(new Path(filePath)).length==0) {
                    if (fileSystem.delete(new Path(filePath), false)) {
                        return filePath + "Successfully Deleted";
                    } else {
                        return "rm:Failed";
                    }
                }else{
                    return "Directory is not empty. Use kind = rmR to remove it anyway.";
                }
            }
        }else {
            return "Path not exists";
        }
    }

    /**
     * 删除
     * @param filePath
     * @return
     * @throws IOException
     */
    public String removeR(String filePath) throws IOException {
        if (fileSystem.getFileStatus(new Path(filePath)).isFile()) {
            return "To Avoid incorrect operation, use kind = rm to remove file";
        }
        if (fileSystem.exists(new Path(filePath))) {
            if (fileSystem.delete(new Path(filePath), true)) {
                return filePath + " Successfully Deleted Recursively";
            } else {
                return "rmR:Failed";
            }
        }else {
            return "Path not exists";
        }
    }

    public String fetchFile(){
    return null;
    }

    /**
     * 递归地获取所有文件（不包括文件夹）
     * @param filePath
     * @return
     * @throws IOException
     */
    public List<String> getAllFilePath(Path filePath) throws IOException {
        List<String> fileList = new ArrayList<String>();
        FileStatus[] fileStatusList = fileSystem.listStatus(filePath);//存放当前目录下所有文件或子目录
        for (FileStatus fileStatus : fileStatusList) {
            if (fileStatus.isDirectory()) {
                //加入子目录
                fileList.add(fileStatusToString(fileStatus,getAllFilePath(fileStatus.getPath())));
            } else {
                //加入文件
                fileList.add(fileStatusToString(fileStatus,null));//
            }
        }
        return fileList;
    }



    public String fileStatusToString(FileStatus fileStatus, List<String> subDirectory) throws IOException {
        StringBuilder sb = new StringBuilder();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode fileNode = objectMapper.createObjectNode();
        ((ObjectNode) fileNode).put("path", String.valueOf(fileStatus.getPath()));
        ((ObjectNode) fileNode).put("isDirectory", fileStatus.isDirectory());
        if (!fileStatus.isDirectory()) {
            ((ObjectNode) fileNode).put("length", fileStatus.getLen());
            ((ObjectNode) fileNode).put("replication", fileStatus.getReplication());
            ((ObjectNode) fileNode).put("blocksize", fileStatus.getBlockSize());
        }else{
            ((ObjectNode) fileNode).putPOJO("subDirectory",subDirectory);//反斜杠的罪恶之源
        }
        ((ObjectNode) fileNode).put("modification_time", fileStatus.getModificationTime());
        ((ObjectNode) fileNode).put("access_time", fileStatus.getAccessTime());
        ((ObjectNode) fileNode).put("owner", fileStatus.getOwner());
        ((ObjectNode) fileNode).put("group", fileStatus.getGroup());
        ((ObjectNode) fileNode).put("permission", String.valueOf(fileStatus.getPermission()));
        ((ObjectNode) fileNode).put("isSymlink", fileStatus.isSymlink());
        if (fileStatus.isSymlink()) {
            ((ObjectNode) fileNode).put("symlink", String.valueOf(fileStatus.getSymlink()));
        }
        System.out.println(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(fileNode));
        return objectMapper.writeValueAsString(fileNode);
    }

}