import scalaj.http._

val file_location = "/demoData/%s"
val file_type = "csv"
val test = spark.read.format(file_type).option("header","true").option("inferSchema", "true").load(file_location)

val fin = test.limit(20).toJSON.collectAsList.toString

val result = Http("http://10.122.224.119:5000/InputPost").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
