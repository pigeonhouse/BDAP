import org.apache.spark.ml.Pipeline
import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.ml.tuning.{CrossValidator, ParamGridBuilder}
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.col

    val project = "Taitanic1"
    val id = "6"
    val train = "MinMaxScaledAge MinMaxScaledPclass Mother SexIndex MinMaxScaledFare"
    val label = "Survived"
    val previous = "5"
    val file = project + "/" + previous
    val all = train + " " + label

    val df = spark.read.format("json").load(file)
    val aimarray = all.split(" ")
    val trainArray = train.split(" ")
    var df_ = df
    df_ = df_.select(aimarray.map(A => col(A)): _*).withColumnRenamed(label, "label")

    val assembler = new VectorAssembler().setInputCols(trainArray).setOutputCol("features")
    //df_ = assembler.transform(df_)

    val lr = new LogisticRegression().setFeaturesCol("features").setLabelCol("label").setFitIntercept(true).setMaxIter(50)

    val pipeline = new Pipeline().setStages(Array(assembler, lr))

    val paramGrid = new ParamGridBuilder()
      //.addGrid(lr.elasticNetParam, Array(0.2))
      //.addGrid(lr.regParam, Array(0.1, 0.01, 0.05))
      .build()

    val cv = new CrossValidator()
        .setEstimator(pipeline)
        .setEvaluator(new BinaryClassificationEvaluator)
        .setNumFolds(10)
        .setEstimatorParamMaps(paramGrid)

    val cvModel = cv.fit(df_)

    cvModel.transform(df_)
        .select("features", "label", "prediction")
        .show(100)

