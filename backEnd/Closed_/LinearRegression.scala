import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.ml.regression.LinearRegression
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.col

    val project = "Taitanic"
    val id = "9"
    val train = "MinMaxScaledAgeIndex MinMaxScaledPclass MinMaxScaledMother MinMaxScaledSexIndex MinMaxScaledFare"
    val label = "Survived"
    val previous = "8"
    val file = project + "/" + previous
    val all = train + " " + label

    val df = spark.read.format("json").load(file)
    val aimarray = all.split(" ")
    val trainArray = train.split(" ")
    var df_ = df
    df_ = df_.select(aimarray.map(A => col(A)): _*)

    val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol("features")
    df_ = assembler.transform(df_)

    val lr1 = new LinearRegression()
    val lr = lr1.setFeaturesCol("features").setLabelCol(label).setFitIntercept(true).setMaxIter(50)

    val lrModel = lr.fit(df_)

    lrModel.extractParamMap()
    println(s"Coefficients: ${lrModel.coefficients} Intercept: ${lrModel.intercept}")

    val trainingSummary = lrModel.summary
    println(s"numIterations: ${trainingSummary.totalIterations}")
    println(s"objectiveHistory: ${trainingSummary.objectiveHistory.toList}")
    trainingSummary.residuals.show()
    println(s"RMSE: ${trainingSummary.rootMeanSquaredError}")
    println(s"r2: ${trainingSummary.r2}")

    val predictions: DataFrame = lrModel.transform(df_)
    println("输出预测结果")
    val predict_result: DataFrame =predictions.selectExpr("features","Survived", "round(prediction,1) as prediction")
    predict_result.foreach(println(_))
    df_.show(200,false)