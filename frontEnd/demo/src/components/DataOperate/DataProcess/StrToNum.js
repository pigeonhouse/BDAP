export function StrToNum(allData){
    var attr = allData[0].all_attr;
    var Dataset = allData.Dataset;
    var tem, temp;
    var labelArray = new Array();
    for(let i = 0; i < Dataset.length ; i++){
        tem = 0;
        for(let j = 0; j < allData.labelArray.public.length; j++){
            if(Dataset[i][0].label == allData.labelArray.public[j]){
                tem = 1;
            }
        }
        temp = new Array(); 
        if(tem == 1){
            temp = [allData.labelArray.public[j], true];
        }
        else{
            temp = [allData.labelArray.public[j], false];
        }
        labelArray.push(temp);
    }
    // var attr = {id:[['1','mon','tur','sta'],['0','sun']]};
    // var Dataset = [[{label:'id',value:['mon','tur','sun','sta']}],[{label:'age',value:[1,2,3]}]];
    // var labelArray = [["id",true],["age",false]];
    // var stat = [{average:2,max:3,min:2,media:2},{average:2,max:3,min:2,media:2},{average:2,max:3,min:2,media:2}]
    // console.log("xxxxxxxxxxxxxxxxxxxx");
    // console.log(Dataset);
    for(let i = 0; i < labelArray.length;i++){
        if(labelArray[i][1] == true){
            for(let j = 0; j < Dataset[i][0].value.length; j++){
                for(let k = 0; k < attr.id.length; k++){
                    for(let l = 1;l < attr.id[k].length;l++ ){
                        if(Dataset[i][0].value[j] == attr.id[k][l]){
                            // console.log("111111111111111111111");
                            // console.log(Dataset);
                            Dataset[i][0].value[j] = attr.id[k][0];
                        }
                    }
                }
            }
        }
    }
    // console.log("xxxxxxxxxxxxxxxxxxxx");
    // console.log(labelArray);
    // console.log(Dataset);

    allData.Dataset = Dataset;
    // allData.labelArray = labelArray1;

    return allData;
}
