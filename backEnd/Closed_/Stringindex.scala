import org.apache.spark.ml.feature.StringIndexer
import org.apache.spark.sql.{SQLContext, SaveMode}
import scalaj.http._

    val project = "Demo"
    val id = "%s"
    val aim = "%s"
    val previous = "%s"
    val drop = false
    val file = project + "/" + previous

    val df = spark.read.parquet(file)
    var df_ = df
    val aimarray = aim.split(" ")

    for(aims <- aimarray){
      val indexer = new StringIndexer().setInputCol(aims).setOutputCol(s"${aims}Index")
      val indexerModel = indexer.fit(df_)
      df_ = indexerModel.transform(df_)
      if(drop == true){
        df_ = df_.drop(aims)
      }
    }

  df_.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)
  
var fin = df_.limit(20).toJSON.collectAsList.toString

val colname = df_.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

val result = Http("http://10.122.226.59:5000/RunningPost").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString

