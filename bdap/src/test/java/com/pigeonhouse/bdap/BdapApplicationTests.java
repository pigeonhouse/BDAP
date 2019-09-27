package com.pigeonhouse.bdap;

import com.alibaba.fastjson.JSONObject;
import com.csvreader.CsvReader;
import com.pigeonhouse.bdap.controller.FileHeaderAttriController;
import com.pigeonhouse.bdap.controller.SparkCodeController;
import com.pigeonhouse.bdap.dao.FileHeaderAttriDao;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.prework.CsvHeader;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.entity.prework.attributes.ChinaEngBean;
import com.pigeonhouse.bdap.entity.prework.attributes.HeaderAttribute;
import com.pigeonhouse.bdap.service.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.HdfsService;
import com.pigeonhouse.bdap.service.JoinCodeService;
import com.pigeonhouse.bdap.service.SparkCodeService;
import org.apache.hadoop.io.retry.AtMostOnce;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.*;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
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

    @Test
    public void test01() {
        sparkCodeService.updateOriginCode("PP005", "import org.apache.spark.sql.{Row, SaveMode}\n" +
                "import org.apache.spark.sql.functions._\n" +
                "import scala.collection.mutable.ArrayBuffer\n" +
                "import scalaj.http._\n" +
                "\n" +
                "val userId = \"%s\"\n" +
                "val id = \"%s\"\n" +
                "val aim = \"%s\"\n" +
                "val Type = \"%s\"\n" +
                "\n" +
                "val aimarray = aim.split(\" \")\n" +
                "var df_ = df_%s\n" +
                "\n" +
                "if(Type == \"average\"){\n" +
                "  for(i <- 0 to aimarray.length - 1){\n" +
                "    val temp = Array(aimarray(i))\n" +
                "    val meanval = df.select(mean(aimarray(i))).collect()\n" +
                "    val meanvalue: Double = meanval(0)(0).toString.toDouble\n" +
                "    df_ = df_.na.fill(meanvalue, temp)\n" +
                "  }\n" +
                "}else if(Type == \"median\"){\n" +
                "  for(i <- 0 to aimarray.length - 1){\n" +
                "    val temp = Array(aimarray(i))\n" +
                "    val df_1 = df.select(aimarray(i)).na.drop().sort(aimarray(i))\n" +
                "    val count = df_1.count()\n" +
                "    if(count %% 2 == 0){\n" +
                "      val medianval = df_1.take(count.toInt/2 + 1).drop(count.toInt/2 - 1)\n" +
                "      val medianvalue = medianval.map(A => A.getDouble(0)).reduce(_ + _)/2\n" +
                "      df_ = df_.na.fill(medianvalue, temp)\n" +
                "    }else{\n" +
                "      val medianval = df_1.take(count.toInt/2 + 1).drop(count.toInt/2)\n" +
                "      var medianvalue = medianval.map(A => A.getDouble(0))\n" +
                "      df_ = df_.na.fill(medianvalue(0), temp)\n" +
                "    }\n" +
                "  }\n" +
                "}else if(Type == \"mode\"){\n" +
                "  for(i <- 0 to aimarray.length - 1){\n" +
                "    val temp = Array(aimarray(i))\n" +
                "    val usearray = df.select(aimarray(i)).collect()\n" +
                "    var dataCount : Map[Row, Int] = Map()\n" +
                "    for (xi <- usearray) {\n" +
                "      if (!dataCount.contains(xi) ) {\n" +
                "        dataCount += (xi -> 1)\n" +
                "      } else {\n" +
                "        var count = dataCount(xi)\n" +
                "        count += 1\n" +
                "        dataCount += (xi -> count)\n" +
                "      }\n" +
                "    }\n" +
                "    var dataSeq = dataCount.toSeq.sortBy(_._2)\n" +
                "    println(dataSeq)\n" +
                "    var (a, b) = dataSeq(dataSeq.length - 1)\n" +
                "    if(a(0) == null){\n" +
                "      a = dataSeq(dataSeq.length - 2)._1\n" +
                "    }\n" +
                "    if(usearray(0)(0).getClass.getSimpleName == \"String\"){\n" +
                "      df_ = df_.na.fill(a(0).toString, temp)\n" +
                "    }else if(usearray(0)(0).getClass.getSimpleName == \"Double\"){\n" +
                "      df_ = df_.na.fill(a(0).toString.toDouble, temp)\n" +
                "    }else if(usearray(0)(0).getClass.getSimpleName == \"Int\"){\n" +
                "      df_ = df_.na.fill(a(0).toString.toDouble, temp)\n" +
                "    }\n" +
                "  }\n" +
                "}else if(Type == \"min\"){\n" +
                "  for(i <- 0 to aimarray.length - 1){\n" +
                "    val temp = Array(aimarray(i))\n" +
                "    val minval = df.select(min(aimarray(i))).collect()\n" +
                "    val minvalue: Double = minval(0)(0).toString.toDouble\n" +
                "    df_ = df_.na.fill(minvalue, temp)\n" +
                "  }\n" +
                "}else if(Type == \"max\"){\n" +
                "  for(i <- 0 to aimarray.length - 1){\n" +
                "    val temp = Array(aimarray(i))\n" +
                "    val maxval = df.select(max(aimarray(i))).collect()\n" +
                "    val maxvalue: Double = maxval(0)(0).toString.toDouble\n" +
                "    df_ = df_.na.fill(maxvalue, temp)\n" +
                "  }\n" +
                "}else if(Type == \"drop\"){\n" +
                "  df_ = df_.na.drop(aimarray)\n" +
                "}\n" +
                "\n" +
                "df_.write.format(\"parquet\").mode(SaveMode.Overwrite).save(userId + \"/\" + id)\n" +
                "\n" +
                "val df_%s = df_\n" +
                "\n" +
                "var fin = df_.limit(100).toJSON.collectAsList.toString\n" +
                "\n" +
                "val colname = df_.columns\n" +
                "val fin_ = fin.substring(1, fin.length - 1)\n" +
                "val start = \"\"\"{\"colName\":\"\"\"\"\n" +
                "val end = \"\\\"\"\n" +
                "val json = colname.mkString(start,\", \",end) + \"}, \"\n" +
                "\n" +
                "fin = \"[\" + json ++ fin_ + \"]\"\n" +
                "\n" +
                "val result = Http(\"%s\").postData(fin.toString).header(\"Content-Type\", \"application/json\").header(\"Charset\", \"UTF-8\").option(HttpOptions.readTimeout(10000)).asString\n");
    }

    @Test
    public void test02() throws IOException {

        HashMap<String, String> map = new HashMap<>();
        map.put("previousId", "654321");
        map.put("userId", "2017211524");
        map.put("moduleId", "123456");
        map.put("targetCol", "age");
        map.put("type", "average");
        String s = joinCodeService.transParam("PP005", map);
        System.out.println(s);
    }

    @Test
    public void test03(){
        System.out.println(sparkCodeService.findByCodeIdToJson("PP005"));
    }
}
