package com.bigdataplayground.demo.MolulesSpark.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;

import javax.annotation.Nullable;
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

    public HdfsClient(String hdfsHome) throws URISyntaxException, IOException, InterruptedException {
        this.hdfsHome= new URI(hdfsHome);
        conf.set("fs.defaultFS", hdfsHome);
        fileSystem = FileSystem.get(this.hdfsHome,conf,"tseg");
    }

    public String makeDirectory(String newDir) throws IOException {
        if(fileSystem.exists(new Path(newDir))){
            return "Already Exists.";
        }else if(fileSystem.mkdirs(new Path(newDir))){
            return "Success";
        }else{
            return "Mkdir Failed";
        }

    }

    public String fetchFile(){
    return null;
    }

    /**
     * 获取当前目录文件
     * @param srcpath
     * @return
     * @throws IOException
     */
    @Deprecated
    public List<String> getFileList(String srcpath) throws IOException {

        FileStatus[] fileStatuses = fileSystem.listStatus(new Path(srcpath));
        List<String> fileList =new ArrayList<>();
        for (FileStatus fileStatus : fileStatuses) {

            String isDir = fileStatus.isDirectory() ? "文件夹" : "文件";
            short replication = fileStatus.getReplication();
            long len = fileStatus.getLen();

            String path = fileStatus.getPath().toString();
            System.out.println(path);

            fileList.add(isDir + "\t" + replication + "\t" + len + "\t" + path);

            System.out.println(isDir + "\t" + replication + "\t" + len + "\t" + path);
        }
        return fileList;
    }

    /**
     * 递归地获取所有文件（不包括文件夹）
     * @param filePath
     * @return
     * @throws IOException
     */
    public List<String> getAllFilePath(Path filePath) throws IOException {
        List<String> fileList = new ArrayList<String>();
        FileStatus[] fileStatusList = fileSystem.listStatus(filePath);
        for (FileStatus fileStatus : fileStatusList) {
            if (fileStatus.isDirectory()) {
                fileList.add(fileStatusToString(fileStatus,getAllFilePath(fileStatus.getPath())));
            } else {
                fileList.add(fileStatusToString(fileStatus,null));
            }
        }
        return fileList;
    }

    public boolean exists(String path) throws IOException {
        boolean isExists = false;
        Path hdfsPath = new Path(path);

        isExists = fileSystem.exists(hdfsPath);
        return isExists;
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
            ((ObjectNode) fileNode).putPOJO("subDirectory",subDirectory);
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