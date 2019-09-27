package com.pigeonhouse.bdap.service;

import com.pigeonhouse.bdap.entity.execution.ExecutionInfo;
import com.pigeonhouse.bdap.entity.execution.NodeInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/9/7 11:28
 */
@Service
public class SparkExecution {

    @Autowired
    LivyService livyService;
    @Autowired
    RandomIdService randomIdService;

    public String executeOneNode(NodeInfo nodeInfo) {
        System.out.println(nodeInfo);
        String resultUrl = "";

        resultUrl = livyService.postCode(nodeInfo.getCode());

        return resultUrl;

    }

    /**
     * 在checkPoint执行的最后加上存储功能的scala语句
     *
     * @param nodeInfo
     * @param jobId
     */
    public void saveCheckPoint(NodeInfo nodeInfo, String jobId) {
        String appendSaving =
                "import org.apache.spark.{SparkConf, SparkContext}\n" +
                "\n" +
                "import org.apache.spark.mllib.tree.DecisionTree\n" +
                "import org.apache.spark.mllib.tree.model.DecisionTreeModel\n" +
                "import org.apache.spark.mllib.util.MLUtils\n" +
                "\n" +
                "\n" +
                "object DecisionTreeRegressionExample {\n" +
                "\n" +
                "  def main(args: Array[String]): Unit = {\n" +
                "    val conf = new SparkConf().setAppName(\"DecisionTreeRegressionExample\")\n" +
                "    val sc = new SparkContext(conf)\n" +
                "\n" +
                "    val data = MLUtils.loadLibSVMFile(sc, \"data/mllib/sample_libsvm_data.txt\")\n" +
                "\n" +
                "    val splits = data.randomSplit(Array(0.7, 0.3))\n" +
                "    val (trainingData, testData) = (splits(0), splits(1))\n" +
                "\n" +
                "    val categoricalFeaturesInfo = Map[Int, Int]()\n" +
                "    val impurity = \"variance\"\n" +
                "    val maxDepth = 5\n" +
                "    val maxBins = 32\n" +
                "\n" +
                "    val model = DecisionTree.trainRegressor(trainingData, categoricalFeaturesInfo, impurity,\n" +
                "      maxDepth, maxBins)\n" +
                "\n" +
                "\n" +
                "    val labelsAndPredictions = testData.map { point =>\n" +
                "      val prediction = model.predict(point.features)\n" +
                "      (point.label, prediction)\n" +
                "    }\n" +
                "    val testMSE = labelsAndPredictions.map{ case (v, p) => math.pow(v - p, 2) }.mean()\n" +
                "    println(s\"Test Mean Squared Error = $testMSE\")\n" +
                "    println(s\"Learned regression tree model:\\n ${model.toDebugString}\")\n" +
                "\n" +
                "\n" +
                "    model.save(sc, \"target/tmp/myDecisionTreeRegressionModel\")\n" +
                "    val sameModel = DecisionTreeModel.load(sc, \"target/tmp/myDecisionTreeRegressionModel\")\n" +
                "\n" +
                "\n" +
                "    sc.stop()\n" +
                "  }\n" +
                "}\n" +
                "DecisionTreeRegressionExample.main([])";
        //"output.write.parquet(\"/user/student/" + jobId + ".parquet\")";
        nodeInfo.codeAppend(appendSaving + "\n");
    }

    public List<ExecutionInfo> executeAllNodes(List<NodeInfo> flowInfo) {
        List<ExecutionInfo> resultList = new ArrayList<>();

        NodeInfo tempNode = new NodeInfo(0, "", false);
        for (NodeInfo nodeInfo : flowInfo) {
            String origin = tempNode.getCode();
            tempNode.setCode(origin + nodeInfo.getCode() + "\n");
            if (nodeInfo.getIsCheckPoint()) {
                tempNode.setIndex(nodeInfo.getIndex());
                String jobId = randomIdService.getId();

                //加上存储结果的代码
                saveCheckPoint(tempNode, jobId);

                String resultUrl = executeOneNode(tempNode);

                ExecutionInfo executionInfo = new ExecutionInfo(nodeInfo.getIndex(), jobId, resultUrl);

                resultList.add(executionInfo);

                tempNode.setCode("");
            }
        }
        return resultList;
    }
}
