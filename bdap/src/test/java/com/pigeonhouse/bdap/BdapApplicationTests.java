package com.pigeonhouse.bdap;

import com.alibaba.fastjson.JSONObject;
import com.csvreader.CsvReader;

import com.pigeonhouse.bdap.controller.filesystem.FileHeaderAttriController;
import com.pigeonhouse.bdap.controller.filesystem.SparkCodeController;
import com.pigeonhouse.bdap.controller.runcode.PostCode;
import com.pigeonhouse.bdap.dao.FileHeaderAttriDao;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.entity.prework.attributes.ChinaEngBean;
import com.pigeonhouse.bdap.entity.prework.attributes.HeaderAttribute;

import com.pigeonhouse.bdap.service.filesystem.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.filesystem.SparkCodeService;
import com.pigeonhouse.bdap.service.runcode.JoinCodeService;
import org.apache.hadoop.io.retry.AtMostOnce;
import org.apache.hadoop.util.hash.Hash;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.*;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BdapApplicationTests {

    @Autowired
    UserDao userDao;

    @Autowired
    SparkCodeDao sparkCodeDao;

    @Autowired
    SparkCodeService sparkCodeService;

    @Autowired
    SparkCodeController sparkCodeController;

    @Autowired
    FileHeaderAttriDao fileHeaderAttriDao;

    @Autowired
    FileHeaderAttriService fileHeaderAttriService;

    @Autowired
    FileHeaderAttriController fileHeaderAttriController;

    @Autowired
    JoinCodeService joinCodeService;

    @Autowired
    PostCode postCode;

    @Test
    public void test01() {

        sparkCodeService.addSparkCode("PD001", "Prediction", "预测", "Predict", "import org.apache.spark.ml.classification.LogisticRegression\n" +
                "import org.apache.spark.ml.feature.VectorAssembler\n" +
                "\n" +
                "val userId = \"%s\"\n" +
                "val id = \"%s\"\n" +
                "val trainCol = \"%s\"\n" +
                "val label = \"%s\"\n" +
                "val newColName = \"%s\"\n" +
                "var df_ = df_%s\n" +
                "\n" +
                "val all = trainCol + \" \" + label\n" +
                "val aimarray = all.split(\" \")\n" +
                "val trainArray = trainCol.split(\" \")\n" +
                "\n" +
                "df_ = df_.select(aimarray.map(A => col(A)): _*)\n" +
                "\n" +
                "val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol(\"features_lr\")\n" +
                "df_ = assembler.transform(df_)\n" +
                "\n" +
                "val predictions = Model_%s.transform(df_)\n" +
                "val predict_result = predictions.selectExpr(\"features_lr\", label, s\"round(prediction,1) as ${newColName}\")\n" +
                "\n" +
                "df_ = predict_result\n" +
                "\n" +
                "val df_%s = predict_result\n" +
                "\n" +
                "df_.write.format(\"parquet\").mode(SaveMode.Overwrite).save(userId + \"/\" + id)\n" +
                "\n" +
                "val fin = df_.limit(100).toJSON.collectAsList.toString\n" +
                "\n" +
                "val colname = df_.columns\n" +
                "val fin_ = fin.substring(1, fin.length - 1)\n" +
                "val start = \"\"\"{\"colName\":\"\"\"\"\n" +
                "val end = \"\\\"\"\n" +
                "var json = colname.mkString(start,\", \",end) + \"}, \"\n" +
                "\n" +
                "json = \"[\" + json ++ fin_ + \"]\"\n" +
                "\n" +
                "val result = Http(\"%s\").postData(fin.toString).header(\"Content-Type\", \"application/json\").header(\"Charset\", \"UTF-8\").option(HttpOptions.readTimeout(10000)).asString", "two-one");

        sparkCodeService.addInputAttribute("PD001", "新列名", "newColName", "字母");

    }

    @Test
    public void test02() throws IOException {

        HashMap<String, String> map = new HashMap<>();
        map.put("userId", "2017211524");
        map.put("moduleId", "123456");
        map.put("targetCol", "age");
        map.put("type", "average");
        map.put("filePath", "/test");

        String s = joinCodeService.transParam("OF001", map);
        System.out.println(s);
    }

    @Test
    public void test03(){

        ArrayList<NodeInfo> list = new ArrayList<>();
        HashMap<String, String> map = new HashMap<>();
        map.put("filePath", "hdfs://10.105.222.90:8020/ xty/adult.csv");
        map.put("userId", "qj");
        map.put("moduleId", "123456");
        list.add(new NodeInfo(1, "OF001", "", map, true));

        HashMap<String, String> map1 = new HashMap<>();
        map1.put("userId", "qj");
        map1.put("moduleId", "234567");
        map1.put("previousId", "123456");
        map1.put("targetCol", "age");
        map1.put("type", "average");
        list.add(new NodeInfo(2, "PP005", "", map1, true));

        HashMap<String, String> map2 = new HashMap<>();
        map2.put("userId", "qj");
        map2.put("moduleId", "345678");
        map2.put("previousId", "234567");
        map2.put("targetCol", "age");
        map2.put("normalAlgorithm", "Normal");
        list.add(new NodeInfo(3, "PP003", "", map2, true));
        //postCode.postcode(list);

    }
}
