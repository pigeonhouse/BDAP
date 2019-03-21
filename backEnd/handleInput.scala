import scalaj.http._
  
val file_location = "/demoData/%s"
val file_type = "csv"
val test = spark.read.format(file_type).option("header","true").option("inferSchema", "true").load(file_location)

val colName = test.columns
val fin = new StringBuilder;
val start = """{"colName":""""
val end = "\""
val json = colName.mkString(start,",",end)
fin ++= json
for(name <- colName){
  var t = test.select(name).takeAsList(20).toArray.mkString.stripSuffix("]").stripPrefix("[").split("\\]\\[")
  var r = ",\"" + name + "\":\"" + t.mkString(",") + "\""
  fin ++= r
}
fin += '}'

println(fin)

val result = Http("http://10.122.240.131:5000/InputPost").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString
