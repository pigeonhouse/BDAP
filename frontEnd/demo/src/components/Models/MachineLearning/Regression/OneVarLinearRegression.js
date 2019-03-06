import SimpleLinearRegression from 'ml-regression-simple-linear';

export function OneVarLinearRegression(allData){

    console.log(allData)

    const trainFeatureName = allData[0].labelArray[0][0];
    const trainLabelName = allData[0].labelArray[1][0];
    const testFeatureName = allData[0].labelArray[2][0];
    const testLabelName = allData[0].all_attr['预测集列名']

    var trainFeatureValue = new Array();
    var trainLabelValue = new Array();
    var testFeatureValue = new Array();

    for(let i = 0; i < allData[1].Dataset.length; i++){
        if(allData[1].Dataset[i][0].label==trainFeatureName){
            trainFeatureValue.push(allData[1].Dataset[i][0].value)
        }
        else if (allData[1].Dataset[i][0].label==trainLabelName){
            trainLabelValue.push(allData[1].Dataset[i][0].value)
        }
    }
    for(let i = 0; i < allData[2].Dataset.length; i++){
        if(allData[2].Dataset[i][0].label==testFeatureName){
            testFeatureValue.push(allData[2].Dataset[i][0].value)
        }
    }
    
    trainFeatureValue = trainFeatureValue[0]
    trainLabelValue = trainLabelValue[0]
    testFeatureValue = testFeatureValue[0]



    const regression = new SimpleLinearRegression(trainFeatureValue,trainLabelValue);
    console.log("单变量线性回归结果")
    console.log(regression.slope,regression.intercept)
    const predictArray = regression.predict(testFeatureValue)
    console.log(predictArray)
    allData[2].Dataset.push([{label:testLabelName,value:predictArray}])
    console.log(allData)
    console.log("----------------------")

    return allData

    // const predictArray = regression.predict(DataSetTest[predictColName]); // 5

    // DataSetTest[outputColName] = predictArray;

    // regression.computeX(3.5); // 2.25
    
    // regression.toString(); // 'f(x) = 2 * x - 1'
    
    // regression.score(x, y);
    // // { r: 1, r2: 1, chi2: 0, rmsd: 0 }
    
    // const json = regression.toJSON();
    // // { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
    // const loaded = SimpleLinearRegression.load(json);
    // loaded.predict(5) // 9
}