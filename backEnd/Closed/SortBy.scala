package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.sql.{SQLContext, SaveMode}

object SortBy{
  def main(args: Array[String]): Unit = {
    val conf = Engine.createSparkConf()
      .setAppName("SortBy")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "Taitanic"
    val id = "6"
    val previous = "5"
    val aim = "PassengerId"
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    val df = SQLContext.read.format("json").load(file)
    val df_ = df.sort(aim)

    df_.write.format("json")
      .mode(SaveMode.Append)
      .save("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()

  }
}
