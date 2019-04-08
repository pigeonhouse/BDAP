import java.nio.ByteBuffer
import java.nio.file.{Files, Paths}
import com.intel.analytics.bigdl.dataset.{ByteRecord, DataSet}
import com.intel.analytics.bigdl.dataset.image.{BytesToGreyImg, GreyImgNormalizer, GreyImgToBatch}
import com.intel.analytics.bigdl.models.lenet.Utils._
import com.intel.analytics.bigdl.models.lenet.LeNet5.apply
import com.intel.analytics.bigdl.nn._
import com.intel.analytics.bigdl.optim._
import com.intel.analytics.bigdl.utils.{Engine, File}
import org.apache.spark.SparkContext

def load(featureFile: String, labelFile: String): Array[ByteRecord] = {

  val featureBuffer = if (featureFile.startsWith("hdfs:")) {
    ByteBuffer.wrap(File.readHdfsByte(featureFile))
  } else {
    ByteBuffer.wrap(Files.readAllBytes(Paths.get(featureFile)))
  }
  val labelBuffer = if (featureFile.startsWith("hdfs:")) {
    ByteBuffer.wrap(File.readHdfsByte(labelFile))
  } else {
    ByteBuffer.wrap(Files.readAllBytes(Paths.get(labelFile)))
  }
  val labelMagicNumber = labelBuffer.getInt()

  val featureMagicNumber = featureBuffer.getInt()

  val labelCount = labelBuffer.getInt()
  val featureCount = featureBuffer.getInt()
  require(labelCount == featureCount)

  val rowNum = featureBuffer.getInt()
  val colNum = featureBuffer.getInt()

  val result = new Array[ByteRecord](featureCount)
  var i = 0
  while (i < featureCount) {
    val img = new Array[Byte]((rowNum * colNum))
    var y = 0
    while (y < rowNum) {
      var x = 0
      while (x < colNum) {
        img(x + y * colNum) = featureBuffer.get()
        x += 1
      }
      y += 1
    }
    result(i) = ByteRecord(img, labelBuffer.get().toFloat + 1.0f)
    i += 1
  }
  result
}

val conf = Engine.createSparkConf().setMaster("spark://10.105.222.90:7077").set("spark.driver.allowMultipleContexts", "true").set("spark.cores.max", "4");
val ssc = new SparkContext(conf)
Engine.init

val classNum = 10
val learningRate = 0.005
val learningRateDecay = 0.0
val batchSize = 256
val maxEpoch = 1
val project = "demo"

//val checkpoint: Option[String] = Some("hdfs:///" + "user/tseg/" + project + "/model")

val id = "54612a04"
val previous = "97aa0b0f"
val folder = "hdfs:///demoData"

val trainData = folder + "/train-images.idx3-ubyte"
val trainLabel = folder + "/train-labels.idx1-ubyte"
val validationData = folder + "/t10k-images.idx3-ubyte"
val validationLabel = folder + "/t10k-labels.idx1-ubyte"

val model = apply(classNum)

val trainSet = DataSet.array(load(trainData, trainLabel), ssc) -> BytesToGreyImg(28, 28) -> GreyImgNormalizer(trainMean, trainStd) -> GreyImgToBatch(
  batchSize)


val optimMethod = new SGD[Float](learningRate = learningRate,
  learningRateDecay = learningRateDecay)


val optimizer = Optimizer(
  model = model,
  dataset = trainSet,
  criterion = ClassNLLCriterion[Float]())

/*
if (checkpoint.isDefined) {
  optimizer.setCheckpoint(checkpoint.get, Trigger.everyEpoch)
}
*/

val validationSet = DataSet.array(load(validationData, validationLabel), ssc) -> BytesToGreyImg(28, 28) -> GreyImgNormalizer(testMean, testStd) -> GreyImgToBatch(
  batchSize)

optimizer.setValidation(
  trigger = Trigger.everyEpoch,
  dataset = validationSet,
  vMethods = Array(new Top1Accuracy, new Top5Accuracy[Float], new Loss[Float])).setOptimMethod(optimMethod).setEndWhen(Trigger.maxEpoch(maxEpoch)).optimize()

ssc.stop()
