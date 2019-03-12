package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.sql.{Row, SQLContext, SaveMode}
import org.apache.spark.sql.functions._

import scala.collection.mutable.ArrayBuffer

object Fillna{
  def main(args: Array[String]): Unit = {
    val conf = Engine.createSparkConf()
      .setAppName("Fillna")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "Taitanic"
    val id = "2"
    val previous = "1"
    val aim = "Age"
    val Type = "median"
    val specify = 100
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    val df = SQLContext.read.format("json").load(file)
    val aimarray = aim.split(" ")
    var df_ = df

    if(Type == "mean"){
      for(i <- 0 to aimarray.length - 1){
        val temp = Array(aimarray(i))
        val meanval = df.select(mean(aimarray(i))).collect()
        val meanvalue: Double = meanval(0)(0).toString.toDouble
        df_ = df_.na.fill(meanvalue, temp)
      }
    }
    else if(Type == "median"){
      for(i <- 0 to aimarray.length - 1){
        val temp = Array(aimarray(i))
        val df_1 = df.select(aimarray(i)).na.drop().sort(aimarray(i))
        val count = df_1.count()
        if(count%2 == 0){
          val medianval = df_1.take(count.toInt/2 + 1).drop(count.toInt/2 - 1)
          val medianvalue = medianval.map(A => A.getDouble(0)).reduce(_ + _)/2
          df_ = df_.na.fill(medianvalue, temp)
        }
        else{
          val medianval = df_1.take(count.toInt/2 + 1).drop(count.toInt/2)
          var medianvalue = medianval.map(A => A.getDouble(0))
          df_ = df_.na.fill(medianvalue(0), temp)
        }
      }
    }
    else if(Type == "min"){
      for(i <- 0 to aimarray.length - 1){
        val temp = Array(aimarray(i))
        val minval = df.select(min(aimarray(i))).collect()
        val minvalue: Double = minval(0)(0).toString.toDouble
        df_ = df_.na.fill(minvalue, temp)
      }
    }
    else if(Type == "max"){
      for(i <- 0 to aimarray.length - 1){
        val temp = Array(aimarray(i))
        val maxval = df.select(max(aimarray(i))).collect()
        val maxvalue: Double = maxval(0)(0).toString.toDouble
        df_ = df_.na.fill(maxvalue, temp)
      }
    }
    else if(Type == "drop"){
      df_ = df_.na.drop(aimarray)
    }
    else if(Type == "specifynum"){
      df_ = df_.na.fill(specify, aimarray)
    }

    df_.write.format("json")
      .mode(SaveMode.Append)
      .save("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()
  }
}
