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
    return normalize(trainData, predictObj, labelArray.predict_y)
}  
    //model.train(Xtrain, Ytrain);

    //var predictions = model.predict(Xtest);
