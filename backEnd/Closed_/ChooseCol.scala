import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.functions.col

val project = "Taitanic"
val id = "1"
val aim = "PassengerId Name Age Sex Parch Pclass"
val previous = "0"
val file = "/home/hadoop/BigDL/" + project + "/" + previous

val df = SQLContext.read.format("json").load(file)
val aimarray = aim.split(" ")

var df_ = df
df_ = df_.select(aimarray.map(A => col(A)): _*)

df_.write.format("json")
     .mode(SaveMode.Append)
     .save("/home/hadoop/BigDL/" + project + "/" + id)