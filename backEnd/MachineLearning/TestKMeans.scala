
object TestKMeans {
 
  def main(args: Array[String]){
    val para = Array(
      "data/mllib/sample_kmeans_data.txt",
      "hdfs://localhost:8020/spark/KMeansExample/"+s"${this.getClass.getSimpleName}",
      "2",
      "9",
      "0",
    )
    KMeansExample.main(para)
  }
}
