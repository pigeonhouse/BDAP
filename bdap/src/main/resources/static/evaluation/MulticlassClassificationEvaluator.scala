object MulticlassClassificationEvaluator {

  val input: DataFrame = null
  val labelCol: Array[String] = null
  val predictionCol: Array[String] = null
  val metricName: String = null

  def main(args: Array[String]): Unit = {

    val evaluator = new MulticlassClassificationEvaluator().setLabelCol(labelCol(0)).setMetricName(metricName).setPredictionCol(predictionCol(0))
    val df = input.select(s"cast(${labelCol(0)} as double)", s"cast(${predictionCol(0)} as double)")

    // 在新增列能被查看后替换
//    val evaluator = new MulticlassClassificationEvaluator().setLabelCol(labelCol(0)).setMetricName(metricName).setPredictionCol(predictionCol(0))
//    val df = input.select(s"cast(${labelCol(0)} as double)", s"cast(${predictionCol(0)} as double)")

    val accuracy = evaluator.evaluate(df)
    print(accuracy)
  }
}
