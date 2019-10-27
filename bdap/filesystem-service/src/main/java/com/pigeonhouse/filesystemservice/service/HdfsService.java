package com.pigeonhouse.filesystemservice.service;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HdfsService {
    @Value("${defaultHdfsUri}")
    private String defaultHdfsUri;
    @Value("${defaultDirectory}")
    private String defaultDirectory;

    private Logger logger = LoggerFactory.getLogger(HdfsService.class);
    private Configuration conf;

    private FileSystem getFileSystem() throws IOException {
        conf = new Configuration();
        conf.set("dfs.client.use.datanode.hostname", "true");
        conf.set("fs.defaultFS", defaultHdfsUri);
        return FileSystem.get(conf);
    }

    public boolean mkdir(String path) throws Exception {
        FileSystem fileSystem = getFileSystem();
        try {
            String hdfsPath = defaultHdfsUri + defaultDirectory + path;
            return fileSystem.mkdirs(new Path(hdfsPath));
        } catch (IOException e) {
            logger.error(MessageFormat.format("创建HDFS目录失败，path:{0}", path), e);
            return false;
        } finally {
            close(fileSystem);
        }
    }

    /**
     * 获取HDFS上面的某个路径下面的所有文件或目录（不包含子目录）信息
     */
    public List<Map<String, Object>> listFiles(String path, PathFilter pathFilter) throws Exception {
        List<Map<String, Object>> result = new ArrayList<>();
        FileSystem fileSystem = getFileSystem();

        try {
            String hdfsPath = defaultHdfsUri + defaultDirectory + path;

            FileStatus[] statuses;
            //根据Path过滤器查询
            if (pathFilter != null) {
                statuses = fileSystem.listStatus(new Path(hdfsPath), pathFilter);
            } else {
                statuses = fileSystem.listStatus(new Path(hdfsPath));
            }

            if (statuses != null) {
                for (FileStatus status : statuses) {
                    Map<String, Object> fileMap = new HashMap<>(3);
                    String[] pathBuf = status.getPath().toString().split("/");
                    fileMap.put("filename", pathBuf[pathBuf.length - 1]);
                    fileMap.put("isDir", status.isDirectory());

                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    //设置格式
                    String timeText = format.format(status.getModificationTime());
                    fileMap.put("ModificationTime", timeText);
                    result.add(fileMap);

                }
                return result;
            }
        } catch (IOException e) {
            logger.error(MessageFormat.format("获取HDFS上面的某个路径下面的所有文件失败，path:{0}", path), e);
        } finally {
            close(fileSystem);
        }
        return null;
    }

    public boolean delete(String path) {
        String hdfsPath = defaultHdfsUri + defaultDirectory + path;
        FileSystem fileSystem = null;
        try {
            fileSystem = getFileSystem();
            return fileSystem.delete(new Path(hdfsPath), true);
        } catch (IOException e) {
            logger.error(MessageFormat.format("删除HDFS文件或目录失败，path:{0}", path), e);
        } finally {
            close(fileSystem);
        }

        return false;
    }


    public void upload(MultipartFile file, String path) throws IOException {
        String fileName = file.getOriginalFilename();
        FileSystem fs = getFileSystem();
        System.out.println("path:");
        System.out.println(defaultHdfsUri + defaultDirectory + path + "/" + fileName);
        Path newPath = new Path(defaultHdfsUri + defaultDirectory + path + "/" + fileName);
        FSDataOutputStream outputStream = fs.create(newPath);
        outputStream.write(file.getBytes());
        outputStream.close();
        close(fs);
    }


    private void close(FileSystem fileSystem) {
        if (fileSystem != null) {
            try {
                fileSystem.close();
            } catch (IOException e) {
                logger.error(e.getMessage());
            }
        }
    }

}
