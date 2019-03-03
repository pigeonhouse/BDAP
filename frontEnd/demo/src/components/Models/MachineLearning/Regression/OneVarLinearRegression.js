import SimpleLinearRegression from 'ml-regression-simple-linear';

export function OneVarLinearRegression(allData){

    console.log(allData)

     const x = allData[1].Dataset[2][0].value;
     const y = allData[1].Dataset[1][0].value;
    
    const regression = new SimpleLinearRegression(x, y);
    console.log("单变量线性回归结果")
    console.log(regression.slope,regression.intercept)
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