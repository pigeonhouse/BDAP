object TestLogisticR {
  def main(args: Array[String]) {
    val para = Array(
      "data/mllib/sample_libsvm_data.txt",
      "hdfs://localhost:8020/spark/ModelExample/" + s"${this.getClass.getSimpleName}",
      "2",
      "0.3",
      "0.8",
    )
    LogisticRegressionSummaryExample.main(para)
  }
}
