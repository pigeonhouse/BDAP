
object FPGrowth {
  import org.apache.spark.ml.fpm.FPGrowth
  import spark.implicits._

  val minConfidence: Double = null
  val minSupport: Double = null
  val dataCol: Array[String] = null
  val predictionCol: String = null
  val input: DataFrame = null
  def main(args: Array[String]): Unit = {

    import java.util
    import com.alibaba.fastjson.JSONObject

    val df = input

    val fpgrowth = new FPGrowth().setItemsCol(dataCol(0)).setMinSupport(minSupport).setMinConfidence(minConfidence).setPredictionCol(predictionCol)

    val Model = fpgrowth.fit(df)

  }
}
