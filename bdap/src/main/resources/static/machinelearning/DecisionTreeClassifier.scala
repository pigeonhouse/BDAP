object DecisionTreeClassifier {

  val trainCols: Array[String] = null
  val labelCols: Array[String] = null
  val impurity: String = null
  val maxBins: Int = null
  val maxDepth: Int = null
  val minInforGain: Double = null
  val minInstancesPerNode: Boolean = null
  val seed: Int = null
  var input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.ml.classification.DecisionTreeClassifier
    import org.apache.spark.ml.classification.DecisionTreeClassificationModel

    val metaData = input

    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_")
    val assembled = assembler.transform(metaData)

    val DTClassifier = new DecisionTreeClassifier().setFeaturesCol("feature_").setLabelCol(labelCols(0)).setImpurity(impurity)
      .setMaxBins(maxBins).setMaxDepth(maxDepth).setMinInfoGain(minInforGain).setMinInstancesPerNode(minInstancesPerNode)
      .setSeed(seed)
    val Model = DTClassifier.fit(assembled)

    val dtModel = Model.asInstanceOf[DecisionTreeClassificationModel].toDebugString
  }
}
