object StringIndexer {

  val input: DataFrame = null

  val handleInvalid: String = null
  //Param for how to handle invalid entries.

  val targetCols: Array[String] = null
  //Param for input column names.

  val stringOrderType: String = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.feature.StringIndexer

    val metaData = input

    var indexed = metaData

    for(i <- 0 until targetCols.length){
      val indexer = new StringIndexer().setInputCol(targetCols(i)).setOutputCol("StringIndex" + targetCols(i)).setHandleInvalid(handleInvalid).setStringOrderType(stringOrderType)
      indexed = indexer.fit(indexed).transform(indexed)
    }

    val output = indexed
  }
}
