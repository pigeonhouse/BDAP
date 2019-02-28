package com.intel.analytics.bigdl

import com.intel.analytics.bigdl.dataset.{ByteRecord, DataSet}
import com.intel.analytics.bigdl.dataset.image.{BytesToGreyImg, GreyImgNormalizer, GreyImgToBatch}
import com.intel.analytics.bigdl.models.lenet.Utils._
import com.intel.analytics.bigdl.models.lenet.LeNet5.apply
import com.intel.analytics.bigdl.nn._
import com.intel.analytics.bigdl.optim._
import com.intel.analytics.bigdl.utils.{Engine, File}
import org.apache.spark.SparkContext

object Train{

  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf().setAppName("Train Lenet on MNIST").set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    Engine.init

    val classNum = 10
    val learningRate = 0.005
    val learningRateDecay = 0.0
    val batchSize = 256
    val maxEpoch = 15
    val folder = "/home/hadoop/BigDL/minst"
    val checkpoint:Option[String] = Some("/home/hadoop/BigDL/model")

    val trainData = folder + "/train-images-idx3-ubyte"
    val trainLabel = folder + "/train-labels-idx1-ubyte"
    val validationData = folder + "/t10k-images-idx3-ubyte"
    val validationLabel = folder + "/t10k-labels-idx1-ubyte"

    val model = apply(10)

    val trainSet = DataSet.array(load(trainData, trainLabel), sc) -> BytesToGreyImg(28, 28) -> GreyImgNormalizer(trainMean, trainStd) -> GreyImgToBatch(
      batchSize)

    val optimMethod = new SGD[Float](learningRate = learningRate,
      learningRateDecay = learningRateDecay)

    val optimizer = Optimizer(
      model = model,
      dataset = trainSet,
      criterion = ClassNLLCriterion[Float]())
    if (checkpoint.isDefined) {
      optimizer.setCheckpoint(checkpoint.get, Trigger.everyEpoch)
    }

    val validationSet = DataSet.array(load(validationData, validationLabel), sc) -> BytesToGreyImg(28, 28) -> GreyImgNormalizer(testMean, testStd) -> GreyImgToBatch(
      batchSize)

    optimizer.setValidation(
      trigger = Trigger.everyEpoch,
      dataset = validationSet,
      vMethods = Array(new Top1Accuracy, new Top5Accuracy[Float], new Loss[Float])).setOptimMethod(optimMethod).setEndWhen(Trigger.maxEpoch(maxEpoch)).optimize()

    sc.stop()

  }
}
