import SimpleLinearRegression from 'ml-regression-simple-linear';

export function OneVarLinearRegression(){
    const x = [0.5, 1, 1.5, 2, 2.5];
    const y = [0, 1, 2, 3, 4];
    
    const regression = new SimpleLinearRegression(x, y);
    
    console.log(regression.slope,regression.intercept,regression.coefficients)

    // regression.predict(3); // 5
    // regression.computeX(3.5); // 2.25
    
    // regression.toString(); // 'f(x) = 2 * x - 1'
    
    // regression.score(x, y);
    // // { r: 1, r2: 1, chi2: 0, rmsd: 0 }
    
    // const json = regression.toJSON();
    // // { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
    // const loaded = SimpleLinearRegression.load(json);
    // loaded.predict(5) // 9
}