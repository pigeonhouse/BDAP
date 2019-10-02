import org.apache.spark
import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.SparkSession

val userId = "%s"
val id = "%s"
val file = "%s"

val df_ = spark.read.format("csv").option("header","true").option("inferSchema", true).load(file)

val df_%s = df_

df_.write.format("parquet").mode(SaveMode.Overwrite).save(userId + "/" + id)

val fin = df_.limit(100).toJSON.collectAsList.toString

val colname = df_.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
var json = colname.mkString(start,", ",end) + "}, "

json = "[" + json ++ fin_ + "]"