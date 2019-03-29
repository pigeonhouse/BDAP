export function Onehot(allData){
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
    // var Dataset = [[{label:'id',value:['mon','tur','sun','sta']}]];
    // var labelArray = [["id",true]];
    // var stat = [{average:2,max:3,min:2,media:2},{average:2,max:3,min:2,media:2},{average:2,max:3,min:2,media:2}]

    console.log(labelArray)
    var tep,tp;
    for(let i = 0; i < labelArray.length;i++){
        if(labelArray[i][1] == true){
            for(let j = 0; j < Dataset[i].value.length; j++){
                    tp = new Array();
                    tep = { 'label': labelArray[i][0],'stat' : new Array(),'value' : new Array()};
                for(let k = 0; k < Dataset[i].value.length; k++){
                    if(k == j){
                        tp[k] = 1;
                    }
                    else    tp[k] = 0;
                }
                tep.value = tp;
                tep.stat = Dataset[i].stat;
                Dataset.push(tep);
            }
        }
    }
    console.log(Dataset);
    allData[1].Dataset = Dataset;
    // allData.labelArray = labelArray1;

    return allData[1];
}
