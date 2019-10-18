object OneHotEncoder {

  val ifDenseVector: String = null
  val targetCols: Array[String] = null
  var input: DataFrame = null

  def main(args: Array[String]): Unit = {

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
      val indexerModel = indexer.fit(metaData)
      val indexedDF = indexerModel.transform(metaData)
    }

    val encoder = new OneHotEncoderEstimator().setInputCols(targetCols.map(A => A + "Index")).setOutputCols(targetCols.map(A => A + "SparseVec"))
    val encoderModel = encoder.fit(indexedDF)
    var encodedDF = encoderModel.transform(indexedDF)

    for(i <- 0 until targetCols.length){
      encodedDF = encodedDF.drop(targetCols(i) + "Index")
      if(ifDenseVector == "true"){
        encodedDF = encodedDF.withColumn(targetCols(i) + "DenseVec", myUdf(col(targetCols(i) + "SparseVec"))).drop(targetCols(i) + "SparseVec")
      }
    }

    encodedDF.show()

    val output = encodedDF
  }
}
