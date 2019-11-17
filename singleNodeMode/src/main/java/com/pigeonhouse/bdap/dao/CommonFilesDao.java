package com.pigeonhouse.bdap.dao;

import com.mongodb.BasicDBObject;
import com.pigeonhouse.bdap.entity.metadata.CommonFiles;
import com.pigeonhouse.bdap.entity.metadata.FileAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CommonFilesDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 查询所有用户的常用文件方法
     *
     * @return List<CommonFiles>
     */
    public List<CommonFiles> findAll() {
        List<CommonFiles> commonFiles = mongoTemplate.find(new Query(new Criteria()), CommonFiles.class);
        return commonFiles;
    }

    /**
     * 按用户名查询列表方法
     *
     * @param userId 用户名
     * @return List<CommonFiles>
     */
    public ArrayList<FileAttribute> findByUserId(String userId) {
        Query query = new Query(Criteria.where("userId").is(userId));
        CommonFiles commonFiles = mongoTemplate.findOne(query, CommonFiles.class);
        return commonFiles.getFileList();
    }
    /**
     * 在数据库中删除一条常用数据
     *
     * @param commonFiles 用户名
     */
    public void deleteFile(String userId,String oppositePath) {

        try {
            Query query = Query.query(Criteria.where("userId").is(userId)
                    .and("fileList.filePath").is(oppositePath));
            Update update = new Update();
            BasicDBObject s = new BasicDBObject();
            s.put("filePath", oppositePath);
            update.pull("fileList",s);
            mongoTemplate.updateFirst(query, update, CommonFiles.class);
        }
        catch(Exception e){
            System.out.println(e.toString());
        }
    }
    /**
     * 在数据库新增一条用户文档
     *
     * @param commonFiles 用户名
     */
    /*public void createNewUser(CommonFiles commonFiles) {
        mongoTemplate.insert(commonFiles, "commonFiles");
    }
*/
    /**
     * 在数据库指定用户下增加一个文件
     *
     * @param fileAttribute 文件信息
     * @param userId        用户名
     */
    public void addNewFile(FileAttribute fileAttribute, String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        Update update = new Update();
        update.push("fileList", fileAttribute);
        mongoTemplate.updateFirst(query, update, "commonFiles");
    }

    /**
     * 按文件名查询文件方法
     *
     * @param userId 用户名
     * @return List<CommonFiles>
     */

    public CommonFiles findByFilePath(String filepath, String userId) {
        Query query = new Query(Criteria.where("fileList.filePath").is(filepath).and("userId").is(userId));
        CommonFiles commonFiles = mongoTemplate.findOne(query, CommonFiles.class);
        return commonFiles;
    }

}

