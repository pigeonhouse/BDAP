// scalastyle:off println

// $example on$
import org.apache.spark.ml.clustering.{KMeans, KMeansModel}
import org.apache.spark.ml.evaluation.ClusteringEvaluator
// $example off$
import org.apache.spark.sql.SparkSession

object KMeansExample {

  def main(args: Array[String]): Unit = {

    val parsedTrainingData = args(0)
    val outputModel = args(1)
    val numClusters = args(2).toInt
    val numIterations = args(3).toInt
    val seed = args(4).toLong

    val spark = SparkSession
      .builder
      .appName(s"${this.getClass.getSimpleName}")
      .getOrCreate()

    // $example on$
    // Loads data.
    val dataset = spark.read.format("libsvm").load(parsedTrainingData)

    // Trains a k-means model.
    val kmeans = new KMeans()
      .setK(numClusters)
      .setMaxIter(numIterations)
      .setSeed(seed)

    val model = kmeans.fit(dataset)

    // Make predictions
    val predictions = model.transform(dataset)

    // Evaluate clustering by computing Silhouette score
    val evaluator = new ClusteringEvaluator()

    val silhouette = evaluator.evaluate(predictions)
    println(s"Silhouette with squared euclidean distance = $silhouette")

    model.save(outputModel)

    // Shows the result.
    println("Cluster Centers: ")
    model.clusterCenters.foreach(println)
    // $example off$

    spark.stop()
  }
}
// scalastyle:on println
