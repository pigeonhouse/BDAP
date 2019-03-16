package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.ml.feature.StringIndexer
import org.apache.spark.sql.{SQLContext, SaveMode}

object Stringindex{
  def main(args: Array[String]): Unit = {
    val conf = Engine.createSparkConf()
      .setAppName("StringIndex")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "Taitanic"
    val id = "3"
    val aim = "Sex"
    val previous = "2"
    val drop = true
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    val df = SQLContext.read.format("json").load(file)
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

    df_.write.format("json")
      .mode(SaveMode.Append)
      .save("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()

  }
}
