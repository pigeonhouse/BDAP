object ClusteringEvaluator {

  val predictCol: Array[String] = null
  val featureCols: Array[String] = null
  val distanceMeasure: String = null
  val input: DataFrame = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.evaluation.ClusteringEvaluator
    import com.alibaba.fastjson.JSONObject
    import org.apache.spark.ml.feature.VectorAssembler

    val metaData = input

    val assembler = new VectorAssembler().setInputCols(featureCols).setOutputCol("features_")
    val assembled = assembler.transform(metaData)

    val evaluator = new ClusteringEvaluator().setPredictionCol(predictCol(0)).setFeaturesCol("features_").setDistanceMeasure(distanceMeasure)

    val silhouette = evaluator.evaluate(assembled)

    val evaluationJson = new JSONObject()
    evaluationJson.put("Silhouette", silhouette)
    evaluationJson.put("method", "ClusteringEvaluator")

    val evaluationResult = evaluationJson.toJSONString
    println(evaluationResult)

  }
}
