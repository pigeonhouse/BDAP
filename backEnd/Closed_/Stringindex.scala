import org.apache.spark.ml.feature.StringIndexer
import org.apache.spark.sql.{SQLContext, SaveMode}
import scalaj.http._

    val project = "Demo"
    val id = "%s"
    val aim = "%s"
    val previous = "%s"
    val drop = false
    val file = project + "/" + previous

    val df = spark.read.format("parquet").load(file)
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
  
val fin = df_.limit(20).toJSON.collectAsList.toString

val result = Http("http://10.122.240.131:5000/RunningPost").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString

