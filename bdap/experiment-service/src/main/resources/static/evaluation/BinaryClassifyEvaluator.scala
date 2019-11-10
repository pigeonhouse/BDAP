import java.util

object BinaryClassifyEvaluator {

  val predictCol: Array[String] = null
  val labelCol: Array[String] = null
  val input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.rdd.RDD
    import org.apache.spark.sql.Row
    import org.apache.spark.mllib.evaluation.BinaryClassificationMetrics
    import com.alibaba.fastjson.JSONObject
    import java.util
    import scala.collection.JavaConverters._

    val metaData = input

    val evaluateData = metaData.select("Probability_", labelCol(0)).rdd

    val evaluateRDD: RDD[(Double, Double)] = evaluateData.map { case r: Row => (r(0).toString().toDouble, r(1).toString().toDouble) }

    val metrics = new BinaryClassificationMetrics(evaluateRDD)

    val auPRC = metrics.areaUnderPR

    val auROC = metrics.areaUnderROC


    def getVisualInfo(tupleList: RDD[(Double, Double)], xlabel: String, ylabel: String): JSONObject = {
      val valueList: util.List[Any] = new util.ArrayList[Any]
      tupleList.collect().foreach(t => {
        val value: util.List[Double] = new util.ArrayList[Double]
        value.add(t._1)
        value.add(t._2)
        valueList.add(value)
      })
      val json = new JSONObject()
      json.put("xlabel",xlabel)
      json.put("ylabel",ylabel)
      json.put("value",valueList)
      json
    }

    val evaluationJson = new JSONObject()
    evaluationJson.put("auPRC", auPRC)
    evaluationJson.put("auROC", auROC)
    evaluationJson.put("ROC", getVisualInfo(metrics.roc,"TPR","FPR"))
    evaluationJson.put("PRC", getVisualInfo(metrics.pr,"Recall","Precision"))
    evaluationJson.put("f1Score", getVisualInfo(metrics.fMeasureByThreshold,"Threshold","F-score"))
    val evaluationResult = evaluationJson.toJSONString
    println(evaluationResult)

  }
}
