import { RandomForestRegression as RFRegression } from 'ml-random-forest';
import {selectData, selectDataUntransport} from '../normalFunction'
import { Stat } from '../../../../PublicComponents/DataOperate/stat'

function normalize(pre, predictObj, PreArray){
    let Dataset = pre;
    Dataset.push(Stat([{label:PreArray[0], value:predictObj}])[0]);
    return {Dataset:Dataset};
}
export function RandomForest(all_data){
    const labelArray = all_data[0].labelArray;
    const trainData = all_data[1].Dataset;
    const textData = all_data[2].Dataset;
    const attr = all_data[0].all_attr;

    const x = selectData(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.predict_x);
    const options = {
        seed: attr.seed,
        maxFeatures: attr.maxFeatures,
        replacement: attr.replacement === 'false'? false:true,
        nEstimators: attr.nEstimators
    }
    var regression = new RFRegression(options);
    regression.train(x, y);
    const predictObj = regression.predict(predict);
    return normalize(textData, predictObj, labelArray.predict_y)
}