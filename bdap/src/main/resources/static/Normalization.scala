object Normalization {

  val normalizationType: String = null
  val targetCols: Array[String] = null
  var input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.feature._

    val assembler = new VectorAssembler().setInputCols(targetCols).setOutputCol("features")
    val assembled = assembler.transform(input)
    val scaled = {
      if (normalizationType == "Normal") {
        val scaler = new Normalizer().setInputCol("features").setOutputCol("NormFeatures").setP(1.0)
        scaler.transform(assembled)
      } else {
        val scaler = normalizationType match {
          case "MinMax" => new MinMaxScaler().setInputCol("features").setOutputCol("MinMaxFeatures")
          case "Standard" => new StandardScaler().setInputCol("features").setOutputCol("StandardFeatures")
          case "MaxAbs" => new MaxAbsScaler().setInputCol("features").setOutputCol("MaxAbsFeatures")
        }
        val scalerModel = scaler.fit(assembled)
        scalerModel.transform(assembled)
      }
    }

    val output = scaled
    output.show()

  }

}

