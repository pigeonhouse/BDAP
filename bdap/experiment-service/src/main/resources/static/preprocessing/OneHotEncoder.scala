object OneHotEncoder {

  val ifDenseVector: Boolean = null
  val targetCols: Array[String] = null
  val input: DataFrame = null
  val dropLast: Boolean = null
  val handleInvalid: String = null
  val prefix: String = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.sql.functions.col
    import org.apache.spark.ml.linalg.{Vector, Vectors}
    import org.apache.spark.ml.feature.{OneHotEncoderEstimator, StringIndexer, VectorAssembler}

    def Sparse2Dense(v: Vector) = {
      var array = Array(v(0))
      for(i <- 1 to v.size - 1){
        array = array:+(v(i))
      }
      Vectors.dense(array)
    }

    val myUdf = udf(Sparse2Dense _)

    val metaData = input

    var indexedDF = metaData
    for(i <- 0 until targetCols.length){
      val indexer = new StringIndexer().setInputCol(targetCols(i)).setOutputCol(s"${targetCols(i)}Index")
      val indexerModel = indexer.fit(indexedDF)
      indexedDF = indexerModel.transform(indexedDF)
    }

    val encoder = new OneHotEncoderEstimator().setInputCols(targetCols.map(A => A + "Index")).setOutputCols(targetCols.map(A => prefix + A + "SparseVec")).setHandleInvalid(handleInvalid).setDropLast(dropLast)
    val encoderModel = encoder.fit(indexedDF)
    var encodedDF = encoderModel.transform(indexedDF)

    for(i <- 0 until targetCols.length){
      encodedDF = encodedDF.drop(targetCols(i) + "Index")
      if(ifDenseVector == true){
        encodedDF = encodedDF.withColumn(prefix + targetCols(i) + "DenseVec", myUdf(col(prefix + targetCols(i) + "SparseVec"))).drop(prefix + targetCols(i) + "SparseVec")
      }
    }

    encodedDF.show()

    val output = encodedDF
  }
}
