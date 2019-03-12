package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.utils.Engine
import org.apache.spark.SparkContext
import org.apache.spark.ml.feature.{OneHotEncoder, StringIndexer, VectorAssembler}
import org.apache.spark.mllib.linalg.{SparseVector, Vectors}
import org.apache.spark.sql.functions.monotonicallyIncreasingId
import org.apache.spark.sql.types.{ArrayType, DoubleType, StructField, StructType}
import org.apache.spark.sql.{Row, SQLContext}

object OneHotEncoding {
  def main(args: Array[String]): Unit = {
    val conf = Engine.createSparkConf()
      .setAppName("OneHotEncoding")
      .set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val project = "Taitanic"
    val id = "4"
    val aim = "Pclass"
    val previous = "3"
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    val df = SQLContext.read.format("json").load(file)
    var df_ = df
    val aimarray = aim.split(" ")

    val indexer = new StringIndexer().setInputCol(aim).setOutputCol(s"${aim}Index")
    val indexerModel = indexer.fit(df_)
    df_ = indexerModel.transform(df_)

    val encoder = new OneHotEncoder().setInputCol(s"${aim}Index").setOutputCol(s"${aim}classVec")
    df_ = encoder.transform(df_)

    val df1 = df_.select(s"${aim}classVec")
    val result = df1.map{case Row(v: SparseVector) => v.toDense}.map(A => Row(A))

    //result.foreach(println)
    /*
    val assembler = new VectorAssembler().setInputCols(Array(s"${aim}classVec")).setOutputCol(s"${aim}OneHotEncode")
    df_ = assembler.transform(df_)
    */

    df_.show(false)

    sc.stop()
  }
}
