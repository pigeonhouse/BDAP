import { GaussianNB } from 'ml-naivebayes';

function selectData(data, labelArray){
    let Dataset = [];
    for(let i in data){
        if(labelArray.indexOf(data[i][0].label) !== -1){
            Dataset.push(data[i][0].value)
        }
    }
    return transposition(Dataset);
}
function selectDataUntransport(data, labelArray){
    for(let i in data){
        if(labelArray.indexOf(data[i][0].label) !== -1){
            return data[i][0].value;
        }
    }
}
function transposition(Dataset){
    var Data = [];
    for(let i in Dataset[0]){
        let arr = [];
        for(let j in Dataset){
            arr[j] = Dataset[j][i];
        }
        Data[i] = arr;
    }
    return Data;
}
function normalize(predict, labelArray, predictObj, PreArray){
    const pre = transposition(predict);
    let Dataset = [];
    for(let i in labelArray){
        Dataset.push([{label:labelArray[i], value:pre[i]}])
    }
    Dataset.push([{label:PreArray[0], value:predictObj}])
    return {Dataset:Dataset};
}
export function NaiveBayes(all_data){
    const labelArray = all_data[0].labelArray;
    const trainData = all_data[1].Dataset;
    const textData = all_data[2].Dataset;

    const x = selectData(trainData, labelArray[0]);
    const y = selectDataUntransport(trainData, labelArray[1]);
    const predict = selectData(textData, labelArray[2]);


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
    return normalize(predict, labelArray[2], predictObj, labelArray[1])
}  
    //model.train(Xtrain, Ytrain);

    //var predictions = model.predict(Xtest);
