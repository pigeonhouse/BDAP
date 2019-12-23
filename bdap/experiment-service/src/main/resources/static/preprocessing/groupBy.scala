object groupBy {
  def main(args: Array[String]): Unit = {
    import org.apache.spark.sql.functions._

    val metaData = input

    val groupByColumn = "Survived Sex"
    val groupByList = groupByColumn.split(" ")

    val aggregateColumn = "avg(Age) sum(Fare)"
    val aggregateList = aggregateColumn.split(" ")

    val result = metaData.groupBy(groupByList.map(column => col(column)): _*).agg()

    
  }
}
