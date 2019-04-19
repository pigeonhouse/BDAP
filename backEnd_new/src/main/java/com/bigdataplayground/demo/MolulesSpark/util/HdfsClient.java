package com.bigdataplayground.demo.MolulesSpark.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.IOUtils;

import java.io.*;
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
        //配置hosts https://my.oschina.net/gordonnemo/blog/3017724
        if(userName==null||userName=="") userName = "tseg"; //用开发阶段
        this.hdfsHome= new URI(hdfsHome);
        conf.set("fs.defaultFS", hdfsHome);
        conf.set("fs.hdfs.impl","org.apache.hadoop.hdfs.DistributedFileSystem");
        conf.set("dfs.client.use.datanode.hostname", "true"); //需要添加hosts 将集群别名映射到公网地址10.105.222.*
        fileSystem = FileSystem.get(this.hdfsHome,conf,userName);
    }

    /**
     * 递归地创建目录
     * @param newDir
     * @return
     * @throws IOException
     */
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
                    System.out.println(filePath + "Successfully Deleted");
                    return filePath + "Successfully Deleted";
                } else {
                    System.out.println(filePath+" rm:Failed");
                    return "rm:Failed";
                }
            } else {
                //判断目录是否空
                if(fileSystem.listStatus(new Path(filePath)).length==0) {
                    if (fileSystem.delete(new Path(filePath), false)) {
                        System.out.println(filePath + "Successfully Deleted");
                        return filePath + "Successfully Deleted";
                    } else {
                        System.out.println("rm:Failed");
                        return "rm:Failed";
                    }
                }else{
                    System.out.println(filePath+" Directory is not empty. Use param = R to remove it recursively");
                    return "Directory is not empty. Use param = R to remove it recursively";
                }
            }
        }else {
            System.out.println(filePath+" not exists");
            return "Path not exists";
        }
    }

    /**
     * 递归删除，仅限文件夹（删文件本来也可以，但如果打错名字可能会很危险）
     * @param filePath
     * @return
     * @throws IOException
     */
    public String removeR(String filePath) throws IOException {
        if (fileSystem.exists(new Path(filePath))) {
            if (fileSystem.getFileStatus(new Path(filePath)).isFile()) {
                System.out.println("To avoid accidentally deletion, DO NOT use param = R to remove file");
                return "To avoid accidentally deletion, DO NOT use param = R to remove file";
            }
            if (fileSystem.delete(new Path(filePath), true)) {
                System.out.println(filePath + " Successfully Deleted Recursively");
                return filePath + " Successfully Deleted Recursively";
            } else {
                System.out.println(filePath+" rm -R:Failed");
                return "rm -R:Failed";
            }
        }else {
            System.out.println(filePath+" not exists");
            return "Path not exists";
        }
    }

    public String readFile(String filePath) throws IOException {

        FSDataInputStream fsDataInputStream = fileSystem.open(new Path(filePath));

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        IOUtils.copyBytes(fsDataInputStream,byteArrayOutputStream,4096,true);

        String file = new String(byteArrayOutputStream.toByteArray(),"utf-8");

        System.out.println("-----------"+"File:"+filePath+"----------");

        System.out.println(file);

        System.out.println("-----------"+" End "+filePath+"----------");
        return file;
    }

    /**
     * 要考虑是否覆盖
     * @param filePath
     * @param content
     * @return
     * @throws IOException
     */
    public String saveFile(String filePath,String content,Boolean override) throws IOException {
        if (!override && fileSystem.exists(new Path(filePath))) {
            System.out.println(filePath+" exists, set param = O (Big O)to override.");
            return "File exists, set param = O (Big O)to override.";
        }
        FSDataOutputStream fsDataOutputStream = fileSystem.create(new Path(filePath),override);

        IOUtils.copyBytes(new ByteArrayInputStream(content.getBytes()),
                fsDataOutputStream,4096,true);

        System.out.println(filePath+" saved");
        return filePath+" saved";
    }

    /**
     * @param dstPath 目标地址 对应 请求中的path
     * @param srcPath 本地地址 对应 请求中的srcPath
     * @return
     */
    public String uploadFromLocal(String dstPath,String srcPath) throws IOException {
        Path dst = new Path(dstPath);
        Path src = new Path(srcPath);

        if(fileSystem.getFileStatus (dst).isFile()) {
            return "File Exists";
        }else if(fileSystem.getFileStatus (dst).isDirectory()){
            FSDataOutputStream out = fileSystem.create(new Path(dst+"/"+src.getName()));
        }else{
            FSDataOutputStream out = fileSystem.create(new Path(dstPath));
            FileInputStream fis = new FileInputStream(srcPath);
            IOUtils.copyBytes(fis, out, 4096, true);
        }
        return "Success";
    }

    /**
     * 获取path目录下文件的信息
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

    /**
     * 将fileStatus 转为json格式
     * @param fileStatus
     * @param subDirectory
     * @return
     * @throws IOException
     */
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