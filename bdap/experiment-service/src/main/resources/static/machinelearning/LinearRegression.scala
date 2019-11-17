import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.ml.regression.LinearRegression
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions.col

object LinearRegression {
  val input: DataFrame = null
  val elasticNetParam: Double = null
  val fitIntercept: Boolean = null
  val labelCols: Array[String] = null
  val trainCols: Array[String] = null
  val maxIter: Int = null
  val regParam: Double = null
  val tol: Double = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.feature.VectorAssembler
    import org.apache.spark.ml.regression.LinearRegression
    import org.apache.spark.ml.regression.LinearRegressionModel
    import org.apache.spark.sql.{DataFrame, SparkSession}
    import org.apache.spark.sql.functions.col
    val labelCol = labelCols(0)
    val aimarray = trainCols :+ labelCol
    val df = input.select(aimarray.map(A => col(A)): _*)

    val assembler = new VectorAssembler().setInputCols(trainCols).setOutputCol("features_")
    val assembledDF = assembler.transform(df)
    val lr = new LinearRegression().setElasticNetParam(elasticNetParam).setFeaturesCol("features_").setFitIntercept(fitIntercept).setLabelCol(labelCol).setMaxIter(maxIter).setRegParam(regParam).setTol(tol)

    assembledDF.show()
    val Model = lr.fit(assembledDF)

  }
}
