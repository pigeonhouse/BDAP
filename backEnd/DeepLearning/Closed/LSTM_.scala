package com.intel.analytics.bigdl.Closed

import com.intel.analytics.bigdl.dataset.Sample
import com.intel.analytics.bigdl.nn.MSECriterion
import com.intel.analytics.bigdl.nn.keras.{Dense, LSTM, Sequential}
import com.intel.analytics.bigdl.optim.Adam
import com.intel.analytics.bigdl.tensor.Tensor
import com.intel.analytics.bigdl.utils.{Engine, Shape}
import org.apache.spark.SparkContext
import org.apache.spark.mllib.linalg.Vector
import org.apache.spark.sql.{Row, SQLContext}

import scala.collection.mutable.ArrayBuffer

object LSTM_ {
  def main(args: Array[String]): Unit = {

    val conf = Engine.createSparkConf().setAppName("LSTM_").set("spark.task.maxFailures", "1")
    val sc = new SparkContext(conf)
    val SQLContext = new SQLContext(sc)
    Engine.init

    val learningRate = 0.01
    val learningRateDecay = 0.0
    val look_back = 10
    val project = "demo"
    val id = "2"
    val previous = "1"
    val batchSize = 133
    val Maxepoch = 1000
    val file = "/home/hadoop/BigDL/" + project + "/" + previous

    val df1 = SQLContext.read.format("json").load(file)
    val df_1 = df1.rdd.map{case Row(v: Double) => v}
    val df_ = df_1.collect()
    val count = df_1.count().toInt

    val dataT = new ArrayBuffer[(Array[Double], Array[Double])]()
    for( i <- 1 to count - look_back - 1){
      dataT.insert(i - 1, (df_.take(i - 1 + look_back).drop(i - 1), df_.take(i + look_back).drop(i - 1 + look_back)))
    }
    val trainT = dataT.toArray
    val trainT_ = sc.parallelize(trainT)
    val train = trainT_.map(A => Sample(Tensor[Double](A._1, Array(1, A._1.length)), Tensor[Double](A._2, Array(1))))

    val optimMethod = new Adam[Double](learningRate = learningRate,
      learningRateDecay = learningRateDecay)

    val criterion = MSECriterion[Double]()

    val model = Sequential[Double]()
    model.add(LSTM(256, inputShape=Shape(1, look_back), activation = "sigmoid", returnSequences = true))
    model.add(LSTM(256))
    model.add(Dense(1))

    model.compile(optimMethod, criterion, null)

    model.fit(train, batchSize, Maxepoch)

    val result = model.predict(train)

    result.saveAsTextFile("/home/hadoop/BigDL/" + project + "/" + id)

    sc.stop()

  }
}
