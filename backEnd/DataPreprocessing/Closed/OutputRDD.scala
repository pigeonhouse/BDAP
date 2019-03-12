package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext

object OutputRDD {
  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf().setAppName("Output").set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    Engine.init

    //以下全为参数
    val id = "3"
    val previous = "2"
    val project = "demo"

    val result = sc.textFile("/home/hadoop/BigDL/" + project + "/" + previous)

    result.foreach(println)

    sc.stop()
  }
}
