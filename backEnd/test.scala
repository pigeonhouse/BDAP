import com.intel.analytics.bigdl.tensor.Tensor
import com.intel.analytics.bigdl.tensor.TensorNumericMath.TensorNumeric.NumericFloat

import com.intel.analytics.bigdl.nn.{Sequential, Linear}

val module = Sequential()
module.add(Linear(10, 25))
module.add(Linear(25, 10))

val input = Tensor(10).range(1, 10, 1)
val gradOutput = Tensor(10).range(1, 10, 1)

val output = module.forward(input).toTensor
val gradInput = module.backward(input, gradOutput).toTensor

println(output)
println(gradInput) 