import org.apache.spark.sql.functions._
import org.apache.spark.ml.feature.QuantileDiscretizer

val project = "Demo"
val id = "%s"
val aim = "%s"
val newcol = "%s"
val previous = "%s"
val NumBuckets = %s
val file = project + "/" + previous

var df = spark.read.format("parquet").load(file)
var df_ = df

val discretizer = new QuantileDiscretizer().setInputCol(aim).setOutputCol(newcol).setNumBuckets(NumBuckets)

val result = discretizer.fit(df_).transform(df_)

result.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)

var fin = result.limit(20).toJSON.collectAsList.toString

val colname = result.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

  val result = Http("http://10.122.226.59:5000/RunningPost").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
