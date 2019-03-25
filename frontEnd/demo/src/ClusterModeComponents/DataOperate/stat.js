export function Stat(n){
    var stat;
    var temp = 0;
    var max,min,total,tep;
    for(let i = 0;i < n.length; i++){   
      for(let j = 0; j < n[i].value.length;j++){
        if(n[i].value[j] != null && typeof(n[i].value[j]) == "number"){
          max=min=n[i].value[j];
          temp = 1;
          break;
        }
      }
      if(temp !== 1){
        stat = {}
        stat.value = new Array();
        var w;
        for(let j = 0; j < n[i].value.length;j++){
          tep = 0;
          for(w = 0; w < stat.value.length; w++){
            if(stat.value[w].name == n[i].value[j]){
              tep = 1;
              break;
            }
          }
          if(tep == 1){
            stat.value[w].count++;
          }
          else{
            stat.value[w] = {};
            stat.value[w].name = n[i].value[j];
            stat.value[w].count = 1;
          }
        }
        stat.type= 'string';
        n[i].stat = stat;
        continue;
      }
      total = 0;
      for(let j = 0; j < n[i].value.length;j++){
        if(n[i].value[j] > max) max = n[i].value[j];
        if(n[i].value[j] != null && n[i].value[j] < min) min = n[i].value[j];
        total+=n[i].value[j];
      }
      let med = new Array;
      for(let j = 0; j < n[i].value.length;j++){
        med[j] = n[i].value[j];
      }
      for(let j = 0; j < n[i].value.length;j++){
        for(let k = j+1; k < n[i].value.length;k++){
          if(med[j] > med[k]){
            tep = med[j];
            med[j] = med[k];
            med[k] = tep;
          }
        }
      }
      tep = Math.floor(n[i].value.length/2);
      stat = {};
      stat.max = max;
      stat.min = min;
      stat.average = total/n[i].value.length;
      stat.media = med[tep];
      stat.type = 'number';
      temp = 0;
      n[i].stat = stat;
    }
    return n;
}