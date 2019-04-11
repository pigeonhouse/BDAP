export function Onehot(allData){
    var Dataset = allData[1].Dataset;
    var tem, temp, col, nop;
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
    var tep,tp;
    for(let i = 0; i < labelArray.length;i++){
        if(labelArray[i][1] == true){
                col = new Array();
                for(let k = 0; k < Dataset[i].value.length; k++){
                    nop = 0;
                    var p = 0;
                    if(col.hasOwnProperty('length'))
                        for(;p < col.length;p++){
                            if(Dataset[i].value[k] == col[p]){
                                nop = 1;
                                break;
                            }
                        }
                    if(!nop){
                        col.push(Dataset[i].value[k]);
                    }
                }
                for(let k = 0; k < col.length ; k++){
                    tp = new Array();
                    tep = { 'label': labelArray[i][0],'stat': new Array(),'value' : new Array()};
                    for(let n = 0;n < Dataset[i].value.length; n++){
                        if(Dataset[i].value[n] == col[k])   tp[n] = 1;
                        else tp[n] = 0;
                    }
                    tep.value = tp;
                    tep.stat = Dataset[i].stat;
                    Dataset.push(tep);
                } 
        }
    }
    console.log(Dataset);
    allData[1].Dataset = Dataset;

    return allData[1];
}
