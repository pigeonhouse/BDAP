import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.functions._

      val project = "Taitanic1"
      val id = "4"
      val newcol = "Mother"
      val previous = "3"
      val condition = "Age >= 18 and Parch >= 1"
      val idcol = "PassengerId"
      val file = project + "/" + previous

      val df = spark.read.format("json").load(file)
      var df_ = df

      var cols = df.columns
      for(i <- 0 to cols.length - 1){
        cols(i) = cols(i) + "_"
      }
      cols = cols++:Array(newcol)

      df_ = df_.filter(condition).withColumn(newcol, lit(1)).toDF(cols:_*)

      df_ = df.join(df_, df(idcol) === df_(idcol + "_"), "left")
      cols = df.columns++:Array(newcol)
      df_ = df_.select(cols.map(A => col(A)): _*).na.fill(0)

      df_.write.format("json")
        .mode(SaveMode.Append)
        .save(project + "/" + id)