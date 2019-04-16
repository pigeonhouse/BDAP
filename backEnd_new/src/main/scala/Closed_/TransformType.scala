import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.{DataFrame, Row, SQLContext, SaveMode}
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.functions.monotonically_increasing_id
import org.apache.spark.sql.types._
import scalaj.http._

val project = "Demo"
val id = "%s"
val aim = "%s"
val previous = "%s"
val targetType = "%s"
val file = project + "/" + previous

val df = spark.read.format("parquet").load(file)
var df_ = df

val source = df.columns

val arrayaim = aim.split(" ")
val arraytarget = targetType.split(" ")

var dfbeta = df.withColumn("idx", monotonically_increasing_id())

for(i <- 0 to arrayaim.length - 1){
      dfbeta = dfbeta.drop(arrayaim(i))
}

for(i <- 0 to arrayaim.length - 1){
  
    dfbeta = dfbeta.withColumn("idx", monotonically_increasing_id())

    if(arraytarget(i) == "number"){
      df_ = df.select(col(arrayaim(i)).cast(DoubleType)).toDF(arrayaim(i))
    }else if(arraytarget(i) == "Stringtype"){
      df_ = df.select(aim.split(" ").map(name => col(name).cast(StringType)): _*).toDF(aim.split(" "):_*)
    }else if(arraytarget(i) == "Integertype"){
      df_ = df.select(aim.split(" ").map(name => col(name).cast(IntegerType)): _*).toDF(aim.split(" "):_*)
    }
    df_ = df_.withColumn("idx", monotonically_increasing_id())
    
    dfbeta = dfbeta.join(df_, dfbeta("idx") === df_("idx")).drop("idx")
}

  var result_ = dfbeta
    
  result_ = result_.select(source.map(A => col(A)): _*)

  result_.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)

  var fin = result_.limit(20).toJSON.collectAsList.toString

val colname = result_.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

  val result = Http("%s").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
