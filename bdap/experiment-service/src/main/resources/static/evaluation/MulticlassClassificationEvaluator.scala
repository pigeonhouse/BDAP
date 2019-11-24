import org.apache.spark.sql.DataFrame

object MulticlassClassificationEvaluator {

  import java.util

  val predictionCol: Array[String] = null
  val labelCol: Array[String] = null
  val input: DataFrame = null
  val beta: Double = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.rdd.RDD
    import org.apache.spark.sql.Row
    import org.apache.spark.mllib.evaluation.MulticlassMetrics
    import com.alibaba.fastjson.JSONObject
    import java.util

    val prediction = input

    val predictionAndLabels: RDD[(Double, Double)] = prediction.select("prediction", labelCol(0)).rdd.map { case r: Row => (r(0).toString().toDouble, r(1).toString().toDouble) }
    val metrics = new MulticlassMetrics(predictionAndLabels)


    def getVisualInfo(tupleList: RDD[(Double, Double)], xlabel: String, ylabel: String): JSONObject = {
      val valueList: util.List[Any] = new util.ArrayList[Any]
      tupleList.collect().foreach(t => {
        val value: util.List[Double] = new util.ArrayList[Double]
        value.add(t._1)
        value.add(t._2)
        valueList.add(value)
      })
      val json = new JSONObject()
      json.put("xlabel", xlabel)
      json.put("ylabel", ylabel)
      json.put("value", valueList)
      json
    }

    val evaluationJson = new JSONObject()
    val labels = metrics.labels
    // Overall Statistics

//
//    println(s"accuracy = ${metrics.accuracy}")
//    println(s"weightedPrecision = " + metrics.weightedPrecision)
//    // Precision by label

    val precisionList: util.List[Any] = new util.ArrayList[Any]
    labels.foreach { l =>
      precisionList.add(metrics.precision(l))
    }
//
//    labels.foreach { l =>
//      println(s"Precision($l) = " + metrics.precision(l))
//    }

    // 混淆矩阵
    val confusionMatrix = metrics.confusionMatrix
//    println(confusionMatrix)

//    println(s"weighted f-beta-score = " + metrics.weightedFMeasure(beta))
//    // f-measure for each label
//    labels.foreach { l =>
//      println(s"fMeasure($l) = " + metrics.fMeasure(l, beta))
//    }

//    println(s"weighted f-1-score = " + metrics.weightedFMeasure)


    // F-measure by label
    val fMeasureList: util.List[Any] = new util.ArrayList[Any]
    labels.foreach { l =>
      fMeasureList.add(metrics.fMeasure(l, beta))
    }
//    labels.foreach { l =>
//      println(s"F1-Score($l) = " + metrics.fMeasure(l))
//    }


//    println(s"weighted Recall = " + metrics.weightedRecall)
    // Recall by label
    val recallList: util.List[Any] = new util.ArrayList[Any]
    labels.foreach { l =>
      recallList.add(metrics.recall(l))
    }
//    labels.foreach { l =>
//      println(s"Recall($l) = " + metrics.recall(l))
//    }


//    println(s"weighted FPR = " + metrics.weightedFalsePositiveRate)
    // False positive rate by label
    val FPRList: util.List[Any] = new util.ArrayList[Any]
    labels.foreach { l =>
      FPRList.add(metrics.falsePositiveRate(l))
    }
//    labels.foreach { l =>
//      println(s"FPR($l) = " + metrics.falsePositiveRate(l))
//    }


//    println(s"weighted TPR = " + metrics.weightedTruePositiveRate)
    // False positive rate by label
    val TPRList: util.List[Any] = new util.ArrayList[Any]
    labels.foreach { l =>
      TPRList.add(metrics.truePositiveRate(l))
    }
//    labels.foreach { l =>
//      println(s"TPR($l) = " + metrics.truePositiveRate(l))
//    }
//
//
//    // Weighted stats
//    println(s"Weighted precision: ${metrics.weightedPrecision}")
//    println(s"Weighted recall: ${metrics.weightedRecall}")
//    println(s"Weighted F1 score: ${metrics.weightedFMeasure}")
//    println(s"Weighted false positive rate: ${metrics.weightedFalsePositiveRate}")

    evaluationJson.put("accuracy", metrics.accuracy)
    evaluationJson.put("weightedPrecision", metrics.accuracy)
    evaluationJson.put("weightedFMeasure", metrics.weightedFMeasure(beta))
    evaluationJson.put("weightedRecall", metrics.weightedRecall)
    evaluationJson.put("weightedFPR", metrics.weightedFalsePositiveRate)
    evaluationJson.put("weightedTPR", metrics.weightedTruePositiveRate)

    evaluationJson.put("labels", metrics.labels)
    evaluationJson.put("precisionByLabel", precisionList)
    evaluationJson.put("fMeasureByLabel", fMeasureList)
    evaluationJson.put("recallByLabel", recallList)
    evaluationJson.put("FPRByLabel", FPRList)
    evaluationJson.put("TPRByLabel", TPRList)

    evaluationJson.put("confusionMatrix", metrics.confusionMatrix.toArray)

    val evaluationResult = evaluationJson.toJSONString
    println(evaluationResult)
  }
}