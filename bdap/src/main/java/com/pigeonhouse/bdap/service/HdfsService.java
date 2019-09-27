package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.entity.prework.Hdfsfile;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * HDFS相关的基本操作
 * <p>
 * 邢天宇
 * 2019/9/19
 */
@Service("HdfsService")
public class HdfsService {

    private Logger logger = LoggerFactory.getLogger(HdfsService.class);
    private Configuration conf = null;

    /**
     * 默认的HDFS路径
     */
    private String defaultHdfsUri = "hdfs://10.105.222.90:8020";

    public HdfsService() {
        this.conf = new org.apache.hadoop.conf.Configuration();
        conf.set("dfs.client.use.datanode.hostname", "true");
        conf.set("fs.defaultFS", defaultHdfsUri);
    }

    /**
     * 获取HDFS文件系统
     *
     * @return org.apache.hadoop.fs.FileSystem
     */
    private FileSystem getFileSystem() throws IOException {
        return FileSystem.get(conf);
    }

    /**
     * 将相对路径转化为HDFS文件路径
     *
     * @param dstPath 相对路径，比如：/data
     * @return java.lang.String
     * @author 邢天宇
     * @since 1.0.0
     */
    private String generateHdfsPath(String dstPath) {
        String hdfsPath = defaultHdfsUri;
        if (dstPath.startsWith("/")) {
            hdfsPath += dstPath;
        } else {
            hdfsPath = hdfsPath + "/" + dstPath;
        }
        System.out.println(hdfsPath);
        return hdfsPath;
    }

    /**
     * 创建HDFS目录
     *
     * @param path HDFS的相对目录路径，比如：/testDir
     * @return 新的文件树hashmap
     * @author 邢天宇
     * @since 1.0.0
     */
    public boolean mkdir(String path) {
        FileSystem fileSystem = checkExists(path);
        if (fileSystem != null) {
            return false;
        } else {

            try {
                fileSystem = getFileSystem();
                //最终的HDFS文件目录
                String hdfsPath = generateHdfsPath(path);
                //创建目录
                if (fileSystem.mkdirs(new Path(hdfsPath))) {
                    return true;
                }
            } catch (IOException e) {
                logger.error(MessageFormat.format("创建HDFS目录失败，path:{0}", path), e);
                return false;
            } finally {
                close(fileSystem);
            }
            return false;
        }
    }

    /**
     * 获取HDFS上面的某个路径下面的所有文件或目录（不包含子目录）信息
     *
     * @param path HDFS的相对目录路径，比如：/testDir
     * @return java.util.List<java.util.Map               <               java.lang.String               ,               java.lang.Object>>
     * @author 邢天宇
     * @since 1.0.0
     */
    public Hdfsfile listFiles(String path, PathFilter pathFilter) {
        //返回数据
        Hdfsfile result = new Hdfsfile();
        FileSystem fileSystem = checkExists(path);
        //如果目录已经存在，则继续操作
        if (fileSystem != null) {


            try {

                //最终的HDFS文件目录
                String hdfsPath = generateHdfsPath(path);

                FileStatus[] statuses;
                //根据Path过滤器查询
                if (pathFilter != null) {
                    statuses = fileSystem.listStatus(new Path(hdfsPath), pathFilter);
                } else {
                    statuses = fileSystem.listStatus(new Path(hdfsPath));
                }

                if (statuses != null) {
                    for (FileStatus status : statuses) {
                        //每个文件的属性
                        Map<String, Object> fileMap = new HashMap<>(3);
                        String[] pathBuf = status.getPath().toString().split("/");
                        fileMap.put("filename", pathBuf[pathBuf.length - 1]);
                        fileMap.put("isDir", status.isDirectory());

                        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); //设置格式
                        String timeText = format.format(status.getModificationTime());
                        fileMap.put("ModificationTime", timeText);
                        result.setfilelist(fileMap);

                    }
                    return result;
                }
            } catch (IOException e) {
                logger.error(MessageFormat.format("获取HDFS上面的某个路径下面的所有文件失败，path:{0}", path), e);
            } finally {
                close(fileSystem);
            }
        }

        return result;
    }

    /**
     * 获取HDFS上面的某个文件的父目录
     *
     * @param path HDFS的文件路径路径，比如：/testDir
     * @return java.lang.String
     * @author 邢天宇
     * @since 1.0.0
     */
    private String getparent(String path) {
        String[] pathlist = path.split("/");
        if (pathlist.length == 0) {
            return "";
        } else if (pathlist.length == 1) {
            return "/";
        } else {
            StringBuilder sbuf = new StringBuilder();
            sbuf.append(pathlist[0]);

            for (int idx = 1; idx < pathlist.length - 1; idx++) {
                sbuf.append("/");
                sbuf.append(pathlist[idx]);
            }

            return sbuf.toString();
        }


    }


    /**
     * 删除HDFS文件或目录
     *
     * @param path HDFS的相对目录路径，比如：/testDir/c.txt
     * @return 文件树目录hashmap
     * @author 邢天宇
     * @since 1.0.0
     */


    public boolean delete(String path) {
        //HDFS文件路径
        String hdfsPath = generateHdfsPath(path);

        FileSystem fileSystem = null;
        try {
            fileSystem = getFileSystem();

            if (fileSystem.delete(new Path(hdfsPath), true)) {
                return true;
            } else {
                return false;
            }
        } catch (IOException e) {
            logger.error(MessageFormat.format("删除HDFS文件或目录失败，path:{0}", path), e);
        } finally {
            close(fileSystem);
        }

        return false;
    }

    /**
     * 判断文件或者目录是否在HDFS上面存在
     *
     * @param path HDFS的相对目录路径，比如：/testDir、/testDir/a.txt
     * @return boolean
     * @author 邢天宇
     * @since 1.0.0
     */
    public FileSystem checkExists(String path) {
        FileSystem fileSystem = null;
        try {
            fileSystem = getFileSystem();

            //最终的HDFS文件目录
            String hdfsPath = generateHdfsPath(path);
            if (fileSystem.exists(new Path(hdfsPath))) {
                //创建目录
                return fileSystem;
            } else {
                return null;
            }

        } catch (IOException e) {
            logger.error(MessageFormat.format("'判断文件或者目录是否在HDFS上面存在'失败，path:{0}", path), e);
            return null;
        }
    }

    /**
     * upload方法
     *
     * @author 邢天宇
     * @since 1.0.0
     */


    public Object upload(MultipartFile file, String dstPath) throws IOException {

        String fileName = file.getOriginalFilename();
        FileSystem fs = getFileSystem();
        // 上传时默认当前目录，后面自动拼接文件的目录
        Path newPath = new Path(generateHdfsPath(dstPath + "/" + fileName));
        // 打开一个输出流
        //可以根据需要设置是否覆盖选项，默认覆盖
        FSDataOutputStream outputStream = fs.create(newPath);
        outputStream.write(file.getBytes());
        outputStream.close();
        close(fs);
        return "file upload success!";
    }

    /**
     * close方法
     *
     * @author 邢天宇
     * @since 1.0.0
     */
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
