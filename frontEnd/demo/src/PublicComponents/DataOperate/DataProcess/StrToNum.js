export function StrToNum(allData){
    var attr = allData[0].all_attr;
    var Dataset = allData[1].Dataset;
    var tem, temp;
    var labelArray = new Array();

    for(let i = 0; i < Dataset.length ; i++){
        tem = 0;
        for(let j = 0; j < allData[0].labelArray.public.length; j++)
            if(Dataset[i].label == allData[0].labelArray.public[j])    tem = 1;
        temp = new Array(); 
        if(tem == 1)    temp = [Dataset[i].label, true];
        else    temp = [Dataset[i].label, false];
        labelArray.push(temp);
    }
    for(let i = 0; i < labelArray.length;i++){
        if(labelArray[i][1] == true){
            if(Dataset[i].stat.type == 'string'){
                let tp = new Array();
                tp = JSON.parse(JSON.stringify(Dataset[i]));
                tp.label = tp.label+"1";
                console.log(Dataset);
                for(let j = 0; j < Dataset[i].value.length; j++){
                    let found = 0;
                    Object.keys(attr).forEach(function(key){
                        for(let k = 0; k < attr[key].length; k++){
                            for(let m = 1; m < attr[key][k].length; m++){
                                if(Dataset[i].value[j] == attr[key][k][m]){
                                    tp.value[j] = attr[key][k][0];
                                    found = 1;
                                    break;
                                }
                            }
                        } 
                    })
                    if(!found){
                        tp.value[j] = 0;
                    }
                }
                Dataset.push(tp);
            }
        }
    }

    allData[1].Dataset = Dataset;
    return allData[1];
}
