
val inputdim = %d
val outputdim = %d
val input_length = %d

model.add(Embedding(inputdim, outputdim, inputShape = Shape(input_length)))