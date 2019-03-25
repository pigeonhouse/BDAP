import { RandomForestRegression as RFRegression } from 'ml-random-forest';
import {selectData, selectDataUntransport, transposition} from '../normalFunction'

function normalize(predict, labelArray, predictObj, PreArray){
    const pre = transposition(predict);
    let Dataset = [];
    for(let i in labelArray){
        Dataset.push({label:labelArray[i], value:pre[i]})
    }
    Dataset.push({label:PreArray[0], value:predictObj})
    return {Dataset:Dataset};
}
export function RandomForest(all_data){
    const labelArray = all_data[0].labelArray;
    const trainData = all_data[1].Dataset;
    const textData = all_data[2].Dataset;
    const attr = all_data[0].all_attr;

    const x = selectData(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.text_x);
    const options = {
        seed: attr.seed,
        maxFeatures: attr.maxFeatures,
        replacement: attr.replacement === 'false'? false:true,
        nEstimators: attr.nEstimators
    }
    var regression = new RFRegression(options);
    regression.train(x, y);
    const predictObj = regression.predict(predict);
    return normalize(predict, labelArray.text_x, predictObj, labelArray.text_y)
}