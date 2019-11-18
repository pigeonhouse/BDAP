object RegressionEvaluator{

  val predictCol: Array[String] = null
  val labelCol: Array[String] = null
  val input: DataFrame = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.evaluation.RegressionEvaluator
    import com.alibaba.fastjson.JSONObject

    val metaData = input

    val evaluatorRMSE = new RegressionEvaluator().setLabelCol(labelCol(0)).setPredictionCol(predictCol(0)).setMetricName("rmse")
    val evaluatorMSE = new RegressionEvaluator().setLabelCol(labelCol(0)).setPredictionCol(predictCol(0)).setMetricName("mse")
    val evaluatorR2 = new RegressionEvaluator().setLabelCol(labelCol(0)).setPredictionCol(predictCol(0)).setMetricName("r2")
    val evaluatorMAE = new RegressionEvaluator().setLabelCol(labelCol(0)).setPredictionCol(predictCol(0)).setMetricName("mae")

    val RMSE = evaluatorRMSE.evaluate(metaData)
    val MSE = evaluatorMSE.evaluate(metaData)
    val R2 = evaluatorR2.evaluate(metaData)
    val MAE = evaluatorMAE.evaluate(metaData)

    val evaluationJson = new JSONObject()
    evaluationJson.put("RMSE", RMSE)
    evaluationJson.put("MSE", MSE)
    evaluationJson.put("R2", R2)
    evaluationJson.put("MAE", MAE)

    val evaluationResult = evaluationJson.toJSONString
    println(evaluationResult)
  }
}
