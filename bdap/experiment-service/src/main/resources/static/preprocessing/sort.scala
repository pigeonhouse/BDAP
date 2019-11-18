object sort {
  val input: DataFrame = null
  val sortCol: Array[String] = null
  val ascCol: Array[String] = null
  val descCol: Array[String] = null
  def main(args: Array[String]): Unit = {
    import org.apache.spark.sql.DataFrame
    import org.apache.spark.sql.functions._

    val df:DataFrame = input
    val output = df.sort(sortCol.map( c => if(ascCol.contains(c)) col(c) else col(c).desc):_*)

  }
}