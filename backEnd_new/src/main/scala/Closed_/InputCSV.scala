import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.functions.col

val file = "/FileStore/tables/train.csv"
val project = "T1"
val id = "0"

val df = spark.read.format("csv").option("header","true").option("multiLine", true).load(file)

df.write.format("parquet")
    .mode(SaveMode.Append)
    .save(project + "/" + id)