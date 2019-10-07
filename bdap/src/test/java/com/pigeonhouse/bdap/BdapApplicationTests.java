package com.pigeonhouse.bdap;

import com.pigeonhouse.bdap.controller.filesystem.FileHeaderAttriController;
import com.pigeonhouse.bdap.controller.runcode.FlowChartController;
import com.pigeonhouse.bdap.dao.FileHeaderAttriDao;
import com.pigeonhouse.bdap.dao.LivyDao;
import com.pigeonhouse.bdap.dao.ModuleDao;
import com.pigeonhouse.bdap.dao.UserDao;
import com.pigeonhouse.bdap.entity.execution.LivySessionInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.LabelName;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.NodeInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.attrinfo.AttrInfo;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.attrinfo.style.ChooseColStyle;
import com.pigeonhouse.bdap.entity.mapinfo.nodeinfo.attrinfo.style.SelectStyle;
import com.pigeonhouse.bdap.service.filesystem.FileHeaderAttriService;
import com.pigeonhouse.bdap.service.runcode.SparkExecution;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BdapApplicationTests {

    @Autowired
    UserDao userDao;

    @Autowired
    LivyDao livyDao;

    @Autowired
    FileHeaderAttriDao fileHeaderAttriDao;

    @Autowired
    FileHeaderAttriService fileHeaderAttriService;

    @Autowired
    FileHeaderAttriController fileHeaderAttriController;

    @Autowired
    SparkExecution sparkExecution;

    @Autowired
    FlowChartController flowChartController;

    @Autowired
    ModuleDao moduleDao;

    @Test
    public void flowTest() throws Exception {

        //--------------第一个节点用于读入数据-----------

//        ArrayList<AttrInfo> attrs_01 = new ArrayList<>();
//        attrs_01.add(new AttrInfo(new LabelName("file"), "String"
//                , "hdfs:///bdap/demoData/simpleTest.csv"));

        NodeInfo nodeInfo_01 = new NodeInfo();
        nodeInfo_01.setFilePath("hdfs:///bdap/demoData/simpleTest.csv");
        nodeInfo_01.setId("abc");

        //-----------------接下去做测试算法--------------

        ArrayList<AttrInfo> attrs_02 = new ArrayList<>();
        attrs_02.add(new AttrInfo(new LabelName("targetCols"), "Array[String]"
                , new ArrayList<>(Arrays.asList("age"))));

        attrs_02.add(new AttrInfo(new LabelName("normalizationType"), "String"
                ,"MinMax"));

        NodeInfo nodeInfo_02 = new NodeInfo("def", new LabelName("Normalization"),new LabelName("preprocessing")
                ,new String[]{"abc"}, new int[]{1, 1}, attrs_02, true);

        ArrayList<NodeInfo> flowInfo = new ArrayList<>();
        flowInfo.add(nodeInfo_01);
        flowInfo.add(nodeInfo_02);

        //LivySessionInfo livySessionInfo = new LivySessionInfo();

        LivySessionInfo livySessionInfo = livyDao.createSession("10.105.222.90:8998");
        while (!"idle".equals(livyDao.refreshSessionStatus(livySessionInfo).getState())) {
            Thread.sleep(1000);
            System.out.println("starting a new session.......");
        }

        sparkExecution.executeFlow(flowInfo, livySessionInfo);

    }

    @Test
    public void addModuleTest(){
        ArrayList<AttrInfo> attributes = new ArrayList<>();

        SelectStyle selectStyle = new SelectStyle(new LabelName[]{new LabelName("Normal","Normal"),new LabelName("MinMax","MinMax"),new LabelName("Standard","Standard"),new LabelName("MaxAbs","MaxAbs")});
        attributes.add(new AttrInfo(new LabelName("类型","normalizationType"),"String",selectStyle,null));

        ChooseColStyle chooseColStyle = new ChooseColStyle(true);
        attributes.add(new AttrInfo(new LabelName("归一化字段","targetCols"),"Array[String]",chooseColStyle,null));

        NodeInfo nodeInfo = new NodeInfo(new LabelName("归一化","Normalization"),new LabelName("preprocessing","数据预处理")
        ,new int[]{1,1},attributes);

        moduleDao.saveModuleInfo(nodeInfo);

    }


//    @Test
//    public void test01() {
//
//        sparkCodeDao.addSparkCode("PD001", "static/Prediction.scala", "预测", "Predict", "import org.apache.spark.ml.classification.LogisticRegression\n" +
//                "import org.apache.spark.ml.feature.VectorAssembler\n" +
//                "\n" +
//                "val userId = \"%s\"\n" +
//                "val id = \"%s\"\n" +
//                "val trainCol = \"%s\"\n" +
//                "val label = \"%s\"\n" +
//                "val newColName = \"%s\"\n" +
//                "var df_ = df_%s\n" +
//                "\n" +
//                "val all = trainCol + \" \" + label\n" +
//                "val aimarray = all.split(\" \")\n" +
//                "val trainArray = trainCol.split(\" \")\n" +
//                "\n" +
//                "df_ = df_.select(aimarray.map(A => col(A)): _*)\n" +
//                "\n" +
//                "val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol(\"features_lr\")\n" +
//                "df_ = assembler.transform(df_)\n" +
//                "\n" +
//                "val predictions = Model_%s.transform(df_)\n" +
//                "val predict_result = predictions.selectExpr(\"features_lr\", label, s\"round(prediction,1) as ${newColName}\")\n" +
//                "\n" +
//                "df_ = predict_result\n" +
//                "\n" +
//                "val df_%s = predict_result\n" +
//                "\n" +
//                "df_.write.format(\"parquet\").mode(SaveMode.Overwrite).save(userId + \"/\" + id)\n" +
//                "\n" +
//                "val fin = df_.limit(100).toJSON.collectAsList.toString\n" +
//                "\n" +
//                "val colname = df_.columns\n" +
//                "val fin_ = fin.substring(1, fin.length - 1)\n" +
//                "val start = \"\"\"{\"colName\":\"\"\"\"\n" +
//                "val end = \"\\\"\"\n" +
//                "var json = colname.mkString(start,\", \",end) + \"}, \"\n" +
//                "\n" +
//                "json = \"[\" + json ++ fin_ + \"]\"\n" +
//                "\n" +
//                "val result = Http(\"%s\").postData(fin.toString).header(\"Content-Type\", \"application/json\").header(\"Charset\", \"UTF-8\").option(HttpOptions.readTimeout(10000)).asString", "two-one");
//
//        sparkCodeDao.addInputAttribute("PD001", "新列名", "newColName", "字母");
//
//    }
//
//    @Test
//    public void test02() throws IOException {
//
//        HashMap<String, String> map = new HashMap<>();
//        map.put("userId", "2017211524");
//        map.put("moduleId", "123456");
//        map.put("targetCol", "age");
//        map.put("type", "average");
//        map.put("filePath", "/flowTest");
//
//        String s = joinCodeService.transParam("OF001", map);
//        System.out.println(s);
//    }
//
//    @Test
//    public void test03(){
//
//        ArrayList<NodeInfo> list = new ArrayList<>();
//        HashMap<String, String> map = new HashMap<>();
//        map.put("filePath", "hdfs://10.105.222.90:8020/ xty/adult.csv");
//        map.put("userId", "qj");
//        map.put("moduleId", "123456");
//        list.add(new NodeInfo(1, "OF001", "", map, true));
//
//        HashMap<String, String> map1 = new HashMap<>();
//        map1.put("userId", "qj");
//        map1.put("moduleId", "234567");
//        map1.put("previousId", "123456");
//        map1.put("targetCol", "age");
//        map1.put("type", "average");
//        list.add(new NodeInfo(2, "PP005", "", map1, true));
//
//        HashMap<String, String> map2 = new HashMap<>();
//        map2.put("userId", "qj");
//        map2.put("moduleId", "345678");
//        map2.put("previousId", "234567");
//        map2.put("targetCol", "age");
//        map2.put("normalAlgorithm", "Normal");
//        list.add(new NodeInfo(3, "PP003", "", map2, true));
////        postCode.postcode(list, request);
//
//    }
}
