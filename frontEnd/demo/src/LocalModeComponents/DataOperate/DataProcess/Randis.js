export function Randis(allData){
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
    // var attr = {public:[0.7]};
    // var Dataset = [[{label:'id',value:[1,2,3,4,5]}],[{label:'age',value:[1,3,3,5,5]}],[{label:'score',value:[2,3,5,7,9]}]]
    // var labelArray = [["id",true],["age",false],["score",true]];
    var tem1 = new Array(), tem2 = new Array(),tem;
    var flag;
    for(let j= 0; j < Dataset[0].value.length; j++){
        // console.log("pppppppppppppppppppppppppppppppp")
        // console.log(attr.public[0])
        flag = Math.random();
        if(flag < attr.public){
            for(let k = 0; k < labelArray.length;k++){
                if(labelArray[k][1] == true){
                    flag=0; 
                    // console.log("xxxxxxxxxxxxxxxxxxx");
                    // console.log(tem1);
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
            for(let k = 0; k < labelArray.length;k++){
                if(labelArray[k][1] == true){
                    flag=0; 
                    // console.log("kkkkkkkkkkkkkkkkkkkkkkkk");
                    // console.log(tem1);
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
    // console.log(tem);
    // console.log("xxxxxxxxxxxxxxxxxxxx");
    // console.log(labelArray);
    // console.log(Dataset);

    // allData.Dataset = Dataset;
    // allData.labelArray = labelArray1;
    console.log("tem")
    console.log(tem);
    return {Dataset:tem};
}
