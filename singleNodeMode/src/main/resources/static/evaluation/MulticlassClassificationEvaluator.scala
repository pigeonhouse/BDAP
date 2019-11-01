import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator
import org.apache.spark.sql.DataFrame

object MulticlassClassificationEvaluator {
  val input: DataFrame = null
  val labelCol: Array[String] = null
  val predictionCol: Array[String] = null
  // param for metric name in evaluation (supports "f1" (default), "weightedPrecision", "weightedRecall", "accuracy")
  val metricName: String = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator
    import org.apache.spark.sql.DataFrame

    val evaluator = new MulticlassClassificationEvaluator().setLabelCol(labelCol(0)).setMetricName(metricName).setPredictionCol(predictionCol(0))
    val df = input.select(s"cast(${labelCol(0)} as double)", s"cast(${predictionCol(0)} as double)")
    val accuracy = evaluator.evaluate(df)

    print(accuracy)
  }
}
