export function fillNa(allData){
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
                let x = 1/(1+Math.exp(Dataset[i].value[j]));
                Dataset[i].value[j] = x;
            }      
        }
    }

    console.log(Dataset);
    allData[1].Dataset = Dataset;

    return allData[1];
}
