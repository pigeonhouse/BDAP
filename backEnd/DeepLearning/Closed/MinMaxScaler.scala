package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.ml.feature.{MinMaxScaler, VectorAssembler}
import org.apache.spark.mllib.linalg.Vector
import org.apache.spark.sql.{Row, SQLContext, SaveMode}
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.types.{DoubleType, StructField, StructType}

object MinMaxScaler {

  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf().setAppName("MinMaxScaler").set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    import SQLContext.implicits._
    case class Person(name: String, age: Int)

    val project = "demo"
    val id = "1"
    val previous = "0"
    val file = "/home/hadoop/BigDL/" + project + "/" + previous
    val aim = "passengers"

    val df1 = SQLContext.read.format("json").load(file)
    val assembler = new VectorAssembler().setInputCols(Array(aim)).setOutputCol("scaledFeatures")
    val Data = assembler.transform(df1.na.drop)

    val scaler = new MinMaxScaler().setInputCol("scaledFeatures").setOutputCol("MinMax")
    val scalerModel = scaler.fit(Data)
    val scaledData = scalerModel.transform(Data)
    val scaledData_ = scaledData.select(col("MinMax"))
    val df_1 = scaledData_.map{case Row(v: Vector) => v(0)}.map(A => Row(A))

    val schema = StructType(List(StructField("MinMax", DoubleType, nullable = false)))
    val df = SQLContext.createDataFrame(df_1, schema)

    df.write.format("json")
      .mode(SaveMode.Append)
      .save("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()

  }
}
