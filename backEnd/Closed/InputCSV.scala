package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.sql.{SQLContext, SaveMode}
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.types.DoubleType

object InputCSV {
  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf()
      .setAppName("InputCSV")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val file = "file:///home/hadoop/bigdl/src/train.csv"
    val project = "Taitanic"
    val id = "0"

    val df = SQLContext.load("com.databricks.spark.csv", Map("path" -> file, "header" -> "true"))

    df.write.format("json")
      .mode(SaveMode.Append)
      .save("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()

  }
}
