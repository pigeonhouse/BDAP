object Merge {

  val input: DataFrame = null
  val newColName: String = null
  val dataCol: Array[String] = null
  val refCol: Array[String] = null

  def main(args: Array[String]): Unit = {
    // groupby并将结果合并到一个list中并去重
    val output = input.groupBy(col(refCol(0))).agg(collect_set(col(dataCol(0))) as newColName)
  }
}
