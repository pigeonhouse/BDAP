import com.intel.analytics.bigdl.dataset.{DataSet, SampleToBatch}
import com.intel.analytics.bigdl.dataset.image.{BytesToGreyImg, GreyImgNormalizer, GreyImgToSample}
import com.intel.analytics.bigdl.nn.Module
import com.intel.analytics.bigdl.optim.{Top1Accuracy, ValidationMethod}
import com.intel.analytics.bigdl.utils.Engine
import org.apache.log4j.{Level, Logger}

val id = "%s"
val previous = "%s"
val file = "Model/" + previous + "/model"

//val partitionNum = Engine.nodeNumber() * Engine.coreNumber()


val rddData = sc.parallelize(load(validationData, validationLabel))
val transformer = BytesToGreyImg(28, 28) -> GreyImgNormalizer(testMean, testStd) -> GreyImgToSample()
val evaluationSet = transformer(rddData)

//val model = Module.load[Float](file)

val result = model.evaluate(evaluationSet,
        Array(new Top1Accuracy[Float].asInstanceOf[ValidationMethod[Float]]), Some(batchSize))

result.foreach(r => println(s"${r._2} is ${r._1}"))