package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.{DataFrame, SQLContext}
import org.apache.spark.sql.functions.col

object LogisticRegression {
  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf()
      .setAppName("LinearRegression")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "Taitanic"
    val id = "9"
    val train = "MinMaxScaledAgeIndex MinMaxScaledPclass MinMaxScaledMother MinMaxScaledSexIndex MinMaxScaledFare"
    val label = "Survived"
    val previous = "8"
    val file = "/home/hadoop/BigDL/" + project + "/" + previous
    val all = train + " " + label

    val df = SQLContext.read.format("json").load(file)
    val aimarray = all.split(" ")
    val trainArray = train.split(" ")
    var df_ = df
    df_ = df_.select(aimarray.map(A => col(A)): _*)

    val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol("features")
    df_ = assembler.transform(df_)

    val lr1 = new LogisticRegression()
    val lr2 = lr1.setFeaturesCol("features").setLabelCol(label).setFitIntercept(true).setMaxIter(1000)
    val lr = lr2

    val lrModel = lr.fit(df_)
    lrModel.extractParamMap()
    println(s"Coefficients: ${lrModel.weights} Intercept: ${lrModel.intercept}")

    val predictions: DataFrame = lrModel.transform(df_)
    println("输出预测结果")
    val predict_result: DataFrame =predictions.selectExpr("features","Survived", "round(prediction,1) as prediction")
    predict_result.show(200, false)

    sc.stop()
  }
}
