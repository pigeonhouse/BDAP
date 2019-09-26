package com.pigeonhouse.bdap.dao;

import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FileHeaderAttriDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 添加CsvHeader对象到数据库
     * @param csvHeader 新建对象
     */
    public void saveCsvHeader(CsvHeader csvHeader){
        mongoTemplate.save(csvHeader);
    }

    /**
     * 根据codeId查询数据库CsvHeader对象
     * @param filePath 数据库对象filePath
     * @return 查询的CsvHeader对象
     */
    public CsvHeader findByFileId(String filePath){
        Query query = new Query(Criteria.where("filePath").is(filePath));
        CsvHeader header = mongoTemplate.findOne(query, CsvHeader.class);
        return header;
    }


    /**
     * 查询数据库所有CsvHeader对象
     * @return 查询结果
     */
    public List<CsvHeader> findAll(){
        List<CsvHeader> csvHeaders = mongoTemplate.find(new Query(new Criteria()), CsvHeader.class);
        return csvHeaders;
    }

    /**
     * 更新数据库CsvHeader对象
     * @param csvHeader 更新的对象
     */
    public void updateCsvHeader(CsvHeader csvHeader) {
        Query query=new Query(Criteria.where("filePath").is(csvHeader.getFilePath()));
        Update update= new Update().set("fileName", csvHeader.getFileName())
                .set("attrHeaderSet", csvHeader.getAttrHeaderSet());
        //更新查询返回结果集的第一条
        mongoTemplate.updateFirst(query, update, CsvHeader.class);
    }


    /**
     * 删除数据库CsvHeader对象
     * @param filePath 删除对象的filePath
     */
    public void deleteCsvHeaderByPath(String filePath) {
        Query query=new Query(Criteria.where("filePath").is(filePath));
        mongoTemplate.remove(query, CsvHeader.class);
    }
}
