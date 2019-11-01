object QuantileDiscretizer {
  val handleInvalid: String = null
  //Param for how to handle invalid entries.

  val inputCols: Array[String] =null
  //Param for input column names.

  val numBuckets: Int = null
  //Array of number of buckets (quantiles, or categories) into which data points are grouped.

  val outputCol: String = null
  //Param for output column names.

  val relativeError: Double = null
  //Relative error (see documentation for org.apache.spark.sql.DataFrameStatFunctions.approxQuantile for description) Must be in the range [0, 1].

  val input: DataFrame = null
  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.feature.QuantileDiscretizer
    import org.apache.spark.sql.DataFrame
    val qd = new QuantileDiscretizer().setHandleInvalid(handleInvalid).setInputCol(inputCols(0)).setOutputCol(outputCol).setNumBuckets(numBuckets)
    val Model = qd.fit(input)

    val df = Model.transform(input)
    df.show(100)
    val output = df
  }
}