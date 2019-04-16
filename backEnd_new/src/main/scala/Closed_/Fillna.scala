import org.apache.spark.sql.{Row, SaveMode}
import org.apache.spark.sql.functions._
import scala.collection.mutable.ArrayBuffer
import scalaj.http._

    val project = "Demo"
    val id = "%s"
    val previous = "%s"
    val aim = "%s"
    val Type = "%s"
    val specify = 100
    val file = project + "/" + previous

    val df = spark.read.format("parquet").load(file)
    val aimarray = aim.split(" ")
    var df_ = df

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
    }else if(Type == "specifynum"){
      df_ = df_.na.fill(specify, aimarray)
    }

    df_.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)

  var fin = df_.limit(20).toJSON.collectAsList.toString

val colname = df_.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

  val result = Http("http://10.128.237.90:5000/RunningPost").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
