object Fillna {

  val FillnaType: String = null
  val targetCols: Array[String] = null
  var input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import org.apache.spark.sql.functions._
    import org.apache.spark.sql.{Row, SaveMode}

    var df_ = input
    
    if (FillnaType == "average") {
      for (i <- 0 to targetCols.length - 1) {
        val temp = Array(targetCols(i))
        val meanval = df_.select(mean(targetCols(i))).collect()
        val meanvalue: Double = meanval(0)(0).toString.toDouble
        df_ = df_.na.fill(meanvalue, temp)
      }
    } else if (FillnaType == "median") {
      for (i <- 0 to targetCols.length - 1) {
        val temp = Array(targetCols(i))
        val df_1 = df_.select(targetCols(i)).na.drop().sort(targetCols(i))
        val count = df_1.count()
        if (count % 2 == 0) {
          val medianval = df_1.take(count.toInt / 2 + 1).drop(count.toInt / 2 - 1)
          val medianvalue = medianval.map(A => A.getDouble(0)).reduce(_ + _) / 2
          df_ = df_.na.fill(medianvalue, temp)
        } else {
          val medianval = df_1.take(count.toInt / 2 + 1).drop(count.toInt / 2)
          var medianvalue = medianval.map(A => A.getDouble(0))
          df_ = df_.na.fill(medianvalue(0), temp)
        }
      }
    } else if (FillnaType == "mode") {
      for (i <- 0 to targetCols.length - 1) {
        val temp = Array(targetCols(i))
        val usearray = df_.select(targetCols(i)).collect()
        var dataCount: Map[Row, Int] = Map()
        for (xi <- usearray) {
          if (!dataCount.contains(xi)) {
            dataCount += (xi -> 1)
          } else {
            var count = dataCount(xi)
            count += 1
            dataCount += (xi -> count)
          }
        }
        var dataSeq = dataCount.toSeq.sortBy(_._2)
        println(dataSeq)
        var (a, b) = dataSeq(dataSeq.length - 1)
        if (a(0) == null) {
          a = dataSeq(dataSeq.length - 2)._1
        }
        if (usearray(0)(0).getClass.getSimpleName == "String") {
          df_ = df_.na.fill(a(0).toString, temp)
        } else if (usearray(0)(0).getClass.getSimpleName == "Double") {
          df_ = df_.na.fill(a(0).toString.toDouble, temp)
        } else if (usearray(0)(0).getClass.getSimpleName == "Int") {
          df_ = df_.na.fill(a(0).toString.toDouble, temp)
        }
      }
    } else if (FillnaType == "min") {
      for (i <- 0 to targetCols.length - 1) {
        val temp = Array(targetCols(i))
        val minval = df_.select(min(targetCols(i))).collect()
        val minvalue: Double = minval(0)(0).toString.toDouble
        df_ = df_.na.fill(minvalue, temp)
      }
    } else if (FillnaType == "max") {
      for (i <- 0 to targetCols.length - 1) {
        val temp = Array(targetCols(i))
        val maxval = df_.select(max(targetCols(i))).collect()
        val maxvalue: Double = maxval(0)(0).toString.toDouble
        df_ = df_.na.fill(maxvalue, temp)
      }
    } else if (FillnaType == "drop") {
      df_ = df_.na.drop(targetCols)
    }

    val output = df_
//    output.show(20)

  }
}
