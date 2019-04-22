import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.col
import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator

val project = "Demo"
val id = "%s"
val train = "SexIndex NewCol MinMaxScaledAge MinMaxScaledPclass MinMaxScaledFare"
val label = "%s"
val previous = "%s"
val newcol = "%s"
val idcol = "PassengerId"
val file = project + "/" + previous
val all = train + " " + label + " " + idcol

val PreviousArray = previous.split(" ")
val Trainfile = project + "/" + PreviousArray(0)
val Predictfile= project + "/" + PreviousArray(1)

val df_Train = spark.read.format("parquet").load(Trainfile)
val df_Predict = spark.read.format("parquet").load(Predictfile)

val aimarray = all.split(" ")
val trainArray = train.split(" ")

var df_ = df_Train
var df_1 = df_Predict

df_ = df_.select(aimarray.map(A => col(A)): _*)
df_1 = df_1.select(aimarray.map(A => col(A)):_*)

val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol("features")
df_ = assembler.transform(df_)
df_1 = assembler.transform(df_1)

val lr1 = new LogisticRegression()
val lr = lr1.setFeaturesCol("features").setLabelCol(label).setFitIntercept(true).setMaxIter(50)

val lrModel = lr.fit(df_)
lrModel.extractParamMap()

val predictions = lrModel.transform(df_1)

val predict_result = predictions.selectExpr("PassengerId", s"round(prediction,1) as ${newcol}")

predict_result.write.format("csv").option("header", "true").option("inferSchema", "true").mode(SaveMode.Overwrite).save(project + "/" + id)

//val evaluator = new BinaryClassificationEvaluator().setRawPredictionCol(newcol).setLabelCol(label)
//val c = predict_result.select(label, newcol)
//val accuracy = evaluator.evaluate(c)

var fin = predict_result.limit(20).toJSON.collectAsList.toString

val colname = predict_result.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

    val result = Http("%s").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString




