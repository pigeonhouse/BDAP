object KMeans {

  val trainCols: Array[String] = null
  val labelCols: Array[String] = null
  val seed: Int = null
  val input: DataFrame = null
  val categories: Int = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.clustering.KMeans
    import org.apache.spark.ml.evaluation.ClusteringEvaluator
    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.sql.functions.col

    val allCols = trainCols:+labelCol

    val metaData = input
    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_")
    val assembled = assembler.transform(metaData)

    val kmeans = new KMeans().setK(categories).setSeed(seed).setFeaturesCol("features_").setPredictionCol("prediction")
    val model = kmeans.fit(dataset)

    model.clusterCenters.foreach(println)
  }
}
