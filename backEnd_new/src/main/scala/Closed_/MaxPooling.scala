
val filterX = %d
val filterY = %d
val padX = %d
val padY = %d

//val model = Module.loadModule(file)
//model.add(MaxPooling2D())
model.add(SpatialMaxPooling(filterX, filterY, padX, padY))
//model.saveModule("model/" + id)