//import com.intel.analytics.bigdl.nn.keras._
import com.intel.analytics.bigdl.utils.Shape
import com.intel.analytics.bigdl._
import com.intel.analytics.bigdl.mkl.Memory
import com.intel.analytics.bigdl.numeric.NumericFloat
import com.intel.analytics.bigdl.nn._

val id = "%s"
val previous = "%s"
val x = %d
val y = %d
val z = %d
val activa = "%s"
val file = "model/" + previous

val model = Module.loadModule(file, "model_weight/" + previous)
model.add(SpatialConvolution(1, 6, 5, 5).setName("conv1_5x5")).add(Tanh())
//model.add(Convolution2D(z, x, y, activation = activa).setName("conv1_5x5"))
model.saveModule("model/" + id, "model/" + id, true)