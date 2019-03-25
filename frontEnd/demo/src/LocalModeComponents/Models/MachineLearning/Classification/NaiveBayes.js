import { GaussianNB } from 'ml-naivebayes';
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
export function NaiveBayes(all_data){
    const labelArray = all_data[0].labelArray;
    const trainData = all_data[1].Dataset;
    const textData = all_data[2].Dataset;

    const x = selectData(trainData, labelArray.train_x);
    const y = selectDataUntransport(trainData, labelArray.train_y);
    const predict = selectData(textData, labelArray.text_x);


    var model = new GaussianNB();
    model.train(x, y);
    var predictObj = model.predict(predict);
    // console.log(x);
    // console.log(y);
    // console.log(predictObj);
    // const confusionMatrix = 
    //     crossValidation.leaveOneOut(
    //         dataset, 
    //         labels, 
    //         function(trainFeatures, trainLabels, testFeatures) {
    //             return model.predict(testFeatures);
    // });
    // const accuracy = confusionMatrix.getAccuracy();
    // console.log(confusionMatrix)
    // console.log("准确率：")
    // console.log(accuracy*100+"%")
    return normalize(predict, labelArray.text_x, predictObj, labelArray.text_y)
}  
    //model.train(Xtrain, Ytrain);

    //var predictions = model.predict(Xtest);
