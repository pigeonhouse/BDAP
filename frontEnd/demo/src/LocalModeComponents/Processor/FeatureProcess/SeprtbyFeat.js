export function SeprtbyFeat(allData){
    var attr = allData[0].all_attr;
    var Dataset = allData[1].Dataset;
    var tem, temp;
    var labelArray = new Array();

    console.log(allData)
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

    for(let i = 0; i < labelArray.length;i++){
        if(labelArray[i][1] == true){
            if(Dataset[i].stat.type == 'string'){
                let tp = new Array();
                for(let k = 0; k < Dataset[i].stat.value.length; k++){
                    tp.push([Dataset[i].stat.value[k].name, Dataset[i].stat.value[k].name, Dataset[i].stat.value[k].count]);
                }
                Dataset[i]['group'] = tp;
            }
            else Object.keys(attr).forEach(function(key){
                if(key == labelArray[i][0]){
                    if(attr[key][0] == 'normal'){
                        let interval = (Dataset[i].stat.max - Dataset[i].stat.min) / attr[key][1];
                        let temp = new Array();
                        
                        for(let j = 0; j < Dataset[i].value.length; j++){
                            let k = Math.ceil((Dataset[i].value[j] - Dataset[i].stat.min) / interval);
                            if(k == 0)  k = 1;                           
                            temp[j] = k;
                        }
                        Dataset[i]['group'] = new Array();
                        for(let k = Dataset[i].stat.min; k < Dataset[i].stat.max; k += interval){
                            let tp = new Array();
                            let count = 0;

                            for(let j = 0; j < Dataset[i].value.length; j++){
                                if(k == Dataset[i].stat.min && k == Dataset[i].value[j])    count++;
                                if(Dataset[i].value[j]>k && Dataset[i].value[j]<=(k+interval))  count++;
                            }
                            tp = [k, k+interval, count];
                            Dataset[i]['group'].push(tp);
                        }
                        Dataset.push({'label':Dataset[i].label+"_Gaped", 'value':temp});
                        // for(let j = 0; j < attr[key][1]-1;j++){
                        //     for(let l = 0; l < interval; l++){
                        //         k++
                        //         Dataset[i].value[j*interval+l] = j+1;
                        //     }
                        //     m = j;
                        // }
                        // while(k < Dataset[i].value.length){  
                        //     Dataset[i].value[k] = m+2;
                        //     k++;
                        // }
                    }
                    else if(attr[key][0] == 'user-defined'){
                        let Tol = attr[key].length;
                        let tpl = new Array();
                        tpl = JSON.parse(JSON.stringify(Dataset[i]));
                        tpl.label = tpl.label+"_UserGaped";

                        for(let j = 1; j < Tol;j++){
                            for(let l = 0; l < Dataset[i].value.length; l++){
                                if((Dataset[i].value[l] >= attr[key][j][1]) && (Dataset[i].value[l] <= attr[key][j][2])){
                                    tpl.value[l] = attr[key][j][0];
                                }
                            }
                        }
                        Dataset.push(tpl)
                    }
                }
           });
        }
    }

    allData[1].Dataset = Dataset;
    return allData[1];
}
