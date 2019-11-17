object NaiveBayes {

  val input: DataFrame = null
  val modelType: String = null   // 只有两种模型 "multinomial" 或 "bernoulli" ，默认为多项式
  val smoothing: Double = null
  val trainCols: Array[String] = null
  val labelCols: Array[String] = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.sql.DataFrame
    import org.apache.spark.sql.functions.col
    import org.apache.spark.ml.classification.NaiveBayes
    import org.apache.spark.ml.classification.NaiveBayesModel

    val labelCol = labelCols(0)

    val metaData = input
    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_")
    val assembledDF = assembler.transform(metaData)

    // 训练bayes模型
    val NB = new NaiveBayes().setFeaturesCol("features_").setLabelCol(labelCol).setModelType(modelType).setSmoothing(smoothing).setProbabilityCol("probability")

    val Model = NB.fit(assembledDF)

    val output = Model

  }
}
