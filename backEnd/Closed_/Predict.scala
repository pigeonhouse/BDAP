import com.intel.analytics.bigdl.dataset.image.{BytesToGreyImg, GreyImgNormalizer, GreyImgToSample}
import com.intel.analytics.bigdl.nn.Module
import com.intel.analytics.bigdl.utils.Engine
import com.intel.analytics.bigdl.dataset.Sample

val id = "%s"
val previous = "%s"
val Predictfile = "fadfaef"

val file = "Model/" + previous + "/model"

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

val model = Module.load[Float](file)
val result = model.predict(samples)
val result_class = model.predictClass(samples)

result_class.foreach(r => println(s"${r}"))