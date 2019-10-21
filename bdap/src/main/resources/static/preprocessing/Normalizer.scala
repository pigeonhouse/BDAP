object Normalizer {

  val lpSpace: Double = null
  val targetCols: Array[String] = null
  val input: DataFrame = null
  val ifInfNorm: String = null

  def main(args: Array[String]): Unit = {
    import org.apache.spark.ml.feature.{VectorAssembler, Normalizer}
    import org.apache.spark.ml.attribute.{Attribute, AttributeGroup, NumericAttribute}
    import org.apache.spark.ml.linalg.Vector

    val metaData = input

    val assembler = new VectorAssembler().setInputCols(targetCols).setOutputCol("tensor_")
    val assembled = assembler.transform(metaData)

    val scaler = new Normalizer().setInputCol("tensor_").setOutputCol("feature_").setP(lpSpace)
    val scaled = {
      if(ifInfNorm == "true"){
        scaler.transform(assembled, normalizer.p -> Double.PositiveInfinity).drop("tensor_")
      }
      else{
        scaler.transform(assembled).drop("tensor_")
      }
    }


    val colNames: Array[Attribute] = {
      val numAttrs = targetCols.length
      Array.tabulate(numAttrs)(i => NumericAttribute.defaultAttr.withName("Normalizer" + targetCols(i)))
    }

    val fieldCols = colNames.zipWithIndex.map(x => {
      val assembleFunc = udf {
        v: Vector =>
          v(x._2)
      }
      assembleFunc(scaled("feature_")).as(x._1.name.get, x._1.toMetadata())
    })

    val result = scaled.select(col("*") +: fieldCols: _*).drop("feature_")

    result.show()

    val output = result
  }
}
