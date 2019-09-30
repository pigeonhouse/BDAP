import org.apache.spark.ml.feature.{MinMaxScaler, StandardScaler, VectorAssembler, Normalizer, MaxAbsScaler}
import org.apache.spark.sql.{Row, SaveMode}
import org.apache.spark.sql.types._
import spark.implicits._

val userId = "%s"
val id = "%s"
val aim = "%s"
val Type = "%s"

val aimarray = aim.split(" ")
var df_ = df_%s

val assembler = new VectorAssembler().setInputCols(aimarray).setOutputCol("features")
df_ = assembler.transform(df_)

if(Type == "Normal"){
  val scaler = new Normalizer().setInputCol("features").setOutputCol("NormFeatures").setP(1.0)
  df_ = scaler.transform(df_)
} else{
  val scaler = Type match{
    case "MinMax" => new MinMaxScaler().setInputCol("features").setOutputCol("MinMaxFeatures")
    case "Standord" => new StandardScaler().setInputCol("features").setOutputCol("StardardFeatures")
    case "MaxAbs" => new MaxAbsScaler().setInputCol("features").setOutputCol("MaxAbsFeatures")
  }
  val scalerModel = scaler.fit(df_)
  df_ = scalerModel.transform(df_)
}

df_.write.format("parquet").mode(SaveMode.Overwrite).save(userId + "/" + id)

val df_%s = df_

var fin = df.limit(20).toJSON.collectAsList.toString

val colname = df.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"