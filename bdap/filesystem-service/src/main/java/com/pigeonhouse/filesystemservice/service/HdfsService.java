package com.pigeonhouse.filesystemservice.service;

import com.pigeonhouse.filesystemservice.entity.HeaderAttribute;
import com.pigeonhouse.filesystemservice.entity.LivySessionInfo;
import com.pigeonhouse.filesystemservice.entity.MetaData;
import com.pigeonhouse.filesystemservice.util.PathParser;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Autowired
    LivyService livyService;

    private Logger logger = LoggerFactory.getLogger(HdfsService.class);

    private FileSystem getFileSystem() throws IOException {
        Configuration conf = new Configuration();
        conf.set("dfs.client.use.datanode.hostname", "true");
        conf.set("fs.defaultFS", defaultHdfsUri);
        return FileSystem.get(conf);
    }

    private String getHdfsPath(String path) {
        String hdfsPath = defaultHdfsUri + defaultDirectory;
        return hdfsPath + path;
    }

    /**
     * #name 标志该目录下存在一个叫name的文件夹
     */
    public void mkdir(String path) throws Exception {
        FileSystem fileSystem = getFileSystem();
        String dirPath = PathParser.getDirPath(path);
        String name = PathParser.getName(path);
        fileSystem.mkdirs(new Path(getHdfsPath(dirPath) + "/#" + name));
        fileSystem.mkdirs(new Path(getHdfsPath(path)));
    }

    /**
     * .common 标志该目录下存在一个叫common的文件是常用文件
     */
    public void setCommonFile(String path) throws Exception {
        FileSystem fileSystem = getFileSystem();
        String dirPath = PathParser.getDirPath(path);
        String name = PathParser.getName(path);
        fileSystem.mkdirs(new Path(getHdfsPath(dirPath) + "/." + name));
    }

    public void cancelCommonFile(String path) throws Exception {
        String dirPath = PathParser.getDirPath(path);
        String name = PathParser.getName(path);
        delete(dirPath + "/." + name);
    }


    public List<Map<String, Object>> listFiles(String path) throws Exception {
        List<Map<String, Object>> result = new ArrayList<>();
        FileSystem fileSystem = getFileSystem();

        String hdfsPath = getHdfsPath(path);
        System.out.println(hdfsPath);
        FileStatus[] statuses = fileSystem.listStatus(new Path(hdfsPath));
        List<String> commonFileList = new ArrayList<>();
        List<String> dirList = new ArrayList<>();

        for (FileStatus status : statuses) {
            String[] pathBuf = status.getPath().toString().split("/");
            String name = pathBuf[pathBuf.length - 1];
            if (name.startsWith(".")) {
                commonFileList.add(name.replace(".", ""));
            }
            if (name.startsWith("#")) {
                dirList.add(name.replace("#", ""));
            }
        }
        for (FileStatus status : statuses) {
            Map<String, Object> fileMap = new HashMap<>(3);
            String[] pathBuf = status.getPath().toString().split("/");
            String name = pathBuf[pathBuf.length - 1];
            if (name.startsWith(".") || name.startsWith("#")) {
                continue;
            }
            fileMap.put("fileName", name);
            fileMap.put("isDir", dirList.contains(name));
            fileMap.put("isCommonFile", commonFileList.contains(name));

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String timeText = format.format(status.getModificationTime());
            fileMap.put("ModificationTime", timeText);
            result.add(fileMap);

        }
        return result;

    }

    public void delete(String path) throws Exception {
        FileSystem fileSystem = getFileSystem();
        fileSystem.delete(new Path(getHdfsPath(path)), true);
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

    public MetaData getMetaDataFromOrc(String userId, String path, LivySessionInfo livySessionInfo)  {
        String[] splits = path.split("/");
        String fileName = splits[splits.length - 1];
        String dirPath = PathParser.getDirPath(path);
        String readDataCode = "val df = spark.read.orc(\"hdfs:///bdap/students/" + userId + path + "\")\n";
        livyService.postCode(livySessionInfo, readDataCode);

        String previewData = livyService.getCsv(livySessionInfo,20);

        List<HeaderAttribute> headerAttributes = livyService.getSchema(livySessionInfo);

        return new MetaData(fileName,dirPath, headerAttributes, previewData);
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
