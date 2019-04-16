import org.apache.spark.sql.{SQLContext, SaveMode}
import scalaj.http._

    val project = "Demo"
    val id = "%s"
    val previous = "%s"
    val aim = "%s"
    val file = project + "/" + previous

    val df = spark.read.format("parquet").load(file)
    val df_ = df.sort(aim)

    df_.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)

  val fin = df_.limit(20).toJSON.collectAsList.toString

  val result = Http("%s").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
