import com.intel.analytics.bigdl.nn._
import com.intel.analytics.bigdl.utils.Shape
import com.intel.analytics.bigdl._
import com.intel.analytics.bigdl.mkl.Memory
import com.intel.analytics.bigdl.numeric.NumericFloat
//import com.intel.analytics.bigdl.nn.keras._

val id = "%s"
val file = "model/" + id
val x = %d
val y = %d

val model = Sequential()
model.add(Reshape(Array(1, x, y)))
//model.add(Reshape(Array(1, x, y), inputShape = Shape(x, y, 1)))
model.saveModule("model/" + id, "model_weight/" + id, true)