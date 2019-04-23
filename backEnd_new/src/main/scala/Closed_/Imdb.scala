import scala.collection.mutable.ArrayBuffer
import org.apache.spark.ml.feature.Word2Vec
import org.apache.spark.ml.feature.{CountVectorizer, CountVectorizerModel}
import org.apache.spark.ml.feature.StopWordsRemover
import org.apache.spark.ml.feature.{RegexTokenizer, Tokenizer}
import org.apache.spark.sql.functions._

val path1 = "hdfs:///demoData/pos_all.txt"
val path2 = "hdfs:///demoData/neg_all.txt"
val PosRdd = spark.sparkContext.textFile(path1)
val NegRdd = spark.sparkContext.textFile(path2)

val Train = PosRdd.union(NegRdd).zipWithIndex().toDF("Sentences", "idx")

val arrayBuffer = ArrayBuffer[Int]()
for(i <- 1 to 12500){
  arrayBuffer += 1
}
for(i <- 1 to 12500){
  arrayBuffer += 0
}
val labelArray = arrayBuffer.toArray
val Label = sc.parallelize(labelArray).zipWithIndex().toDF("label", "idx_")

val DF = Train.join(Label, Train("idx") === Label("idx_"), "left").drop("idx", "idx_")

val tokenizer = new Tokenizer().setInputCol("Sentences").setOutputCol("Words")

val tokenized = tokenizer.transform(DF)

val remover = new StopWordsRemover().setInputCol("Words").setOutputCol("filtered")

val removed = remover.transform(tokenized)

val countTokens = udf {(words: Seq[String]) => words.length}

val counted = removed.withColumn("tokens", countTokens(col("Words")))

val vectorizer = new CountVectorizer().setVocabSize(2000).setInputCol("filtered").setOutputCol("features").fit(counted)

val result_ = vectorizer.transform(counted)

var fin = result_.limit(20).toJSON.collectAsList.toString

val colname = result_.columns
val fin_ = fin.substring(1, fin.length - 1)
val start = """{"colName":""""
val end = "\""
val json = colname.mkString(start,", ",end) + "}, "

fin = "[" + json ++ fin_ + "]"

val result = Http("%s").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString