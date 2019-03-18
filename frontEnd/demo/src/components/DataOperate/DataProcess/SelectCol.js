export function SelectCol(allData){

    var Dataset = allData.Dataset;
    var tem, temp;
    var labelArray = new Array();
    var labelArray1 = new Array();
    for(let i = 0; i < Dataset.length ; i++){
        tem = 0;
        for(let j = 0; j < allData.labelArray.public.length; j++){
            if(Dataset[i].label == allData.labelArray.public[j]){
                tem = 1;
            }
        }
        temp = new Array(); 
        if(tem == 1){
            temp = [allData.labelArray.public[j], true];
        }
        else{
            temp = [allData.labelArray.public[j], false];
        }
        labelArray.push(temp);
        labelArray1.push(temp);
    }
    // var Dataset = [[{label:'id',value:1}],[{label:'age',value:1}],[{label:'score',value:1}]]
    // var labelArray = [["id",true],["age",false],["score",true]];
    // var labelArray1 = [["id",true],["age",false],["score",true]];
    // console.log("xxxxxxxxxxxxxxxxxxxx");
    // console.log(labelArray);
    // console.log(Dataset);
    var c = 0;
    for(let i = 0; i < labelArray.length;i++){
        
        if(labelArray[i][1] == false){
            Dataset.splice(c, 1);
            labelArray1.splice(c, 1);
            // allData.labelArray.splice(c,1);
        }
        else c++;
        // console.log("111111");
        // console.log(labelArray);
        // console.log(Dataset);
        // console.log(labelArray.length);
        // console.log(i);
    }
    // console.log("xxxxxxxxxxxxxxxxxxxx");
    // console.log(labelArray1);
    // console.log(Dataset);

    allData.Dataset = Dataset;
    allData.labelArray = labelArray1;

    return allData;
}
