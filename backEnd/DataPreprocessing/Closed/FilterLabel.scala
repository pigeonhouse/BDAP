package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.sql.{SQLContext, SaveMode}
import org.apache.spark.sql.functions._

object FilterLabel {

    def main(args: Array[String]): Unit = {
      val conf = Engine.createSparkConf()
        .setAppName("FilterLabel")
        .set("spark.task.maxFailures", "1")
      val sc = new SparkContext(conf)
      val SQLContext = new SQLContext(sc)
      Engine.init

      val project = "Taitanic"
      val id = "5"
      val newcol = "Mother"
      val previous = "4"
      val condition = "Age >= 18 and Parch >= 1"
      val idcol = "PassengerId"
      val file = "/home/hadoop/BigDL/" + project + "/" + previous

      val df = SQLContext.read.format("json").load(file)
      var df_ = df

      var cols = df.columns
      for(i <- 0 to cols.length - 1){
        cols(i) = cols(i) + "_"
      }
      cols = cols++:Array(newcol)

      df_ = df_.filter(condition).withColumn(newcol, lit(1)).toDF(cols:_*)

      df_ = df.join(df_, df(idcol) === df_(idcol + "_"), "left")
      cols = df.columns++:Array(newcol)
      df_ = df_.select(cols.map(A => col(A)): _*).na.fill(0)

      df_.write.format("json")
        .mode(SaveMode.Append)
        .save("/home/hadoop/BigDL/" + project + "/" + id)

      sc.stop()

    }
}
