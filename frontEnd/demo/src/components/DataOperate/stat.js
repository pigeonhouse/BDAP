export function fillNa(n,max){
    var temp = null;
        var max,min,media,total,tep;
        var c = 0;
        for(let i = 0;i < n.length; i++){   
          for(let j = 0; j < n[i].value.length;j++){
              if(n[i].value[j] != null && typeof(n[i].value[j]) == "number"){
                max=min=n[i].value[j];
                temp = 1;
                break;
              }
          }
          if(temp != 1){
            stat[c] = new Array();
            stat[c]['label'] = n[i].label;
            stat[c]['value'] = new Array();
            var w;
            for(let j = 0; j < n[i].value.length;j++){
              tep = 0;
              for(w =0; w < stat[c]['value'].length; w++){
                if(stat[c]['value'][w].name == n[i].value[j]){
                  tep = 1;
                  break;
                }
              }
              if(tep == 1){
                stat[c]['value'][w].count++;
              }
              else{
                stat[c]['value'][w] = new Array();
                stat[c]['value'][w]['name'] = n[i].value[j];
                stat[c]['value'][w]['count'] = 1;
              }
            }
            stat[c]['type'] = 'string';
            c++;
            temp = null;
            continue;
          }
          total=0;
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
          stat[c] = new Array();
          stat[c]['label'] = n[i].label;
          stat[c]['max']  = max;
          stat[c]['min'] = min;
          stat[c]['average'] = total/n[i].value.length;
          stat[c]['media'] = med[tep];
          stat[c]['type'] = 'number';
          c++;
        }
        return stat;
}