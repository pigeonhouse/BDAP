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
                console.log("---------")
                console.log(attr);
                for(let j = 0; j < Dataset[i].value.length; j++){
                    Object.keys(attr).forEach(function(key){
                        // console.log("77777777777777")
                        // console.log(attr[key][0])
                        for(let k = 0; k < attr[key].length; k++){
                            for(let m = 1; m < attr[key][k].length; m++){
                                if(Dataset[i].value[j] == attr[key][k][m]){
                                    Dataset[i].value[j] = attr[key][k][0];
                                    break;
                                }
                            }
                        }
                    })
                }
            }
        }
    }
    console.log(Dataset)

    allData[1].Dataset = Dataset;
    return allData[1];
}
