object KMeans {

  val trainCols: Array[String] = null
  val predictName: String = null
  val seed: Int = null
  val input: DataFrame = null
  val categories: Int = null
  val maxIter: Int = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.clustering.KMeans
    import org.apache.spark.ml.clustering.KMeansModel
    import org.apache.spark.ml.linalg.Vector
    import org.apache.spark.ml.evaluation.ClusteringEvaluator
    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.sql.functions.col
    import java.util
    import com.alibaba.fastjson.JSONObject

    val metaData = input
    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_")
    val assembled = assembler.transform(metaData)

    val kmeans = new KMeans().setK(categories).setSeed(seed).setFeaturesCol("features_").setPredictionCol(predictName).setMaxIter(maxIter)
    val Model = kmeans.fit(assembled)

    val centers = Model.clusterCenters

    var centerlist: util.List[Any] = new util.ArrayList[Any]()


    println(centers.length)
    for(i <- 0 until centers.length){
      var map = new util.HashMap[String, Double]()
      for(j <- 0 until centers(i).size){
        map.put(trainCols(j), centers(i)(j))
      }
      centerlist.add(map)
    }

    val jsonObject = new JSONObject()
    jsonObject.put("centerlist", centerlist)
    val jsonString = jsonObject.toJSONString
    println(jsonString)
  }
}
