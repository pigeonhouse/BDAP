object StringIndexer {

  val input: DataFrame = null

  val handleInvalid: String = null
  //Param for how to handle invalid entries.

  val targetCols: Array[String] = null
  //Param for input column names.

  val stringOrderType: String = null

  val outputCol: String = null
  //Param for output column names.

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.feature.StringIndexer

    val metaData = input

    val indexer = new StringIndexer().setInputCol(targetCols).setOutputCol(outputCol).setHandleInvalid(handleInvalid).setStringOrderType(stringOrderType)

    val indexed = indexer.fit(input).transform(input)

    val output = indexed

  }
}
