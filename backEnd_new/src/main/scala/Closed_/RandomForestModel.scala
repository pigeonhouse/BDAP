import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.col
import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator
import org.apache.spark.ml.Pipeline
import org.apache.spark.ml.classification.{RandomForestClassificationModel, RandomForestClassifier}
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator
import org.apache.spark.ml.feature.{IndexToString, StringIndexer, VectorIndexer}
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.ml.linalg.{Vectors, Vector}

val id = "%s"
val project = "Demo"
val train = "%s"
val label = "%s"
val previous = "%s"
val newcol = "%s"
val numTree = %d
val idcol = "PassengerId"
val file = project + "/" + previous
val all1 = train + " " + label + " " + idcol
val all2 = train + " " + idcol

val PreviousArray = previous.split(" ")
val Trainfile = project + "/" + PreviousArray(0)
val Predictfile= project + "/" + PreviousArray(1)

val df_Train = spark.read.format("parquet").load(Trainfile)
val df_Predict = spark.read.format("parquet").load(Predictfile)

val aim1array = all1.split(" ")
val aim2array = all2.split(" ")
val trainArray = train.split(" ")

var df_ = df_Train
var df_1 = df_Predict

df_ = df_.select(aim1array.map(A => col(A)): _*)
df_1 = df_1.select(aim2array.map(A => col(A)):_*)

val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol("features")
df_ = assembler.transform(df_)
df_1 = assembler.transform(df_1)

val rf = new RandomForestClassifier().setLabelCol(label).setFeaturesCol("features").setNumTrees(numTree)

val model = rf.fit(df_)

val predictions = model.transform(df_1)

val predict_result = predictions.selectExpr(idcol, s"round(prediction,1) as ${newcol}")

predict_result.write.format("csv").option("header", "true").option("inferSchema", "true").mode(SaveMode.Overwrite).save(project + "/" + id)

var fin = predict_result.limit(20).toJSON.collectAsList.toString

val colname = predict_result.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

val result = Http("%s").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString


