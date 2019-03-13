package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.sql.functions._
import org.apache.spark.SparkContext
import org.apache.spark.sql.types.{DoubleType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, Row, SQLContext, SaveMode}

object Classify{
  def main(args: Array[String]): Unit = {
    val conf = Engine.createSparkConf()
      .setAppName("Classify")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "Taitanic"
    val id = "4"
    val aim = "Age"
    val newcol = "AgeIndex"
    val idcol = "PassengerId"
    val partition = "8 18 30 60"
    val previous = "3"
    val linear = true
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    var df = SQLContext.read.format("json").load(file).withColumn("idx", monotonicallyIncreasingId())
    var df_ = df
    val partition_ = partition.split(" ").map(A => A.toInt)

    var c = 1
    var colname = ""
    for(i <- 0 to partition_.length){
      if(linear == true){
        c = i
      }
      else{
        c = 1
      }
      if(i == 0){
        df_ = df.filter(s"${aim} < ${partition_(i)}")
          .withColumn(newcol, lit(c))
        colname = s"${aim} < ${partition_(i)}"
      }
      else if(i == partition_.length){
        df_ = df.filter(s"${aim} >= ${partition_(i - 1)}")
          .withColumn(newcol, lit(c))
        colname = s"${aim} >= ${partition_(i - 1)}"
      }
      else {
        df_ = df.filter(s"${aim} >= ${partition_(i - 1)} and ${aim} < ${partition_(i)}")
          .withColumn(newcol, lit(c))
        colname = s"${partition_(i - 1)} <= ${aim} < ${partition_(i)}"
      }
      if(linear == true){
        df_ = df_.drop("idx")
        df_.write.format("json")
          .mode(SaveMode.Append)
          .save("/home/hadoop/BigDL/" + project + "/" + id)
      }
      else{
        var cols = df.columns
        for(i <- 0 to cols.length - 1){
          cols(i) = cols(i) + "_"
        }
        cols = cols++:Array(colname)

        df_ = df_.toDF(cols:_*)
        df_ = df.join(df_, df(idcol) === df_(idcol + "_"), "left")
        cols = df.columns++:Array(colname)
        df = df_.select(cols.map(A => col(A)): _*).na.fill(0)
      }
    }
    if(linear == false){
      df = df.sort("idx").drop("idx")

      df.write.format("json")
        .mode(SaveMode.Append)
        .save("/home/hadoop/BigDL/" + project + "/" + id)
    }

    sc.stop()

  }
}
