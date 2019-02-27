
// scalastyle:off println

// $example on$
import org.apache.spark.ml.regression.LinearRegression
// $example off$
import org.apache.spark.sql.SparkSession

object LinearRegressionWithElasticNetExample {

  def main(args: Array[String]): Unit = {
    val spark = SparkSession
      .builder
      .appName("LinearRegressionWithElasticNetExample")
      .getOrCreate()

    val parsedTrainingData = args(0)
    val outputModel = args(1)
    val numIterations = args(2).toInt
    val numRegParam = args(3).toFloat
    val numElasticNetParam = args(4).toFloat

    // $example on$
    // Load training data
    val training = spark.read.format("libsvm")
      .load(parsedTrainingData)

    val lr = new LinearRegression()
      .setMaxIter(numIterations)
      .setRegParam(numRegParam)
      .setElasticNetParam(numElasticNetParam)

    // Fit the model
    val lrModel = lr.fit(training)

    // Print the coefficients and intercept for linear regression
    println(s"Coefficients: ${lrModel.coefficients} Intercept: ${lrModel.intercept}")

    // Summarize the model over the training set and print out some metrics
    val trainingSummary = lrModel.summary
    println(s"numIterations: ${trainingSummary.totalIterations}")
    println(s"objectiveHistory: [${trainingSummary.objectiveHistory.mkString(",")}]")
    trainingSummary.residuals.show()
    println(s"RMSE: ${trainingSummary.rootMeanSquaredError}")
    println(s"r2: ${trainingSummary.r2}")
    // $example off$
    lrModel.save(outputModel)

    spark.stop()
  }
}
// scalastyle:on println
