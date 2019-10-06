object SplitData {

  val input: DataFrame = null
  val ratio: Double = null

  def main(args: Array[String]): Unit = {

    val schema = input.schema
    val rdd = input.rdd

    val Array(trainData, testData) = rdd.randomSplit(Array(1 - ratio, ratio))

    val trainDF = spark.createDataFrame(trainData, schema)
    val testDF = spark.createDataFrame(testData, schema)
    trainDF.show(100)
    testDF.show(100)
  }
}
