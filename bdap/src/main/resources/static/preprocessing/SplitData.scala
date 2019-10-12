object SplitData {

  val input: DataFrame = null
  val ratio: Double = null

  def main(args: Array[String]): Unit = {

    val dfSchema = input.schema
    val inputRdd = input.rdd

    val Array(trainData, testData) = inputRdd.randomSplit(Array(1 - ratio, ratio))

    val trainDF = spark.createDataFrame(trainData, dfSchema)
    val testDF = spark.createDataFrame(testData, dfSchema)

    //trainDF.show(100)
    //testDF.show(100)

    val output = trainDF
    val output_1 = testDF
  }
}
