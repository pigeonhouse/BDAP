import { array } from "ml-stat";

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
    var temp;
    var outcome = new Array();
    for(let i = 0; i < labelArray.length;i++){
        if(labelArray[i][1] == true){
            Object.keys(attr).forEach(function(key){
                if(key == labelArray[i][0]){
                    if(attr[key][0] == 'normal'){
                        let interval = parseInt(Dataset[i].value.length/attr[key][1]);
                        let k = 0,m;
                        for(let j = 0; j < attr[key][1]-1;j++){
                            for(let l = 0; l < interval; l++){
                                k++
                                Dataset[i].value[j*interval+l] = j+1;
                            }
                            m = j;
                        }
                        while(k < Dataset[i].value.length){  
                            Dataset[i].value[k] = m+2;
                            k++;
                        }
                    }
                    else if(attr[key][0] == 'user-defined'){
                        let Tol = attr[key].length;
                        for(let j = 1; j < Tol;j++){
                            for(let l = 0; l < Dataset[i].value.length; l++){
                                if((Dataset[i].value[l] >= attr[key][j][1]) && (Dataset[i].value[l] <= attr[key][j][2])){
                                    console.log(Dataset[i].value[l],attr[key][j][1],attr[key][j][2],attr[key][j][0])
                                    
                                    Dataset[i].value[l] = attr[key][j][0];
                                    console.log(Dataset[i].value[l])
                                }
                            }
                        }
                    }
                }
           });
        }
    }


    console.log('outcome')
    console.log(Dataset);
    allData[1].Dataset = Dataset;
    return allData[1];
}
