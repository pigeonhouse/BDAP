object QuantileDiscretizer {
  val handleInvalid: String = null
  //Param for how to handle invalid entries.

  val inputCols: Array[String] =null
  //Param for input column names.

  val numBuckets: Int = null
  //Array of number of buckets (quantiles, or categories) into which data points are grouped.

  val relativeError: Double = null
  //Relative error (see documentation for org.apache.spark.sql.DataFrameStatFunctions.approxQuantile for description) Must be in the range [0, 1].

  val input: DataFrame = null

  val prefix: String = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.feature.QuantileDiscretizer
    import org.apache.spark.sql.DataFrame

    val metaData = input

    var discretized = metaData

    for(i <- 0 until inputCols.length) {
      val qd = new QuantileDiscretizer().setHandleInvalid(handleInvalid).setInputCol(inputCols(i)).setOutputCol(prefix + inputCols(i)).setNumBuckets(numBuckets)
      val Model = qd.fit(discretized)
      discretized = Model.transform(discretized)
    }
    val output = discretized
  }
}