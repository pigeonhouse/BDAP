import org.apache.spark.ml.feature.{OneHotEncoderEstimator, StringIndexer, VectorAssembler}
import org.apache.spark.mllib.linalg.{SparseVector, Vectors}
import org.apache.spark.sql.functions.monotonically_increasing_id
import org.apache.spark.sql.types.{ArrayType, DoubleType, StructField, StructType}
import org.apache.spark.sql.Row
import org.apache.spark.sql.functions.col

    val project = "Taitanic1"
    val id = "1"
    val aim = "Pclass Sex"
    val previous = "0"
    val file = project + "/" + previous

    val df = spark.read.format("json").load(file)
    var df_ = df
    val aimarray = aim.split(" ")

    for(i <- 0 to aimarray.length - 1){
      val indexer = new StringIndexer().setInputCol(aimarray(i)).setOutputCol(s"${aimarray(i)}Index")
      val indexerModel = indexer.fit(df_)
      df_ = indexerModel.transform(df_)
    }
    
    val encoder = new OneHotEncoderEstimator().setInputCols(aimarray.map(A => A + "Index")).setOutputCols(aimarray.map(A => A + "classVec"))
    val model = encoder.fit(df_)
    df_ = model.transform(df_)

    for(i <- 0 to aimarray.length - 1){
      df_ = df_.drop(aimarray(i) + "Index")
    }

    df_.show(false)

    df_.write.format("json")
        .mode(SaveMode.Append)
        .save(project + "/" + id)
  