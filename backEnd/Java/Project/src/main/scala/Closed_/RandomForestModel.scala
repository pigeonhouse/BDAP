import org.apache.spark.mllib.regression.LabeledPoint
import org.apache.spark.rdd.RDD
import org.apache.spark.mllib.tree.RandomForest
import org.apache.spark.mllib.tree.model.RandomForestModel
import org.apache.spark.mllib.linalg.{Vectors, Vector}

val id = "2"
val previous = "1"
val project = "TEST1"
val file = project + "/" + previous
val df = spark.read.format("parquet").load(file).drop("label")

val featInd = df.columns.indexOf("Features")
val targetInd = df.columns.indexOf("MinMaxScaledlabel") 
val dataRDD = df.rdd.map{case Row(v:Vector, d:Double) => LabeledPoint(d, v)}

val dataParts = dataRDD.randomSplit(Array(0.8, 0.2))
val data = dataParts(0)
val input = dataParts(1)

val numClasses = 2
val categoricalFeaturesInfo = Map[Int, Int]()
val impurity = "gini"
val maxDepth = 5
val maxBins = 32
val featureSubsetStrategy = "auto"
val numTrees = 1000
val model: RandomForestModel = RandomForest.trainClassifier(data, numClasses, categoricalFeaturesInfo,numTrees,
                                featureSubsetStrategy, impurity, maxDepth, maxBins)
 
 val predictResult = input.map { point =>
 val prediction = model.predict(point.features)
 (point.label, prediction)
}

val accuracy = 1.0 * predictResult.filter(x => x._1 == x._2).count() / input.count()
println("Accuracy = " + accuracy)