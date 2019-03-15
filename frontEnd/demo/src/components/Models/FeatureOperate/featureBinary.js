function valueSimple(value){
    let valuesimple = [];
    for(let i in value){
        if(valuesimple.indexOf(value[i]) === -1){
            valuesimple.push(value[i]);
        }
    }
    return valuesimple;
}
function dataSet(valuesimple, value, label){
    let dataset = [];
    for(let i in valuesimple){
        let newlabel = {label:`${label}${i}`,value:[]};
        for(let j in value){
            if(value[j] === valuesimple[i]){
                newlabel.value.push(1);
            }
            else newlabel.value.push(0);
        }
        dataset.push([newlabel]);
    }
    return dataset;
}
export function featureBinary(alldata){
    let Dataset = alldata[1].Dataset;
    const labelArray = alldata[0].labelArray;
    const DatasetLength = Dataset.length;
    for(let i in labelArray){
        for(let j = 0;j < DatasetLength;j++){
            if(labelArray[i] === Dataset[j][0].label){
                let valuesimple = valueSimple(Dataset[j][0].value);
                let dataset = dataSet(valuesimple, Dataset[j][0].value, labelArray[i]);
                Dataset.push(...dataset);
            }
        }
    }
    return {Dataset:Dataset};
}