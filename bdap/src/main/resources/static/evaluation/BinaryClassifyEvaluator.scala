object BinaryClassifyEvaluator {

  val predictCol: String = null
  val labelCol: String = null
  val metricName: String = null
  val input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator

    val evaluator = new BinaryClassificationEvaluator().setRawPredictionCol(predictCol).setLabelCol(labelCol).setMetricName(metricName)
    val c = input.select(labelCol, predictCol)
    val accuracy = evaluator.evaluate(c)

    print(accuracy)
  }

}
