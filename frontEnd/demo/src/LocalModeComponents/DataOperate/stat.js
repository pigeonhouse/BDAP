import min from 'ml-array-min';
import max from 'ml-array-max';
import mean from 'ml-array-mean';
import median from 'ml-array-median';
import variance from 'ml-array-variance';
import standardDeviation from 'ml-array-standard-deviation';

export function Stat(n){
    var stat;
    var temp = 0, Min;
    var total, tep, count;
    for(let i = 0;i < n.length; i++){   

      for(let j = 0; j < n[i].value.length;j++){
        if(n[i].value[j] != null && typeof(n[i].value[j]) == "number"){
          Min = n[i].value[j];
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

      const Max = max(n[i].value);
      const Median = median(n[i].value);
      const Variance = variance(n[i].value);
      const StandardDeviation = standardDeviation(n[i].value);
      total = 0;
      count = 0;
      for(let j = 0; j < n[i].value.length;j++){
        if(n[i].value[j] == null ) count++;
        if(n[i].value[j] != null && n[i].value[j] < Min) Min = n[i].value[j];
        total+=n[i].value[j];
      }
      // let med = new Array;
      // for(let j = 0; j < n[i].value.length;j++){
      //   med[j] = n[i].value[j];
      // }
      // for(let j = 0; j < n[i].value.length;j++){
      //   for(let k = j+1; k < n[i].value.length;k++){
      //     if(med[j] > med[k]){
      //       tep = med[j];
      //       med[j] = med[k];
      //       med[k] = tep;
      //     }
      //   }
      // }

      stat = {};
      stat.max = Max;
      stat.min = Min;
      stat.numOfNull = count;
      stat.average = total/n[i].value.length;
      stat.median = Median;
      stat.variance = Variance;
      stat.standardDeviation = StandardDeviation;
      stat.type = 'number';
      temp = 0;
      n[i].stat = stat;
    }
    console.log("stat");
    console.log(n);
    return n;
}