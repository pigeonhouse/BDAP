// scalastyle:off println

// $example on$
import org.apache.spark.ml.clustering.GaussianMixture
// $example off$
import org.apache.spark.sql.SparkSession

object GaussianMixtureExample {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession
        .builder
        .appName(s"${this.getClass.getSimpleName}")
        .getOrCreate()

    val parsedTrainingData = args(0)
    val outputModel = args(1)
    val numClusters = args(2).toInt
    val numIterations = args(3).toInt
    val seed = args(4).toLong

    // $example on$
    // Loads data
    val dataset = spark.read.format("libsvm").load(parsedTrainingData)

    // Trains Gaussian Mixture Model
    val gmm = new GaussianMixture()
      .setK(numClusters)
      .setMaxIter(numIterations)
      .setSeed(seed)

    val model = gmm.fit(dataset)

    // output parameters of mixture model model
    for (i <- 0 until model.getK) {
      println(s"Gaussian $i:\nweight=${model.weights(i)}\n" +
          s"mu=${model.gaussians(i).mean}\nsigma=\n${model.gaussians(i).cov}\n")
    }
    model.save(outputModel)

    // $example off$

    spark.stop()
  }
}
// scalastyle:on println
