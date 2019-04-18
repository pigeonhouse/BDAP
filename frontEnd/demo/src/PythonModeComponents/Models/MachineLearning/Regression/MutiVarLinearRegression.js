import MLR from 'ml-regression-multivariate-linear';
import {selectData, transposition} from '../normalFunction'
import { Stat } from '../../../../PublicComponents/DataOperate/stat'

function normalize(pre, predictObj, PreArray){
    const preObj = transposition(predictObj);
    let Dataset = pre;
    for(let i in PreArray){
        Dataset.push({label:PreArray[i], value:preObj[i]})
    }
    return {Dataset:Stat(Dataset)};
}
export function MutiVarLinearRegression(all_data){
    const labelArray = all_data[0].labelArray;
    var trainData = all_data[1].Dataset;
    var textData = all_data[2].Dataset;

    const x = selectData(trainData, labelArray.train_x);
    const y = selectData(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.predict_x);

    const mlr = new MLR(x, y);
    const predictObj = mlr.predict(predict);
    return normalize(textData, predictObj, labelArray.predict_y);
}