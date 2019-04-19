val id = "%s"
val previous = "%s"
val x = %d
val y = %d
val outputz = %d
val inputz = %d

//val model = Module.loadModule(file, "model_weight/" + previous)
model.add(SpatialConvolution(inputz, outputz, x, y)).add(%s())
//model.add(Convolution2D(z, x, y, activation = activa).setName("conv1_5x5"))
//model.saveModule("model/" + id, "model/" + id, true)