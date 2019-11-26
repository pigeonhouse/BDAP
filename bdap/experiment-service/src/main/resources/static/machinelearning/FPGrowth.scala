
object FPGrowth {


  val minConfidence: Double = null
  val minSupport: Double = null
  val dataCol: Array[String] = null
  val predictionCol: String = null
  val input: DataFrame = null

  def main(args: Array[String]): Unit = {

    import java.util
    import com.alibaba.fastjson.JSONObject
    import org.apache.spark.ml.fpm.FPGrowth
    import spark.implicits._
    import scala.util.control.Breaks._

    val df = input

    //    val fpgrowth = new FPGrowth().setItemsCol(dataCol(0)).setMinSupport(minSupport).setMinConfidence(minConfidence).setPredictionCol(predictionCol)
    val fpgrowth = new FPGrowth().setItemsCol("itemArray").setMinSupport(minSupport).setMinConfidence(minConfidence).setPredictionCol(predictionCol)

    val Model = fpgrowth.fit(df)


    val resultJson = new JSONObject()
    val freqItemsetsData: util.List[Any] = new util.ArrayList[Any]()
    val associationRulesData: util.List[Any] = new util.ArrayList[Any]()

    val limit = 10
    var now = 0
    breakable {
      Model.freqItemsets.collect.foreach { r =>
        now = now + 1
        var record = new JSONObject()
        record.put("it", r.getList(0))
        record.put("fq", r.getLong(1))
        freqItemsetsData.add(record)
        if (now >= limit){
          break
        }

      }
    }
    //     println(freqItemsetsData.toString)
    now = 0
    breakable {
      Model.associationRules.collect.foreach { r =>
        now = now + 1
        var record = new JSONObject()
        record.put("at", r.getList(0))
        record.put("cq", r.getList(1))
        record.put("cf", r.getDouble(2))
        record.put("lf", r.getDouble(3))
        associationRulesData.add(record)
        if (now >= limit){
          break
        }
      }
    }
    resultJson.put("freqItemsets", freqItemsetsData)
    resultJson.put("associationRules", associationRulesData)
    println(resultJson)
  }
}
