import MLR from 'ml-regression-multivariate-linear';
import {selectData, transposition} from '../normalFunction'

function normalize(predict, labelArray, predictObj, PreArray){
    const pre = transposition(predict);
    const preObj = transposition(predictObj);
    let Dataset = [];
    for(let i in labelArray){
        Dataset.push({label:labelArray[i], value:pre[i]})
    }
    for(let i in PreArray){
        Dataset.push({label:PreArray[i], value:preObj[i]})
    }
    return {Dataset:Dataset};
}
export function MutiVarLinearRegression(all_data){
    const labelArray = all_data[0].labelArray;
    var trainData = all_data[1].Dataset;
    var textData = all_data[2].Dataset;

    const x = selectData(trainData, labelArray.train_x);
    const y = selectData(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.text_x);
    // console.log(x)
    // console.log(y)
    // console.log(predict)
    const mlr = new MLR(x, y);
    const predictObj = mlr.predict(predict);
    return normalize(predict, labelArray.text_x, predictObj, labelArray.text_y);
}