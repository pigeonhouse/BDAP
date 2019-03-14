import scalaj.http._
  
val test = spark.read.json("/examples/%s")

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


val s = """""""""+fin+"""""""""

//println(s)
val e = s
val result = Http("http://localhost:5000/postTest").postData(fin.toString).header("Content-Type", "application/json").header("Charset", "UTF-8").option(HttpOptions.readTimeout(10000)).asString

