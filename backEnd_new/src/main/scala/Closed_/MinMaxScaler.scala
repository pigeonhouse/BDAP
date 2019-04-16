import org.apache.spark.ml.feature.{MinMaxScaler, StandardScaler, VectorAssembler}
import org.apache.spark.ml.linalg.Vector
import org.apache.spark.sql.{Row, SaveMode}
import scalaj.http._
import org.apache.spark.sql.functions.{col, monotonically_increasing_id}
import org.apache.spark.sql.types.{DoubleType, StructField, StructType}

import spark.implicits._

    val project = "Demo"
    val id = "%s"
    val previous = "%s"
    val file = project + "/" + previous
    val aim = "%s"

    var df = spark.read.format("parquet").load(file)
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

    df.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)

  var fin = df.limit(20).toJSON.collectAsList.toString

val colname = df.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

  val result = Http("http://10.128.237.90:5000/RunningPost").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
