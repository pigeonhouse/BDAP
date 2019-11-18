object Predict {

  val trainCols: Array[String] = null
  val newColName = null
  var input = null
  var input_1: DataFrame = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.classification.LogisticRegression
    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.ml.linalg.Vector

    var metaData = input_1

    val diviTensor = udf((v: Vector) => v(1))

    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_")
    val assembled = assembler.transform(metaData)

    val columns = assembled.columns

    val predictions = {
      if(columns.contains("probability")){
        Model.transform(assembled).drop("features_").drop("rawPrediction").withColumn("Probability_", diviTensor(col("probability"))).drop("probability")
      } else {
        Model.transform(assembled).drop("features_").drop("rawPrediction").withColumnRenamed(newCol, "prediction")
      }
    }


    val output = predictions

    output.show(100)
  }
}