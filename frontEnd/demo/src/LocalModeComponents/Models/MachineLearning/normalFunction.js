export function selectData(data, labelArray){
    let Dataset = [];
    for(let i in data){
        if(labelArray.indexOf(data[i].label) !== -1){
            Dataset.push(data[i].value)
        }
    }
    return transposition(Dataset);
}
export function selectDataUntransport(data, labelArray){
    for(let i in data){
        if(labelArray.indexOf(data[i].label) !== -1){
            return data[i].value;
        }
    }
}
export function transposition(Dataset){
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