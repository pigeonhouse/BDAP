import org.apache.spark.ml.feature.{MinMaxScaler, StandardScaler, VectorAssembler}
import org.apache.spark.ml.linalg.Vector
import org.apache.spark.sql.{Row, SaveMode}
import org.apache.spark.sql.functions.{col, monotonically_increasing_id}
import org.apache.spark.sql.types.{DoubleType, StructField, StructType}

import spark.implicits._

    val project = "Taitanic1"
    val id = "5"
    val previous = "4"
    val file = project + "/" + previous
    val aim = "Pclass Fare Age"

    var df = spark.read.format("json").load(file)
    val aimarray = aim.split(" ")
    var df_ = df

    for(i <- 0 to aimarray.length - 1){
      df_ = df.select(aimarray(i))
      val assembler = new VectorAssembler().setInputCols(Array(aimarray(i))).setOutputCol("scaled")
      df_ = assembler.transform(df_).drop(aimarray(i)).withColumnRenamed("scaled", aimarray(i))
      val scaler = new MinMaxScaler().setInputCol(aimarray(i)).setOutputCol("scaled" + aimarray(i))
      val scalerModel = scaler.fit(df_)
      df_ = scalerModel.transform(df_).drop(aimarray(i))
      val df_1 = df_.map{case Row(v: Vector) => v(0)}.toDF("MinMaxScaled" + aimarray(i)).withColumn("idx", monotonically_increasing_id())
      df = df.withColumn("idx", monotonically_increasing_id())
      df = df.join(df_1, df("idx") === df_1("idx")).drop("idx")
    }

    df.write.format("json")
      .mode(SaveMode.Append)
      .save(project + "/" + id)