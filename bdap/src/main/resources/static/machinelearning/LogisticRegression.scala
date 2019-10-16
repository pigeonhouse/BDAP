object LogisticRegression {

  val trainCols: Array[String] = null
  val labelCol: String = null
  val MaxIter: Int = null
  val Tol: Double = null
  val RegParam: Double = null
  val ElasticNetParam: Double = null
  val FitIntercept: Boolean = null
  var input: DataFrame = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.classification.LogisticRegression
    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.sql.DataFrame
    import org.apache.spark.sql.functions.col

    val aimarray = trainCols:+labelCol

    val df = input.select(aimarray.map(A => col(A)): _*)

    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_lr")
    val assembledDF = assembler.transform(df)

    val lr = new LogisticRegression().setFeaturesCol("features_lr").setLabelCol(labelCol).setFitIntercept(FitIntercept).setMaxIter(MaxIter).setRegParam(RegParam).setElasticNetParam(ElasticNetParam).setTol(Tol)

    val Model = lr.fit(assembledDF)

    val output = Model
  }
}

