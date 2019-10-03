import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.col
import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator

val userId = "%s"
val id = "%s"
val trainCol = "%s"
val label = "%s"
val MaxIter = %s
val Tol = %s
val RegParam = %s
val ElasticNetParam = %s
val FitIntercept = %s

val all = trainCol + " " + label

val aimarray = all.split(" ")
val trainArray = trainCol.split(" ")

var df_ = df_%s
  df_ = df_.select(aimarray.map(A => col(A)): _*)

val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol("features_lr")
df_ = assembler.transform(df_)

val lr = new LogisticRegression()
  .setFeaturesCol("features_lr")
  .setLabelCol(label)
  .setFitIntercept(FitIntercept)
  .setMaxIter(MaxIter)
  .setRegParam(RegParam)
  .setElasticNetParam(ElasticNetParam)
  .setTol(Tol)

val Model_%s = lr.fit(df_)
