import rescale from 'ml-array-rescale';

export function Scaler(allData){

    for(let i = 0; i < allData[0].labelArray.length; i++){
        var dataset = allData[1].Dataset
        for(let j = 0; j < dataset.length; j++){
            if (allData[0].labelArray[i] == dataset[j][0].label){
                dataset[j][0].value = rescale(dataset[j][0].value)
            }
        }
    }
    console.log("归一化完成后数据")
    console.log(allData)
    console.log("---------------------------------")
    return allData
// [0, 0.25, 0.5, 0.75, 1]
}
