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

    val metaData = input

    val evaluateData = metaData.select("Probability_", labelCol(0)).rdd

    val evaluateRDD: RDD[(Double, Double)] = evaluateData.map{ case r: Row => (r(0).toString().toDouble, r(1).toString().toDouble)}

    val metrics = new BinaryClassificationMetrics(evaluateRDD)

    val auPRC = metrics.areaUnderPR

    val auROC = metrics.areaUnderROC

    //    val roc = metrics.roc
    //    var rocList: util.List[Any] = new util.ArrayList[Any]()
    //    roc.collect().foreach{c => {
    //      var rocMap = new util.HashMap[String, Double]()
    //      rocMap.put("FPR", c._1)
    //      rocMap.put("TPR", c._2)
    //      rocList.add(rocMap)
    //      }
    //    }

    val roc = metrics.roc
    val rocJson = new JSONObject()
    var fprList: util.List[Double] = new util.ArrayList[Double]()
    var tprList: util.List[Double] = new util.ArrayList[Double]()
    roc.collect().foreach{c => {
      fprList.add(c._1)
      tprList.add(c._2)
    }
    }
    rocJson.put("FPR",fprList)
    rocJson.put("TPR",tprList)


    //    val prc = metrics.pr
    //    var prcList: util.List[Any] = new util.ArrayList[Any]()
    //    prc.collect().foreach{c => {
    //      var prcMap = new util.HashMap[String, Double]()
    //      prcMap.put("Recall", c._1)
    //      prcMap.put("Precision", c._2)
    //      prcList.add(prcMap)
    //      }
    //    }

    val prc = metrics.pr
    val prcJson = new JSONObject()
    var recallList: util.List[Double] = new util.ArrayList[Double]()
    var precisionList: util.List[Double] = new util.ArrayList[Double]()
    prc.collect().foreach{c => {
      recallList.add(c._1)
      precisionList.add(c._2)
    }
    }
    prcJson.put("Recall",recallList)
    prcJson.put("Precision",precisionList)


    //    val f1Score = metrics.fMeasureByThreshold
    //    var f1ScoreList: util.List[Any] = new util.ArrayList[Any]()
    //    f1Score.collect().foreach{c => {
    //      var f1ScoreMap = new util.HashMap[String, Double]()
    //      f1ScoreMap.put("Threshold", c._1)
    //      f1ScoreMap.put("F-score", c._2)
    //      f1ScoreList.add(f1ScoreMap)
    //      }
    //    }

    val f1Score = metrics.fMeasureByThreshold
    val f1ScoreJson = new JSONObject()
    var thresholdList: util.List[Double] = new util.ArrayList[Double]()
    var fScoreList: util.List[Double] = new util.ArrayList[Double]()
    roc.collect().foreach{c => {
      thresholdList.add(c._1)
      fScoreList.add(c._2)
    }
    }
    f1ScoreJson.put("Threshold",fprList)
    f1ScoreJson.put("F-score",tprList)


    val jsonObject = new JSONObject()
    //jsonObject.put("method", "BinaryClassifyEvaluator")
    jsonObject.put("auPRC", auPRC)
    jsonObject.put("auROC", auROC)
    jsonObject.put("ROC", rocJson)
    jsonObject.put("PRC", prcJson)
    jsonObject.put("f1Score", f1ScoreJson)
    val evaluationResult = jsonObject.toJSONString
    println(jsonString)

  }
}
