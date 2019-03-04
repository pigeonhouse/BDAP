package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.sql.SQLContext

object OutputDataframe {
  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf()
      .setAppName("OutputDataframe")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val id = "456789"
    val previous = "54612a04"
    val project = "demo"
    val numRows = 20
    val file = "hdfs://localhost:9000/" + project + "/" + previous

    val df1 = SQLContext.read.format("json").load(file)
    df1.show(20)

    sc.stop()

  }
}
