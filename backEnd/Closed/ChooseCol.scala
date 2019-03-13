package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.sql.{SQLContext, SaveMode}
import org.apache.spark.sql.functions.col

object ChooseCol {
  def main(args: Array[String]): Unit = {
    val conf = Engine.createSparkConf()
      .setAppName("ChooseCol")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "Taitanic"
    val id = "1"
    val aim = "PassengerId Name Age Sex Parch Pclass"
    val previous = "0"
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    val df = SQLContext.read.format("json").load(file)
    val aimarray = aim.split(" ")

    var df_ = df
    df_ = df_.select(aimarray.map(A => col(A)): _*)

    df_.write.format("json")
      .mode(SaveMode.Append)
      .save("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()

  }
}
