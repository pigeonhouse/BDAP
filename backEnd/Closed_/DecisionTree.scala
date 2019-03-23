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

    // �������ݻ���,ѵ������ռ0.8,��������ռ0.2
    val dataParts = dataRDD.randomSplit(Array(0.8, 0.2))
    val trainRDD = dataParts(0)
    val testRDD = dataParts(1)

    // ����������
    val numClasses = 2
    val categoricalFeaturesInfo = Map[Int, Int]()
    val impurity = "gini"
    val maxDepth = 5
    val maxBins = 32
    // ����������ģ�Ͳ�ѵ��
    val model = DecisionTree.trainClassifier(trainRDD, numClasses, categoricalFeaturesInfo,
      impurity, maxDepth, maxBins)

    // �Բ����������в���
    val predictionAndLabel = testRDD.map { point =>
      val score = model.predict(point.features)
      (score, point.label, point.features)
    }
    val showPredict = predictionAndLabel.take(50)
    println("Prediction" + "\t" + "Label" + "\t" + "Data")
    for (i <- 0 to showPredict.length - 1) {
      println(showPredict(i)._1 + "\t\t" + showPredict(i)._2 + "\t" + showPredict(i)._3)
    }

    // ������
    val accuracy = 1.0 * predictionAndLabel.filter(x => x._1 == x._2).count() / testRDD.count()
    println("Accuracy = " + accuracy)
/*
    // ����ģ��
    val ModelPath = "hdfs://master:9000/ml/model/Decision_Tree_Model"
    model.save(sc, ModelPath)
    val sameModel = DecisionTreeModel.load(sc, ModelPath)
*/