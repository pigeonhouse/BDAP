import PolynomialRegression from 'ml-regression-polynomial';

export function OneVarPolynomialRegression(DataSetTrain, featureColName, labelColName,degree,DataSetTest,predictColName,outputColName){
    // const x = [50, 50, 50, 70, 70, 70, 80, 80, 80, 90, 90, 90, 100, 100, 100];
    // const y = [3.3, 2.8, 2.9, 2.3, 2.6, 2.1, 2.5, 2.9, 2.4, 3.0, 3.1, 2.8, 3.3, 3.5, 3.0];
    const x = DataSetTrain[featureColName];
    const y = DataSetTrain[labelColName];

    const regression = new PolynomialRegression(x, y, degree);

    const predictArray = regression.predict(DataSetTest[predictColName]); // 5

    DataSetTest[outputColName] = predictArray;

    // console.log(regression.predict(80)); // Apply the model to some x value. Prints 2.6.
    // console.log(regression.coefficients); // Prints the coefficients in increasing order of power (from 0 to degree).
    // console.log(regression.toString(3)); // Prints a human-readable version of the function.
    // console.log(regression.toLaTeX());
    // console.log(regression.score(x, y));
}