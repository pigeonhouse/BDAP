import { DecisionTreeRegression as DTRegression } from 'ml-cart';
import {selectDataUntransport} from '../normalFunction'
function normalize(pre, preArray, Obj, objArray){
    let Dataset = [];
    Dataset.push({label:preArray[0], value:pre})
    Dataset.push({label:objArray[0], value:Obj})
    return {Dataset:Dataset};
}
export function DecisionTreeRegression(all_data){
    const labelArray = all_data[0].labelArray;
    var trainData = all_data[1].Dataset;
    var textData = all_data[2].Dataset;

    const x = selectDataUntransport(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectDataUntransport(textData, labelArray.text_x);

    const regression = new DTRegression();
    regression.train(x, y);
    const predictObj = regression.predict(predict);
    return normalize(predict, labelArray.text_x, predictObj, labelArray.text_y)
}