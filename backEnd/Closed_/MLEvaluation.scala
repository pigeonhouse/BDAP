import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator

val project = "Taitanic1"
val id = "8"
val previous = "7"
val label = "Survived"
val file = project + "/" + previous

val df = spark.read.format("json").load(file)

val evaluator = new BinaryClassificationEvaluator().setRawPredictionCol("prediction").setLabelCol(label)
val c = df.select(label, "prediction")
