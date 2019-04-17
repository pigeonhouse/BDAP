import com.intel.analytics.bigdl.dataset.image.{BytesToGreyImg, GreyImgNormalizer, GreyImgToSample}
import com.intel.analytics.bigdl.nn.Module
import com.intel.analytics.bigdl.utils.Engine
import com.intel.analytics.bigdl.dataset.Sample
import scala.collection.mutable.ArrayBuffer

val id = "%s"
val previous = "%s"
val Predictfile = "fadfaef"

val file_model = "Model/" + previous + "/model"
val file_model_weight = "Model/" + previous + "/weight"

val rawData = load(validationData, validationLabel)

val iter = rawData.iterator

val sampleIter = GreyImgToSample()(
        GreyImgNormalizer(trainMean, trainStd)(
        BytesToGreyImg(28, 28)(iter)))
var samplesBuffer = ArrayBuffer[Sample[Float]]()

while (sampleIter.hasNext){
        val elem = sampleIter.next().clone()
        samplesBuffer += elem
}
val samples = samplesBuffer.toArray

val model = Module.loadModule(file_model, file_model_weight)

val PredictSet = sc.parallelize(samples)
val result = model.predict(PredictSet)
val result_class = model.predictClass(PredictSet)

result_class.foreach(r => println(s"${r}"))