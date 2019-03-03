import min from 'ml-array-min';
import max from 'ml-array-max';
import mean from 'ml-array-mean';
import median from 'ml-array-median';
import variance from 'ml-array-variance';
import standardDeviation from 'ml-array-standard-deviation';
export function FillNa(allData){

    for(let i = 0; i < allData[0].labelArray.length; i++){
        for(let j = 0; j < allData[1].Dataset.length; j++){
            if(allData[0].labelArray[i] == allData[1].Dataset[j][0].label){
                if(allData[0].all_attr.type == 'mean'){
                    var fillingNumber = mean(allData[1].Dataset[j][0].value)
                }
                else if(allData[0].all_attr.type == 'median'){
                    var fillingNumber = median(allData[1].Dataset[j][0].value)
                }
                else if(allData[0].all_attr.type == 'min'){
                    var fillingNumber = min(allData[1].Dataset[j][0].value)
                }
                else if(allData[0].all_attr.type == 'max'){
                    var fillingNumber = max(allData[1].Dataset[j][0].value)
                }
                else var fillingNumber = 0
                
                for(let m = 0;m < allData[1].Dataset[j][0].value.length; m++){
                    if(allData[1].Dataset[j][0].value[m] == null){
                        allData[1].Dataset[j][0].value[m] = fillingNumber
                    }
                }
            }
        }
    }
    console.log("缺失值填充后数据")
    console.log(allData)
    console.log("-------------")
    return allData
}
