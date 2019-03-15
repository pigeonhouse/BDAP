import MLR from 'ml-regression-multivariate-linear';

function selectData(data, labelArray){
    let Dataset = [];
    for(let i in data){
        if(labelArray.indexOf(data[i][0].label) !== -1){
            Dataset.push(data[i][0].value)
        }
    }
    return transposition(Dataset);
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
    const preObj = transposition(predictObj);
    let Dataset = [];
    for(let i in labelArray){
        Dataset.push([{label:labelArray[i], value:pre[i]}])
    }
    for(let i in PreArray){
        Dataset.push([{label:PreArray[i], value:preObj[i]}])
    }
    return {Dataset:Dataset};
}
export function MutiVarLinearRegression(all_data){
    const labelArray = all_data[0].labelArray;
    var trainData = all_data[1].Dataset;
    var textData = all_data[2].Dataset;

    const x = selectData(trainData, labelArray[0]);
    const y = selectData(trainData, labelArray[1]);
    const predict = selectData(textData, labelArray[2]);
    // console.log(x)
    // console.log(y)
    // console.log(predict)
    const mlr = new MLR(x, y);
    const predictObj = mlr.predict(predict);
    return normalize(predict, labelArray[2], predictObj, labelArray[1])
}