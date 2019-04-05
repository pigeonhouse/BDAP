export function Randis(allData){
    var attr = allData[0].all_attr;
    var Dataset = allData[1].Dataset;
    var tem, temp;
    var labelArray = new Array();
    var lim = Dataset[0].value.length*attr.public;
    var count = 1, count_ = 0;
    for(let i = 0; i < Dataset.length ; i++){
        tem = 0;
        temp = new Array(); 
        temp = [Dataset[i].label, true];
        labelArray.push(temp);
    }
    var tem1 = new Array(), tem2 = new Array(),tem;
    var flag;
    for(let j= 0; j < Dataset[0].value.length; j++){
        flag = Math.random();
        if(flag < attr.public && count < lim){
            count++;
            for(let k = 0; k < labelArray.length;k++){
                if(labelArray[k][1] == true){
                    flag=0;
                    for(let l = 0; l < tem1.length;l++){
                        if(tem1[l].label == Dataset[k].label){
                            tem1[l].value.push(Dataset[k].value[j]);
                            flag = 1;
                            break;
                        }
                    }
                    if(flag == 0){
                        tem = {'value':new Array(),'label':Dataset[k].label};
                        tem.value.push(Dataset[k].value[j]);
                        tem1.push(tem);
                    }
                }
            }
        }
        else{
            if(count_ > Dataset[0].value.length-lim){
                count++;
                for(let k = 0; k < labelArray.length;k++){
                    if(labelArray[k][1] == true){
                        flag=0;
                        for(let l = 0; l < tem1.length;l++){
                            if(tem1[l].label == Dataset[k].label){
                                tem1[l].value.push(Dataset[k].value[j]);
                                flag = 1;
                                break;
                            }
                        }
                        if(flag == 0){
                            tem = {'value':new Array(),'label':Dataset[k].label};
                            tem.value.push(Dataset[k].value[j]);
                            tem1.push(tem);
                        }
                    }
                }
                continue;
            }
            count_++;
            for(let k = 0; k < labelArray.length;k++){
                if(labelArray[k][1] == true){
                    flag=0; 
                    for(let l = 0; l < tem2.length;l++){
                        if(tem2[l].label == Dataset[k].label){
                            tem2[l].value.push(Dataset[k].value[j]);
                            flag = 1;
                            break;
                        }
                    }
                    if(flag == 0){
                        tem = {'value':new Array(),'label':Dataset[k].label};
                        tem.value.push(Dataset[k].value[j]);
                        tem2.push(tem);
                    }

                }
            }
        }
    }
    tem = new Array();
    tem.push(tem1);
    tem.push(tem2);

    console.log("tem")
    console.log(tem);
    return {Dataset:tem};
}
