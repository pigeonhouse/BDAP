import com.intel.analytics.bigdl.nn.keras._
import com.intel.analytics.bigdl.utils.Shape

val id = "adfadf"
val previous = "fadsfa"
val active = "tanh"
val outputdim = 100
val file = "model/" + previous

val model = Module.loadModule(file)
model.add(Dense(outputdim, activation = active))
model.saveModule("model/" + id)