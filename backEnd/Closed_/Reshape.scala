val id = "%s"
val file = "model/" + id
val dim = %d
val x = %d
val y = %d
val z = %d

if(dim == 1){
    model.add(Reshape(Array(192)))
}else if(dim == 2){
    model.add(Reshape(Array(x, y)))
}else if(dim == 3){
    model.add(Reshape(Array(z, x, y)))
}
    
//model.add(Reshape(Array(1, x, y), inputShape = Shape(x, y, 1)))
//model.saveModule("model/" + id, "model_weight/" + id, true)