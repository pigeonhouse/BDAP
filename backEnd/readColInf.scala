import scalaj.http._
  
//val df = spark.read.json("/examples/%s")
//println(df.columns.mkString(","))

val result = Http("http://localhost:5000/postTest").postData("""{"id":"12","json":"data"}""").header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString