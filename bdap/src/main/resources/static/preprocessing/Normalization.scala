object Normalization {

  val normalizationType: String = null
  val targetCols: Array[String] = null
  var input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.linalg.Vector
    import org.apache.spark.ml.feature._
    import org.apache.spark.sql.functions._

    val diviTensor = udf((v: Vector) => v(0))

    var scaled = input

    for(i <- 0 to targetCols.length - 1){
      val assembler = new VectorAssembler().setInputCols(Array(targetCols(i))).setOutputCol("tensor" + targetCols(i))
      val assembled = assembler.transform(input)
      val scaler = normalizationType match {
        case "MinMax" => new MinMaxScaler().setInputCol("tensor" + targetCols(i)).setOutputCol("feature_" + targetCols(i))
        case "Standard" => new StandardScaler().setInputCol("tensor" + targetCols(i)).setOutputCol("feature_" + targetCols(i))
        case "MaxAbs" => new MaxAbsScaler().setInputCol("tensor" + targetCols(i)).setOutputCol("feature_" + targetCols(i))
      }
      val scalerModel = scaler.fit(assembled)
      scaled = scalerModel.transform(assembled)
      scaled = scaled.drop("tensor" + targetCols(i))
      scaled = scaled.withColumn(normalizationType + targetCols(i), diviTensor(col("feature_" + targetCols(i)))).drop("feature_" + targetCols(i))
    }

    val output = scaled
    output.show()

  }

}

