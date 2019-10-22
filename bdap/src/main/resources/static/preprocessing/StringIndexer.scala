object StringIndexer {

  val input: DataFrame = null
  val targetCols: Array[String] = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.feature.StringIndexer
    import org.apache.spark.ml.feature.VectorAssembler

    val metaData = input
    val assembler = new VectorAssembler().setInputCols(targetCols)
    val assembled = assembler.transform(metaData)

    input = spark.createDataFrame(
      Seq((0, "a"), (1, "b"), (2, "c"), (3, "a"), (4, "a"), (5, "c"))
    ).toDF("id", "category")

    val indexer = new StringIndexer()
      .setInputCol("category")
      .setOutputCol("categoryIndex")

    val indexed = indexer.fit(input).transform(input)

    val output = indexed

  }
}
