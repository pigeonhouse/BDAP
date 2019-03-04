package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.dataset.DataSet
import com.intel.analytics.bigdl.dataset.image.{BytesToGreyImg, GreyImgNormalizer, GreyImgToBatch}
import com.intel.analytics.bigdl.models.lenet.Utils._
import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.sql.{DataFrame, SQLContext}

object InputMinst {

  case class Person(name:String, age:Int)

  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf().setAppName("Input").set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    import SQLContext.implicits._

    //以下一段全为参数
    val folder = "hdfs://localhost:9000/input"
    val project = "demo"
    val id = "97aa0b0f"
    val batchSize = 256

    val trainData = folder + "/train-images-idx3-ubyte"
    val trainLabel = folder + "/train-labels-idx1-ubyte"
    val validationData = folder + "/t10k-images-idx3-ubyte"
    val validationLabel = folder + "/t10k-labels-idx1-ubyte"

    val trainSet = DataSet.array(load(trainData, trainLabel), sc) -> BytesToGreyImg(28, 28) -> GreyImgNormalizer(trainMean, trainStd) -> GreyImgToBatch(
      batchSize)
    val validationSet = DataSet.array(load(validationData, validationLabel), sc) -> BytesToGreyImg(28, 28) -> GreyImgNormalizer(testMean, testStd) -> GreyImgToBatch(
      batchSize)

    sc.stop()

  }
}
