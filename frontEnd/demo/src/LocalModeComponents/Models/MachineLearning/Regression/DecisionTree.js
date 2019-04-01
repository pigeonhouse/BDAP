import { DecisionTreeRegression as DTRegression } from 'ml-cart';
import {selectDataUntransport} from '../normalFunction'
import { Stat } from '../../../DataOperate/stat'

function normalize(pre, Obj, objArray){
    let Dataset = pre;
    Dataset.push(Stat([{label:objArray[0], value:Obj}])[0]);
    return {Dataset:Dataset};
}
export function DecisionTreeRegression(all_data){
    const labelArray = all_data[0].labelArray;
    var trainData = all_data[1].Dataset;
    var textData = all_data[2].Dataset;

    const x = selectDataUntransport(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectDataUntransport(textData, labelArray.predict_x);

    const regression = new DTRegression();
    regression.train(x, y);
    const predictObj = regression.predict(predict);

    var resultData = normalize(textData, predictObj, labelArray.predict_y);
    return resultData;
}