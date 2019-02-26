object TestGMM {
  def main(args: Array[String]){
    val para = Array(
      "data/mllib/sample_kmeans_data.txt",
      "hdfs://localhost:8020/spark/ModelExample/"+s"${this.getClass.getSimpleName}",
      "2",
      "9",
      "10",
    )

    GaussianMixtureExample.main(para)
  }

}
