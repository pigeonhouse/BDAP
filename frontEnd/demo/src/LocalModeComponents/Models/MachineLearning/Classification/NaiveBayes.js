import { GaussianNB } from 'ml-naivebayes';
import { selectData, selectDataUntransport } from '../normalFunction'
import { Stat } from '../../../DataOperate/stat'
function normalize(pre, predictObj, PreArray){
    let Dataset = pre;
    Dataset.push(Stat([{label:PreArray[0], value:predictObj}])[0]);
    return {Dataset:Dataset};
}
export function NaiveBayes(all_data){
    const labelArray = all_data[0].labelArray;
    const trainData = all_data[1].Dataset;
    const textData = all_data[2].Dataset;

    const x = selectData(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.predict_x);
    console.log(x)
    console.log(y)

    var model = new GaussianNB();
    model.train(x, y)
    
    const crossValidation = require('ml-cross-validation');
    const confusionMatrix = crossValidation.leaveOneOut(model, x, y);
    var predictObj = model.predict(predict);
    const accuracy = confusionMatrix.getAccuracy();
    console.log(accuracy)
    return normalize(trainData, predictObj, labelArray.predict_y)
}  
