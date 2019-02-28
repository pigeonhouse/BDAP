package com.intel.analytics.bigdl

import com.intel.analytics.bigdl.dataset.image.{BytesToGreyImg, GreyImgNormalizer, GreyImgToSample}
import com.intel.analytics.bigdl.nn.Module
import com.intel.analytics.bigdl.optim.Top1Accuracy
import com.intel.analytics.bigdl.utils.Engine
import com.intel.analytics.bigdl.models.lenet.Utils._
import org.apache.spark.SparkContext

object Test {

  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf().setAppName("Test Lenet on MNIST")
      .set("spark.akka.frameSize", 64.toString)
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    Engine.init

    val folder = "/home/hadoop/BigDL/minst"
    val batchSize = 16
    val module = "/home/hadoop/BigDL/model/20190228_200702/model.236"

    val validationData = folder + "/t10k-images-idx3-ubyte"
    val validationLabel = folder + "/t10k-labels-idx1-ubyte"

    val partitionNum = Engine.nodeNumber() * Engine.coreNumber()
    val rddData = sc.parallelize(load(validationData, validationLabel), partitionNum)
    val transformer =
      BytesToGreyImg(28, 28) -> GreyImgNormalizer(testMean, testStd) -> GreyImgToSample()
    val evaluationSet = transformer(rddData)

    val model = Module.load[Float](module)
    val result = model.evaluate(evaluationSet,
      Array(new Top1Accuracy[Float]), Some(batchSize))

    result.foreach(r => println(s"${r._2} is ${r._1}"))

    sc.stop()

  }
}
