object GenerateNewCol{

  val input: DataFrame = null
  val sqlSentence: String = null

  def main(args: Array[String]): Unit = {
    import scala.collection.mutable.Stack
    import org.apache.spark.sql.functions.col
    import org.apache.spark.sql.types._

    val udf_mul = udf((s: Double, t: Double) => s * t)
    val udf_add = udf((s: Double, t: Double) => s + t)
    val udf_sub = udf((s: Double, t: Double) => s - t)
    val udf_div = udf((s: Double, t: Double) => s / t)

    var metaData = input
    val operateArray = Array("+", "-", "*", "/")
    val priorityArray = Array(0, 0, 1, 1)

//    val sqlSentence = "newCol = - + Religious * Theatre + Shopping Picnic Nature"

    val sqlWords = sqlSentence.split(" ")
    val sqlLength = sqlWords.length - 1

    val stack = Stack[String]()

    val newColName = sqlWords(0)

    for(i <- 0 until sqlLength - 1){
      if(operateArray.contains(sqlWords(sqlLength - i))){
        val col1 = stack.pop()
        val col2 = stack.pop()

        val operator = sqlWords(sqlLength - i)
        metaData = operator match {
          case "+" => metaData.withColumn(newColName, udf_add(col(col1), col(col2)).cast(DoubleType))
          case "-" => metaData.withColumn(newColName, udf_sub(col(col1), col(col2)).cast(DoubleType))
          case "*" => metaData.withColumn(newColName, udf_mul(col(col1), col(col2)).cast(DoubleType))
          case "/" => metaData.withColumn(newColName, udf_div(col(col1), col(col2)).cast(DoubleType))
        }
        stack.push(newColName)
      }
      else{
        stack.push(sqlWords(sqlLength - i))
      }
    }
    val output = metaData
  }
}
