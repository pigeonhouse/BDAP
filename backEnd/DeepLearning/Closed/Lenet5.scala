package com.intel.analytics.bigdl

import com.intel.analytics.bigdl.models.lenet.LeNet5
import com.intel.analytics.bigdl.nn.ClassNLLCriterion
import com.intel.analytics.bigdl.optim._
import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext

object Lenet5 {
  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf().setAppName("Output").set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    Engine.init

    //以下全为参数
    val classNum = 10
    val learningRate = 0.005
    val learningRateDecay = 0.0
    val batchSize = 256
    val maxEpoch = 15
    val project = "demo"
    val checkpoint:Option[String] = Some("hdfs://localhost:9000/"+ project + "/model")
    val id = "54612a04"
    val previous = "97aa0b0f"

    val model = LeNet5.apply(classNum)

    val trainSet = sc.textFile("hdfs://localhost:9000/" + project + "/" + previous + "/trainSet")

    val validationSet = sc.textFile("hdfs://localhost:9000/" + project + "/" + previous + "/validationSet")

    val optimMethod = new SGD[Float](learningRate = learningRate,
      learningRateDecay = learningRateDecay)

    /*
    val optimizer = Optimizer(
      model = model,
      sampleRDD = trainSet,
      criterion = ClassNLLCriterion[Float]())
    if (checkpoint.isDefined) {
      optimizer.setCheckpoint(checkpoint.get, Trigger.everyEpoch)
    }


    optimizer.setValidation(
      trigger = Trigger.everyEpoch,
      sampleRDD = validationSet,
      vMethods = Array(new Top1Accuracy, new Top5Accuracy[Float], new Loss[Float])).setOptimMethod(optimMethod).setEndWhen(Trigger.maxEpoch(maxEpoch)).optimize()
    */

    sc.stop()

  }
}
