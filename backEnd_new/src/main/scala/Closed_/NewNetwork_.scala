import com.intel.analytics.bigdl._
import com.intel.analytics.bigdl.mkl.Memory
import com.intel.analytics.bigdl.numeric.NumericFloat
import com.intel.analytics.bigdl.nn.keras._
import com.intel.analytics.bigdl.utils.Shape
import com.intel.analytics.bigdl.utils.{Engine, File}

Engine.init

val id = "%s"

val model = Sequential()
