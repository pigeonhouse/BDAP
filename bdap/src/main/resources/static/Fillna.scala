import org.apache.spark.sql.{Row, SaveMode}
import org.apache.spark.sql.functions._
import scala.collection.mutable.ArrayBuffer
import scalaj.http._

val userId = "%s"
val id = "%s"
val aim = "%s"
val Type = "%s"

val aimarray = aim.split(" ")
var df_ = df_%s

if(Type == "average"){
  for(i <- 0 to aimarray.length - 1){
    val temp = Array(aimarray(i))
    val meanval = df.select(mean(aimarray(i))).collect()
    val meanvalue: Double = meanval(0)(0).toString.toDouble
    df_ = df_.na.fill(meanvalue, temp)
  }
}else if(Type == "median"){
  for(i <- 0 to aimarray.length - 1){
    val temp = Array(aimarray(i))
    val df_1 = df.select(aimarray(i)).na.drop().sort(aimarray(i))
    val count = df_1.count()
    if(count %% 2 == 0){
      val medianval = df_1.take(count.toInt/2 + 1).drop(count.toInt/2 - 1)
      val medianvalue = medianval.map(A => A.getDouble(0)).reduce(_ + _)/2
      df_ = df_.na.fill(medianvalue, temp)
    }else{
      val medianval = df_1.take(count.toInt/2 + 1).drop(count.toInt/2)
      var medianvalue = medianval.map(A => A.getDouble(0))
      df_ = df_.na.fill(medianvalue(0), temp)
    }
  }
}else if(Type == "mode"){
  for(i <- 0 to aimarray.length - 1){
    val temp = Array(aimarray(i))
    val usearray = df.select(aimarray(i)).collect()
    var dataCount : Map[Row, Int] = Map()
    for (xi <- usearray) {
      if (!dataCount.contains(xi) ) {
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
    if(a(0) == null){
      a = dataSeq(dataSeq.length - 2)._1
    }
    if(usearray(0)(0).getClass.getSimpleName == "String"){
      df_ = df_.na.fill(a(0).toString, temp)
    }else if(usearray(0)(0).getClass.getSimpleName == "Double"){
      df_ = df_.na.fill(a(0).toString.toDouble, temp)
    }else if(usearray(0)(0).getClass.getSimpleName == "Int"){
      df_ = df_.na.fill(a(0).toString.toDouble, temp)
    }
  }
}else if(Type == "min"){
  for(i <- 0 to aimarray.length - 1){
    val temp = Array(aimarray(i))
    val minval = df.select(min(aimarray(i))).collect()
    val minvalue: Double = minval(0)(0).toString.toDouble
    df_ = df_.na.fill(minvalue, temp)
  }
}else if(Type == "max"){
  for(i <- 0 to aimarray.length - 1){
    val temp = Array(aimarray(i))
    val maxval = df.select(max(aimarray(i))).collect()
    val maxvalue: Double = maxval(0)(0).toString.toDouble
    df_ = df_.na.fill(maxvalue, temp)
  }
}else if(Type == "drop"){
  df_ = df_.na.drop(aimarray)
}

df_.write.format("parquet").mode(SaveMode.Overwrite).save(userId + "/" + id)

val df_%s = df_

var fin = df_.limit(100).toJSON.collectAsList.toString

val colname = df_.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"