object Predict {

  val trainCols: Array[String] = null
  val labelCol: String = null
  val newColName = null
  var input = null
  var input_1: DataFrame = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.classification.LogisticRegression
    import org.apache.spark.ml.feature.VectorAssembler

    val aimarray = trainCols:+labelCol

    var df_ = input_1

    df_ = df_.select(aimarray.map(A => col(A)): _*)

    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_lr")
    df_ = assembler.transform(df_)

    val predictions = Model.transform(df_)
    val predict_result = predictions.selectExpr("features_lr", labelCol, s"round(prediction,1) as ${newColName}")

    val output = predict_result

    output.show(100)
  }
}