import org.apache.spark.ml.classification.LogisticRegressionModel
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.functions.col

val project = "Taitanic1"
val id = "7"
val previous = "6 5"
val train = "MinMaxScaledAge MinMaxScaledPclass Mother SexIndex MinMaxScaledFare"
val label = "Survived"
val all = train + " " + label

val PreviousArray = previous.split(" ")
val aimarray = all.split(" ")
val trainArray = train.split(" ")

val Modelfile = "Model/" + project + "/" + PreviousArray(0)
val Predictfile= project + "/" + PreviousArray(1)

val df = spark.read.format("json").load(Predictfile)
val Model = LogisticRegressionModel.load(Modelfile)

var df_ = df
df_ = df_.select(aimarray.map(A => col(A)): _*)

val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol("features")
df_ = assembler.transform(df_)

val predictions = Model.transform(df_)

val predict_result =predictions.selectExpr("features","Survived", "round(prediction,1) as prediction")

predict_result.write.format("json")
        .mode(SaveMode.Append)
        .save(project + "/" + id)