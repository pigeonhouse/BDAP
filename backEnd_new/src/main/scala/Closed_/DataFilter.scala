import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.functions._

val project = "Demo"
val id = "%s"
val newcol = "%s"
val previous = "%s"
val condition = "%s"
val file = project + "/" + previous

val df = spark.read.format("parquet").load(file).withColumn("idx", monotonically_increasing_id())
var df_ = df

var cols = df.columns
for(i <- 0 to cols.length - 1){
  cols(i) = cols(i) + "_"
}
cols = cols++:Array(newcol)

df_ = df_.filter(condition).withColumn(newcol, lit(1)).toDF(cols:_*)

df_ = df.join(df_, df("idx") === df_("idx_"), "left")

cols = df.columns++:Array(newcol)

df_ = df_.select(cols.map(A => col(A)): _*).na.fill(0).drop("idx")

df_.write.format("parquet").mode(SaveMode.Append).save(project + "/" + id)

var fin = df_.limit(20).toJSON.collectAsList.toString

val colname = df_.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

val result = Http("%s").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
