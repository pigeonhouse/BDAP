import spark.implicits._
import org.apache.spark.ml.feature.MinMaxScaler
import org.apache.spark.ml.linalg.Vectors
import org.apache.spark.ml.feature.VectorAssembler

val df = spark.read.json("/examples/%s")

val assembler = new VectorAssembler().setInputCols(Array("age")).setOutputCol("new_age")

val output = assembler.transform(df)

val scaler = new MinMaxScaler().setInputCol("new_age").setOutputCol("scaled_age")

val scalerModel = scaler.fit(output)

val scaledData = scalerModel.transform(output)

scaledData.show()

scaledData.write.format("json").save("hdfs:///examples/%s")


