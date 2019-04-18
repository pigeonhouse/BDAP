import com.intel.analytics.bigdl.optim._
import com.intel.analytics.bigdl.nn._
import com.intel.analytics.bigdl.numeric.NumericFloat

val id = "%s"
val learningRate = %f
val learningRateDecay = 0.0
val maxEpoch = %d
//val Losses = ClassNLLCriterion[Float]()

val optimMethod = new SGD[Float](learningRate = learningRate,
  learningRateDecay = learningRateDecay)

val optimizer = Optimizer(
  model = model,
  dataset = trainSet,
  criterion = ClassNLLCriterion[Float]())
  
optimizer.setValidation(
  trigger = Trigger.everyEpoch,
  dataset = validationSet,
  vMethods = Array(new Top1Accuracy, new Loss[Float])
  ).setOptimMethod(optimMethod).setEndWhen(Trigger.maxEpoch(maxEpoch))

val trainedModel = optimizer.optimize()

trainedModel.saveModule("Model/" + id + "/model", "Model/" + id + "/weight", true)