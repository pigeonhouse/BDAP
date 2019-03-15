export function Onehot(allData){
    Dataset = allData.Dataset;
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
    // var Dataset = [[{label:'id',value:['mon','tur','sun','sta']}]];
    // var labelArray = [["id",true]];
    // var stat = [{average:2,max:3,min:2,media:2},{average:2,max:3,min:2,media:2},{average:2,max:3,min:2,media:2}]
    var tep,tp;
    for(let i = 0; i < labelArray.length;i++){
        if(labelArray[i][1] == true){
            for(let j = 0; j < Dataset[i][0].value.length; j++){
                    tep = new Array();
                    tp = new Array();
                    tep['label'] = labelArray[i][0];
                for(let k = 0; k < Dataset[i][0].value.length; k++){
                    if(k == j){
                        tp[k] = 1;
                    }
                    else    tp[k] = 0;
                }
                tep['value'] = tp;
                Dataset.push(tep);
            }
        }
    }
    // console.log(Dataset);
    allData.Dataset = Dataset;
    // allData.labelArray = labelArray1;

    return allData;
}
