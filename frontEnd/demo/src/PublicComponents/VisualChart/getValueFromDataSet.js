export function getValueFromDataSet(label, dataSet){
    let value = new Array();

    dataSet.map((data) => {
        value.push(data[label])
    });

    return value;
}