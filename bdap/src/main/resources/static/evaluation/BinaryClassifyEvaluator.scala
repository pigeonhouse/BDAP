object BinaryClassifyEvaluator {

  val predictCol: Array[String] = null
  val labelCol: Array[String] = null
  val metricName: String = null
  val input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator

    val evaluator = new BinaryClassificationEvaluator().setRawPredictionCol("prediction").setLabelCol(labelCol(0)).setMetricName(metricName)
    val df = input.selectExpr(s"cast(${labelCol(0)} as double)", s"cast(prediction as double)")
    // 在新增列能被查看后替换
//    val evaluator = new BinaryClassificationEvaluator().setRawPredictionCol(predictCol(0)).setLabelCol(labelCol(0)).setMetricName(metricName)
//    val df = input.selectExpr(s"cast(${labelCol(0)} as double)", s"cast(${predictCol(0)} as double)")

    val accuracy = evaluator.evaluate(df)
    print(accuracy)
  }
}
