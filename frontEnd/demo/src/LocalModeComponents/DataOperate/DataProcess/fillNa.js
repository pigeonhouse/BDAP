export function fillNa(allData){
    // var attr = {type:'average'};
    var attr = allData[0].all_attr;
    var Dataset = allData[1].Dataset;
    var tem, temp;
    var labelArray = new Array();
    for(let i = 0; i < Dataset.length ; i++){
        tem = 0;
        for(let j = 0; j < allData[0].labelArray.public.length; j++){
            if(Dataset[i].label == allData[0].labelArray.public[j]){
                tem = 1;
            }
        }
        temp = new Array(); 
        if(tem == 1){
            temp = [Dataset[i].label, true];
        }
        else{
            temp = [Dataset[i].label, false];
        }
        labelArray.push(temp);
    }
    // var Dataset = [[{label:'id',value:[1,,3]}],[{label:'age',value:[1, ,3]}],[{label:'score',value:[,3,5]}]]
    // var labelArray = [["id",true],["age",false],["score",true]];
    // var stat = [{average:2,max:3,min:2,media:2},{average:2,max:3,min:2,media:2},{average:2,max:3,min:2,media:2}]
    // console.log("xxxxxxxxxxxxxxxxxxxx");
    // console.log(labelArray);
    for(let i = 0; i < labelArray.length;i++){
        if(labelArray[i][1] == true){
            if(Dataset[i].stat.type == 'number')
            if(attr.type == 'average'){
                for(let j =0; j < Dataset[i].value.length;j++)
                    if(Dataset[i].value[j] == null)
                        Dataset[i].value[j] = Dataset[i].stat.average;       
            }
            else if(attr.type == 'max'){
                for(let j =0; j < Dataset[i].value.length;j++)
                    if(Dataset[i].value[j] == null)
                        Dataset[i].value[j] = Dataset[i].stat.max;
            }
            else if(attr.type == 'min'){
                for(let j =0; j < Dataset[i].value.length;j++)
                    if(Dataset[i].value[j] == null)
                        Dataset[i].value[j] = Dataset[i].stat.min;
            }
            else if(attr.type == 'media'){
                for(let j =0; j < Dataset[i].value.length;j++)
                    if(Dataset[i].value[j] == null)
                        Dataset[i].value[j] = Dataset[i].stat.media;
            }
        }
    }
    // console.log("xxxxxxxxxxxxxxxxxxxx");
    // console.log(labelArray);
    // console.log(Dataset);
    console.log(Dataset);
    allData[1].Dataset = Dataset;
    // allData.labelArray = labelArray1;

    return allData[1];
}
