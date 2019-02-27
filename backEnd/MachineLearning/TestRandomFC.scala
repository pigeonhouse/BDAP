object TestRandomFC {
  def main(args: Array[String]) {
    val para = Array(
      "data/mllib/sample_libsvm_data.txt",
      "hdfs://localhost:8020/spark/ModelExample/" + s"${this.getClass.getSimpleName}",
      "4",
      "10",
    )

    RandomForestClassifierExample.main(para)
  }
}
