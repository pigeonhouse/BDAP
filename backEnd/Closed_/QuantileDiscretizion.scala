import org.apache.spark.sql.functions._
import org.apache.spark.ml.feature.QuantileDiscretizer

val project = "Taitanic"
val id = "4"
val aim = "Age"
val newcol = "AgeIndex"
val previous = "3"
val file = project + "/" + previous

val df = spark.read.format("json").load(file)
var df_ = df

val discretizer = new QuantileDiscretizer()
      .setInputCol(aim)
      .setOutputCol(newcol)
      .setNumBuckets(5)

val result = discretizer.fit(df_).transform(df_)

result.write.format("json")
        .mode(SaveMode.Append)
        .save(project + "/" + id)
