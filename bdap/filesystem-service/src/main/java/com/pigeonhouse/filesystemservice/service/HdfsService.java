package com.pigeonhouse.filesystemservice.service;

import com.pigeonhouse.filesystemservice.entity.HeaderAttribute;
import com.pigeonhouse.filesystemservice.entity.LivySessionInfo;
import com.pigeonhouse.filesystemservice.entity.MetaData;
import com.pigeonhouse.filesystemservice.util.OutputParser;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Autowired
    LivyService livyService;

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

    public void setCommonFile(String path) throws Exception {
        FileSystem fileSystem = getFileSystem();
        String hdfsPath = defaultHdfsUri + defaultDirectory;
        String splits[] = path.split("/");
        StringBuilder dirPath = new StringBuilder();
        for (int i = 0; i < splits.length - 1; i++) {
            dirPath.append("/").append(splits[i]);
            System.out.println(splits[i]);
        }
        System.out.println(hdfsPath+dirPath.toString()+"/."+splits[splits.length - 1]);
        fileSystem.mkdirs(new Path(hdfsPath+dirPath.toString()+"/."+splits[splits.length - 1]));
    }

    public void cancelCommonFile(String path) throws Exception {
        FileSystem fileSystem = getFileSystem();
        String hdfsPath = defaultHdfsUri + defaultDirectory + path;


    }



    public List<Map<String, Object>> listFiles(String path) throws Exception {
        List<Map<String, Object>> result = new ArrayList<>();
        FileSystem fileSystem = getFileSystem();

        try {
            String hdfsPath = defaultHdfsUri + defaultDirectory + path;

            FileStatus[] statuses = fileSystem.listStatus(new Path(hdfsPath));
            List<String> commonFileList = new ArrayList<>();
            if (statuses != null) {
                for (FileStatus status : statuses) {
                    String[] pathBuf = status.getPath().toString().split("/");
                    String name = pathBuf[pathBuf.length - 1];
                    if(name.startsWith(".")){
                        commonFileList.add(name.replace(".",""));
                    }
                }
                for (FileStatus status : statuses) {
                    Map<String, Object> fileMap = new HashMap<>(3);
                    String[] pathBuf = status.getPath().toString().split("/");
                    String name = pathBuf[pathBuf.length - 1];
                    if(name.startsWith(".")){
                        continue;
                    }
                    fileMap.put("name", name);
                    fileMap.put("isDir", status.isDirectory());
                    fileMap.put("isCommonFile", commonFileList.contains(name));

                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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

    public boolean delete(String path) throws Exception {
        String hdfsPath = defaultHdfsUri + defaultDirectory + path;
        FileSystem fileSystem = getFileSystem();
        return fileSystem.delete(new Path(hdfsPath), true);
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

    public MetaData getMetaDataFromParquet(String userId, String path, LivySessionInfo livySessionInfo) throws Exception {
        String[] splits = path.split("/");
        String fileName = splits[splits.length - 1];

        String readDataCode = "val df = spark.read.parquet(\"hdfs:///bdap/students/" + userId + path + "\")\n";
        livyService.postCode(livySessionInfo, readDataCode);
        String previewDataCode = "df.show(20,false)";
        String previewDataResultUrl = livyService.postCode(livySessionInfo, previewDataCode);
        String previewData = OutputParser.convertToCsv(OutputParser.getOutput(previewDataResultUrl));

        String readSchemaDDL = "println(df.schema.toDDL)";
        String schemaResultUrl = livyService.postCode(livySessionInfo, readSchemaDDL);
        String schemaDDL = OutputParser.getOutput(schemaResultUrl);
        List<HeaderAttribute> headerAttributes = OutputParser.parseDDL(schemaDDL);

        return new MetaData(path, fileName, headerAttributes, previewData);
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
