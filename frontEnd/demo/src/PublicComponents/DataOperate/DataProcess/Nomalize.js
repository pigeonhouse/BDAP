export function Nomalize(allData){
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
        if(labelArray[i][1] == true && Dataset[i].stat.type == "number"){
            for(let j = 0; j < Dataset[i].value.length; j++){
                if(Dataset[i].value[j]!=null && typeof(Dataset[i].value[j])=="number"){
                    let x = (Dataset[i].value[j]-Dataset[i].stat.min)/(Dataset[i].stat.max-Dataset[i].stat.min);
                    Dataset[i].value[j] = x;
                }
                else{
                    //process string and null
                }
            }      
        }
    }

    console.log(Dataset);
    allData[1].Dataset = Dataset;

    return allData[1];
}
