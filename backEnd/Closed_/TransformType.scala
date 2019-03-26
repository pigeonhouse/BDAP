import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.{DataFrame, Row, SQLContext, SaveMode}
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.functions.monotonically_increasing_id
import org.apache.spark.sql.types._


val project = "Demo"
val id = "%s"
val aim = "%s"
val previous = "%s"
val targetType = "%s"
val file = project + "/" + previous

val df = spark.read.format("parquet").load(file)
var df_ = df

    if(targetType == "Doubletype"){
      df_ = df.select(aim.split(" ").map(name => col(name).cast(DoubleType)): _*).toDF(aim.split(" "):_*)
    }
    else if(targetType == "Stringtype"){
      df_ = df.select(aim.split(" ").map(name => col(name).cast(StringType)): _*).toDF(aim.split(" "):_*)
    }
    else if(targetType == "Integertype"){
      df_ = df.select(aim.split(" ").map(name => col(name).cast(IntegerType)): _*).toDF(aim.split(" "):_*)
    }

    var dfbeta = df
    val aimarray = aim.split(" ")
    for(i <- 0 to aimarray.length - 1){
      dfbeta = dfbeta.drop(aimarray(i))
    }

    dfbeta = dfbeta.withColumn("idx", monotonically_increasing_id())
    df_ = df_.withColumn("idx", monotonically_increasing_id())

    val result = dfbeta.join(df_, dfbeta("idx") === df_("idx")).drop("idx")

    result.write.format("parquet").mode(SaveMode.Overwrite).save(project + "/" + id)