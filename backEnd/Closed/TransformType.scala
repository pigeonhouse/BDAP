package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.{DataFrame, Row, SQLContext, SaveMode}
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.functions.monotonicallyIncreasingId
import org.apache.spark.sql.types._

object TransformType{
  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf()
      .setAppName("TranformType")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "Taitanic"
    val id = "7"
    val aim = "Fare Pclass Survived"
    val previous = "6"
    val targetType = "Doubletype"
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    val df = SQLContext.read.format("json").load(file)
    var df_ = df

    if(targetType == "Doubletype"){
      df_ = df.select(aim.split(" ").map(name => col(name).cast(DoubleType)): _*).toDF(aim.split(" "):_*)
    }
    else if(targetType == "Stringtype"){
      df_ = df.select(aim.split(" ").map(name => col(name).cast(StringType)): _*).toDF(aim.split(" "):_*)
    }
    else if(targetType == "Integertype"){
      df_ = df.select(aim.split(" ").map(name => col(name).cast(IntegerType)): _*).toDF(aim.split(" "):_*)
    }

    var dfbeta = df
    val aimarray = aim.split(" ")
    for(i <- 0 to aimarray.length - 1){
      dfbeta = dfbeta.drop(aimarray(i))
    }

    dfbeta = dfbeta.withColumn("idx", monotonicallyIncreasingId())
    df_ = df_.withColumn("idx", monotonicallyIncreasingId())

    val result = dfbeta.join(df_, dfbeta("idx") === df_("idx")).drop("idx")

    result.write.format("json")
      .mode(SaveMode.Append)
      .save("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()

  }
}
