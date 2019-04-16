import com.intel.analytics.bigdl.nn.keras._
import com.intel.analytics.bigdl.utils.Shape

val id = "adfadf"
val previous = "fadsfa"
val file = "model/" + previous

val model = Module.loadModule(file)
model.add(MaxPooling2D())
model.saveModule("model/" + id)