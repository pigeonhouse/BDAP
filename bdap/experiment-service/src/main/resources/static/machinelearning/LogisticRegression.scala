object LogisticRegression {

  val trainCols: Array[String] = null
  val labelCols: Array[String] = null
  val MaxIter: Int = null
  val Tol: Double = null
  val RegParam: Double = null
  val ElasticNetParam: Double = null
  val FitIntercept: Boolean = null
  var input: DataFrame = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.classification.LogisticRegression
    import org.apache.spark.ml.classification.LogisticRegressionModel
    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.sql.DataFrame
    import org.apache.spark.sql.functions.col

    val labelCol = labelCols(0)
    val aimarray = trainCols:+labelCol

    val df = input.select(aimarray.map(A => col(A)): _*)

    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_")
    val assembledDF = assembler.transform(df)

    val lr = new LogisticRegression().setFeaturesCol("features_").setLabelCol(labelCol).setFitIntercept(FitIntercept).setMaxIter(MaxIter).setRegParam(RegParam).setElasticNetParam(ElasticNetParam).setTol(Tol).setProbabilityCol("probability")

    val Model = lr.fit(assembledDF)

  }
}

