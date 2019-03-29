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

val discretizer = new QuantileDiscretizer().setInputCol(aim).setOutputCol(newcol).setNumBuckets(5)

val result = discretizer.fit(df_).transform(df_)

result.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)

val fin = result.limit(20).toJSON.collectAsList.toString

val result = Http("http://10.122.240.131:5000/RunningPost").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
