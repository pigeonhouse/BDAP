package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.ml.feature.{StandardScaler, VectorAssembler}
import org.apache.spark.mllib.linalg.Vector
import org.apache.spark.sql.{Row, SQLContext, SaveMode}
import org.apache.spark.sql.types.{DoubleType, StructField, StructType}
import org.apache.spark.sql.functions.monotonicallyIncreasingId

object StandardScaler {
  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf().setAppName("StandardScaler").set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "demo"
    val id = "3"
    val aim = "passengers"
    val previous = "2"
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    var df = SQLContext.read.format("json").load(file).withColumn("idx", monotonicallyIncreasingId())
    val aimarray = aim.split(" ")

    var df_ = df

    for(i <- 0 to aimarray.length - 1){
      df_ = df.select(aimarray(i))
      val assembler = new VectorAssembler().setInputCols(Array(aimarray(i))).setOutputCol("scaled")
      df_ = assembler.transform(df_).drop(aimarray(i)).withColumnRenamed("scaled", aimarray(i))
      val scaler = new StandardScaler().setInputCol(aimarray(i)).setOutputCol("scaled" + aimarray(i))
      val scalerModel = scaler.fit(df_)
      df_ = scalerModel.transform(df_).drop(aimarray(i))
      val df_1 = df_.map{case Row(v: Vector) => v(0)}.map(A => Row(A))
      val schema = StructType(List(StructField("StandardScaled" + aimarray(i), DoubleType, nullable = false)))
      df_ = SQLContext.createDataFrame(df_1, schema).withColumn("idx", monotonicallyIncreasingId())
      df = df.join(df_, df("idx") === df_("idx"))
    }

    df = df.drop("idx")

    df.write.format("json")
      .mode(SaveMode.Append)
      .save("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()

  }
}
