
// scalastyle:off println

// $example on$
import org.apache.spark.ml.classification.LogisticRegression
// $example off$
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions.max

object LogisticRegressionSummaryExample {

  def main(args: Array[String]): Unit = {
    val spark = SparkSession
      .builder
      .appName("LogisticRegressionSummaryExample")
      .getOrCreate()
    import spark.implicits._

    val parsedTrainingData = args(0)
    val outputModel = args(1)
    val numIterations = args(2).toInt
    val numRegParam = args(3).toFloat
    val numElasticNetParam = args(4).toFloat

    // Load training data
    val training = spark.read.format("libsvm").load(parsedTrainingData)

    val lr = new LogisticRegression()
      .setMaxIter(numIterations)
      .setRegParam(numRegParam)
      .setElasticNetParam(numElasticNetParam)

    // Fit the model
    val lrModel = lr.fit(training)

    // $example on$
    // Extract the summary from the returned LogisticRegressionModel instance trained in the earlier
    // example
    val trainingSummary = lrModel.binarySummary

    // Obtain the objective per iteration.
    val objectiveHistory = trainingSummary.objectiveHistory
    println("objectiveHistory:")
    objectiveHistory.foreach(loss => println(loss))

    // Obtain the receiver-operating characteristic as a dataframe and areaUnderROC.
    val roc = trainingSummary.roc
    roc.show()
    println(s"areaUnderROC: ${trainingSummary.areaUnderROC}")

    // Set the model threshold to maximize F-Measure
    val fMeasure = trainingSummary.fMeasureByThreshold
    val maxFMeasure = fMeasure.select(max("F-Measure")).head().getDouble(0)
    val bestThreshold = fMeasure.where($"F-Measure" === maxFMeasure)
      .select("threshold").head().getDouble(0)
    lrModel.setThreshold(bestThreshold)
    // $example off$
    lrModel.save(outputModel)

    spark.stop()
  }
}
// scalastyle:on println
