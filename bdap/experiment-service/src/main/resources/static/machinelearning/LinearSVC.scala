object LinearSVC {

  val trainCols: Array[String] = null
  val labelCols: Array[String] = null
  val MaxIter: Int = null
  val Tol: Double = null
  val RegParam: Double = null
  val FitIntercept: Boolean = null
  var input: DataFrame = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.sql.DataFrame
    import org.apache.spark.sql.functions.col
    import org.apache.spark.ml.classification.LinearSVC
    import org.apache.spark.ml.classification.LinearSVCModel

    val labelCol = labelCols(0)

    val metaData = input
    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_")
    val assembledDF = assembler.transform(metaData)

    val linearSVC = new LinearSVC().setFeaturesCol("features_").setLabelCol(labelCol).setRegParam(RegParam).setMaxIter(MaxIter).setTol(Tol).setFitIntercept(FitIntercept)

    val Model = linearSVC.fit(assembledDF)

  }
}
