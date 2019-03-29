import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.col

    val project = "Demo"
    val id = "%s"
    val train = "%s"
    val label = "%s"
    val previous = "%s"
    val file = project + "/" + previous
    val all = train + " " + label

    val df = spark.read.format("json").load(file)
    val aimarray = all.split(" ")
    val trainArray = train.split(" ")
    var df_ = df
    df_ = df_.select(aimarray.map(A => col(A)): _*)

    val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol("features")
    df_ = assembler.transform(df_)

    val lr1 = new LogisticRegression()
    val lr2 = lr1.setFeaturesCol("features").setLabelCol(label).setFitIntercept(true).setMaxIter(50)
    val lr = lr2

    val lrModel = lr.fit(df_)
    lrModel.extractParamMap()
    println(s"Coefficients: ${lrModel.coefficients} Intercept: ${lrModel.intercept}")

    lrModel.save("Model/" + project + "/" + id)