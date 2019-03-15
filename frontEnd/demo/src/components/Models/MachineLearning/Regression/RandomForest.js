import { RandomForestRegression as RFRegression } from 'ml-random-forest';

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
export function RandomForest(all_data){
    const labelArray = all_data[0].labelArray;
    const trainData = all_data[1].Dataset;
    const textData = all_data[2].Dataset;
    const attr = all_data[0].all_attr;

    const x = selectData(trainData, labelArray[0]);
    const y = selectDataUntransport(trainData, labelArray[1]);
    const predict = selectData(textData, labelArray[2]);
    const options = {
        seed: attr.seed,
        maxFeatures: attr.maxFeatures,
        replacement: attr.replacement,
        nEstimators: attr.nEstimators
    }
    var regression = new RFRegression(options);
    regression.train(x, y);
    const predictObj = regression.predict(predict);
    return normalize(predict, labelArray[2], predictObj, labelArray[1])
}