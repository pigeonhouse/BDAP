import SimpleLinearRegression from 'ml-regression-simple-linear';

export function OneVarLinearRegression(DataSetTrain, featureColName, labelColName,DataSetTest,predictColName,outputColName){
    const x = DataSetTrain[featureColName];
    const y = DataSetTrain[labelColName];
    
    const regression = new SimpleLinearRegression(x, y);
    
    console.log(regression.slope,regression.intercept)

    const predictArray = regression.predict(DataSetTest[predictColName]); // 5

    DataSetTest[outputColName] = predictArray;

    console.log("a")

    // regression.computeX(3.5); // 2.25
    
    // regression.toString(); // 'f(x) = 2 * x - 1'
    
    // regression.score(x, y);
    // // { r: 1, r2: 1, chi2: 0, rmsd: 0 }
    
    // const json = regression.toJSON();
    // // { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
    // const loaded = SimpleLinearRegression.load(json);
    // loaded.predict(5) // 9
}