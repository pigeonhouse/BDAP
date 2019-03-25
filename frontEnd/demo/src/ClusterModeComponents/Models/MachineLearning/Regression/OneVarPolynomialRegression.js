import PolynomialRegression from 'ml-regression-polynomial';
import {selectDataUntransport} from '../normalFunction'
function normalize(pre, preArray, Obj, objArray){
    let Dataset = [];
    
    Dataset.push({label:preArray[0], value:pre})
    Dataset.push({label:objArray[0], value:Obj})
    return {Dataset:Dataset};
}
export function OneVarPolynomialRegression(all_data){
    const labelArray = all_data[0].labelArray;
    var trainData = all_data[1].Dataset;
    var textData = all_data[2].Dataset;

    const x = selectDataUntransport(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectDataUntransport(textData, labelArray.text_x);
    const degree = all_data[0].all_attr['多项式最高幂'];
    const regression = new PolynomialRegression(x, y, degree);
    const predictObj = regression.predict(predict);
    return normalize(predict, labelArray.text_x, predictObj, labelArray.text_y)
}
    // const x = [50, 50, 50, 70, 70, 70, 80, 80, 80, 90, 90, 90, 100, 100, 100];
    // const y = [3.3, 2.8, 2.9, 2.3, 2.6, 2.1, 2.5, 2.9, 2.4, 3.0, 3.1, 2.8, 3.3, 3.5, 3.0]

    // console.log(regression.predict(80)); // Apply the model to some x value. Prints 2.6.
    // console.log(regression.coefficients); // Prints the coefficients in increasing order of power (from 0 to degree).
    // console.log(regression.toString(3)); // Prints a human-readable version of the function.
    // console.log(regression.toLaTeX());
    // console.log(regression.score(x, y));