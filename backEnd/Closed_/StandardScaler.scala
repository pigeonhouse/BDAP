import org.apache.spark.ml.feature.{StandardScaler, VectorAssembler}
import org.apache.spark.ml.linalg.Vector
import org.apache.spark.sql.{Row, SaveMode}
import org.apache.spark.sql.functions.monotonically_increasing_id

    val project = "Taitanic1"
    val id = "5"
    val aim = "Fare Age"
    val previous = "4"
    val file = project + "/" + previous

    var df = spark.read.format("json").load(file).withColumn("idx", monotonically_increasing_id())
    val aimarray = aim.split(" ")

    var df_ = df

    for(i <- 0 to aimarray.length - 1){
      df_ = df.select(aimarray(i))
      val assembler = new VectorAssembler().setInputCols(Array(aimarray(i))).setOutputCol("scaled")
      df_ = assembler.transform(df_).drop(aimarray(i)).withColumnRenamed("scaled", aimarray(i))
      val scaler = new StandardScaler().setInputCol(aimarray(i)).setOutputCol("scaled" + aimarray(i))
      val scalerModel = scaler.fit(df_)
      df_ = scalerModel.transform(df_).drop(aimarray(i))
      df_ = df_.map{case Row(v: Vector) => v(0)}.toDF("StandardScaled" + aimarray(i)).withColumn(s"idx${i}", monotonically_increasing_id())
      df = df.join(df_, df("idx") === df_(s"idx${i}")).drop(s"idx${i}")
    }
    df = df.drop("idx")


    df.write.format("json")
      .mode(SaveMode.Append)
      .save(project + "/" + id)