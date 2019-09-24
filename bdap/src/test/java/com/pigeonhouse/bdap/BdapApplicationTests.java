package com.pigeonhouse.bdap;

import com.pigeonhouse.bdap.controller.SparkCodeController;
import com.pigeonhouse.bdap.dao.SparkCodeDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.prework.SparkCode;
import com.pigeonhouse.bdap.service.SparkCodeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

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

    @Test
    public void test01() {

        sparkCodeService.deleteSparkCode("PP003");

        sparkCodeService.addSparkCode("PP003", "PreProcess", "归一化", "MinMaxScaler", "import org.apache.spark.ml.feature.{MinMaxScaler, StandardScaler, VectorAssembler}\n" +
                "import org.apache.spark.ml.linalg.Vector\n" +
                "import org.apache.spark.sql.{Row, SaveMode}\n" +
                "import scalaj.http._\n" +
                "import org.apache.spark.sql.functions.{col, monotonically_increasing_id}\n" +
                "import org.apache.spark.sql.types.{DoubleType, StructField, StructType}\n" +
                "\n" +
                "import spark.implicits._\n" +
                "\n" +
                "    val project = \"Demo\"\n" +
                "    val id = \"%s\"\n" +
                "    val previous = \"%s\"\n" +
                "    val file = project + \"/\" + previous\n" +
                "    val aim = \"%s\"\n" +
                "\n" +
                "    var df = spark.read.format(\"parquet\").load(file)\n" +
                "    val aimarray = aim.split(\" \")\n" +
                "    var df_ = df\n" +
                "\n" +
                "    for(i <- 0 to aimarray.length - 1){\n" +
                "      df_ = df.select(aimarray(i))\n" +
                "      val assembler = new VectorAssembler().setInputCols(Array(aimarray(i))).setOutputCol(\"scaled\")\n" +
                "      df_ = assembler.transform(df_).drop(aimarray(i)).withColumnRenamed(\"scaled\", aimarray(i))\n" +
                "      val scaler = new MinMaxScaler().setInputCol(aimarray(i)).setOutputCol(\"scaled\" + aimarray(i))\n" +
                "      val scalerModel = scaler.fit(df_)\n" +
                "      df_ = scalerModel.transform(df_).drop(aimarray(i))\n" +
                "      val df_1 = df_.map{case Row(v: Vector) => v(0)}.toDF(\"MinMaxScaled\" + aimarray(i)).withColumn(\"idx\", monotonically_increasing_id())\n" +
                "      df = df.withColumn(\"idx\", monotonically_increasing_id())\n" +
                "      df = df.join(df_1, df(\"idx\") === df_1(\"idx\")).drop(\"idx\")\n" +
                "      df = df.limit(df.count().toInt)\n" +
                "    }\n" +
                "  \n" +
                "  df.write.format(\"parquet\").mode(SaveMode.Overwrite).save(project + \"/\" + id)\n" +
                "\n" +
                "  var fin = df.limit(20).toJSON.collectAsList.toString\n" +
                "\n" +
                "val colname = df.columns\n" +
                "val fin_ = fin.substring(1, fin.length - 1)\n" +
                "val start = \"\"\"{\"colName\":\"\"\"\"\n" +
                "val end = \"\\\"\"\n" +
                "val json = colname.mkString(start,\", \",end) + \"}, \"\n" +
                "\n" +
                "fin = \"[\" + json ++ fin_ + \"]\"\n" +
                "\n" +
                "  val result = Http(\"http://10.122.226.59:5000/RunningPost\").postData(fin.toString).header(\"Content-Type\", \"application/json\").header(\"Charset\", \"UTF-8\").option(HttpOptions.readTimeout(10000)).asString\n","one-one");

        sparkCodeService.addSelectAttribute("PP003", "目标列", "targetCol", new ArrayList<>(), true);

    }

}
