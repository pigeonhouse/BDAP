object TestLinearR {
  def main(args: Array[String]) {
    val para = Array(
      "data/mllib/sample_linear_regression_data.txt",
      "hdfs://localhost:8020/spark/ModelExample/" + s"${this.getClass.getSimpleName}",
      "10",
      "0.3",
      "0.8",
    )
    LinearRegressionWithElasticNetExample.main(para)
  }
}
