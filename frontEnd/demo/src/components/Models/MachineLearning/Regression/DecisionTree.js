import { DecisionTreeRegression as DTRegression } from 'ml-cart';

function selectData(data, labelArray){
    for(let i in data){
        if(labelArray.indexOf(data[i][0].label) !== -1){
           return data[i][0].value;
        }
    }
}
function normalize(pre, preArray, Obj, objArray){
    let Dataset = [];
    
    Dataset.push([{label:preArray[0], value:pre}])
    Dataset.push([{label:objArray[0], value:Obj}])
    return {Dataset:Dataset};
}
export function DecisionTreeRegression(all_data){
    const labelArray = all_data[0].labelArray;
    var trainData = all_data[1].Dataset;
    var textData = all_data[2].Dataset;

    const x = selectData(trainData, labelArray[0]);
    const y = selectData(trainData, labelArray[1]);
    const predict = selectData(textData, labelArray[2]);

    const regression = new DTRegression();
    regression.train(x, y);
    const predictObj = regression.predict(predict);
    return normalize(predict, labelArray[2], predictObj, labelArray[1])
}