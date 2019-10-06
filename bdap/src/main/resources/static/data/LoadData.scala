
object LoadData {
  val file: String = null

  def main(args: Array[String]): Unit = {
    val output = spark.read.format("csv").option("inferSchema", "true").option("header", "true").load(file)
    output.show(20)
  }
}