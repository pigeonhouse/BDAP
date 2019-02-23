import spark.implicits._
import org.apache.spark.ml.feature.MinMaxScaler
import org.apache.spark.ml.linalg.Vectors
import org.apache.spark.ml.feature.VectorAssembler

/**
def get(url: String) = scala.io.Source.fromURL(url).mkString

var i = 0
while(i < 10){
    println(i)
    get(s"http://localhost:5000/realTime?loss=$i")
    Thread.sleep(2000)
    i+=1
}
**/


val df = spark.read.json("/examples/%s").na.fill(%d)
df.write.format("json").save("hdfs:///examples/%s")

//scaledData.write.format("json").save("hdfs:///examples/scaledData")


/**  

val assembler = new VectorAssembler().setInputCols(Array("age")).setOutputCol("new_age")
val output = assembler.transform(df)
val scaler = new MinMaxScaler().setInputCol("new_age").setOutputCol("scalar_age")
val scalerModel = scaler.fit(output)
val scaledData = scalerModel.transform(output)


val df = spark.createDataFrame(Seq(
            ("andy",0,-1.0),
            ("mike",1,1.0),
            ("jack",2,3.0)
            )).toDF("name","id", "age")
val assembler = new VectorAssembler().setInputCols(Array("age")).setOutputCol("new_age")
val output = assembler.transform(df)
output.show()


val df = spark.createDataFrame(Seq(
            (0, Vectors.dense(1.0, 0.1, -1.0)),
            (1, Vectors.dense(2.0, 1.1, 1.0)),
            (2, Vectors.dense(3.0, 10.1, 3.0))
            )).toDF("id", "age")
val scaler = new MinMaxScaler().setInputCol("age").setOutputCol("scalar_age")
val scalerModel = scaler.fit(df)
val scaledData = scalerModel.transform(df)
scaledData.show()

**/
