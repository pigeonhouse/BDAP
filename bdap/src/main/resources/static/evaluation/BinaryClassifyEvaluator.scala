object BinaryClassifyEvaluator {

  val predictCol: String = null
  val labelCol: String = null
  val metricName: String = null
  val input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator

    val evaluator = new BinaryClassificationEvaluator().setRawPredictionCol(predictCol).setLabelCol(labelCol).setMetricName(metricName)
    val df = input.select(labelCol, predictCol)
    val accuracy = evaluator.evaluate(df)

    print(accuracy)
  }

}
