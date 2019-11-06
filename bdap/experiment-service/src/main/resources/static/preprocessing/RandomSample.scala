object RandomSample {

  val input: DataFrame = null
  //  种子（为字符串"null"时随机生成种子）
  val seed: String = null
  //  是否放回
  val withReplacement: Boolean = null
  //  抽样类型
  val sampleType: String = null
  //  比例或大小
  val ratioOrSize: String = null

  def main(args: Array[String]): Unit => {

    val df = input
    val df_count: Int = df.count ().toInt
    val sampleSize: Int = if (sampleType == "size") ratioOrSize.toInt else (ratioOrSize.toDouble * df_count).toInt
    var ratio: Double = if (sampleType == "size") ratioOrSize.toDouble / df.count () else ratioOrSize.toDouble
    ratio = if (ratio < 1) ratio else 1

    val s_df = if (seed == "null") df.sample (withReplacement, ratio) else df.sample (withReplacement, ratio, seed.toLong)
    val output = s_df.limit (sampleSize)
  }
}