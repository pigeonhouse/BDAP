import org.apache.spark.mllib.tree.DecisionTree
import org.apache.spark.mllib.tree.model.DecisionTreeModel
import org.apache.spark.mllib.linalg.{Vector, Vectors}  
import org.apache.spark.mllib.regression.LabeledPoint 

val id = "2"
val previous = "1"
val project = "TEST1"

val file = project + "/" + previous
val df = spark.read.format("parquet").load(file).drop("label")

val featInd = df.columns.indexOf("Features")
val targetInd = df.columns.indexOf("MinMaxScaledlabel") 
val dataRDD = df.rdd.map{case Row(v:Vector, d:Double) => LabeledPoint(d, v)}

    // 样本数据划分,训练样本占0.8,测试样本占0.2
    val dataParts = dataRDD.randomSplit(Array(0.8, 0.2))
    val trainRDD = dataParts(0)
    val testRDD = dataParts(1)

    // 决策树参数
    val numClasses = 2
    val categoricalFeaturesInfo = Map[Int, Int]()
    val impurity = "gini"
    val maxDepth = 5
    val maxBins = 32
    // 建立决策树模型并训练
    val model = DecisionTree.trainClassifier(trainRDD, numClasses, categoricalFeaturesInfo,
      impurity, maxDepth, maxBins)

    // 对测试样本进行测试
    val predictionAndLabel = testRDD.map { point =>
      val score = model.predict(point.features)
      (score, point.label, point.features)
    }
    val showPredict = predictionAndLabel.take(50)
    println("Prediction" + "\t" + "Label" + "\t" + "Data")
    for (i <- 0 to showPredict.length - 1) {
      println(showPredict(i)._1 + "\t\t" + showPredict(i)._2 + "\t" + showPredict(i)._3)
    }

    // 误差计算
    val accuracy = 1.0 * predictionAndLabel.filter(x => x._1 == x._2).count() / testRDD.count()
    println("Accuracy = " + accuracy)
/*
    // 保存模型
    val ModelPath = "hdfs:10.105.222.90:9010/user/tseg/Demo/model/Decision_Tree_Model"
    model.save(sc, ModelPath)
    val sameModel = DecisionTreeModel.load(sc, ModelPath)
*/