import org.apache.spark.sql.SaveMode
import scalaj.http._
import org.apache.spark.sql.functions.col

val project = "Demo"
val id = "%s"
val file = "/demoData/train_demo.csv"

val df = spark.read.format("csv").option("header", "true").option("multiLine", true).load(file)

df.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)