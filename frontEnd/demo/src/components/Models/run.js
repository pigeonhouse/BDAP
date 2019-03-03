import store from '../../store'
import { Conv, Dens, FillN, MaxM, Delete} from '../../store/actionCreate';
import {OneVarLinearRegression} from '../Models/MachineLearning/Regression/OneVarLinearRegression'
import { Scaler } from '../Models/MachineLearning/DataPreprocessing/Scaler';
import { FillNa } from '../Models/MachineLearning/DataPreprocessing/FillNa'
// var inf = store.getState().picture;

// function CONVNET(id) {
//   const action = Conv(id);
//   store.dispatch(action);
//   //console.log(store.getState().Dataset);
// };
// function DENSENET(id) {
//   const action = Dens(id);
//   store.dispatch(action);
//   //console.log(store.getState().Dataset);
// }

// function FILLNA(id) {
//   const action = FillN(id);
//   store.dispatch(action);
//   //console.log(store.getState().Dataset);
// }

// function MAXMINSCALER(id) {
//   const action = MaxM(id);
//   store.dispatch(action);
//   //console.log(store.getState().Dataset);
// }

// function DELETE() {
//   const action = Delete();
//   store.dispatch(action);
//   //console.log(store.getState().Dataset);
// }

// function INPUT(_id) {
//   // const action = Inp(id);
//   // store.dispatch(action);
//   // let inff = store.getState().Dataset;

//   // for(let k = 0; k < inff.length; k++){
//   //   if(inff[k].id === _id)
//   //     // console.log(inff[k].data);
//   // }
//   //对接upload
// }

// function OUTPUT(_id) {
//   let temStore = store.getState().Dataset;
//   let outpStore = [];

//   for(let k = 0; k < inf.edges.length; k++){
//     if(inf.edges[k].target === _id)
//       for(let p = 0; p < inf.nodes.length; p++){
//         if(inf.edges[k].source === inf.nodes[p].id){
//             let id = inf.nodes[p].id;
//             for(let m = 0; m < temStore.length; m++){
//               if(temStore[m].id === id){
//                 outpStore.push(temStore[m]);
//               }
//             }
//             break;
//         }
//       }
//   }
//   //outpStore为和对应output模块相连的模块，对应仓库中输出的所有元素集
//   //对接展示方案的函数
// }
function inputdata(id, propsAPI){
  const { find } = propsAPI;
  const currentitem = find(id);
  var all_data = [];
  const inf = propsAPI.save();
  let labelArray = [];

  const modelarray = currentitem.model.labelArray;
  for(let m in modelarray){
    if(modelarray[m][1] === true)
      labelArray.push(modelarray[m][0])
  }
  all_data.push({
    labelArray: labelArray,
    all_attr: currentitem.model.attr
  })
  for (let k in inf.edges){
    if(inf.edges[k].target === id){
      let item = find(inf.edges[k].source);
      var re = JSON.parse(JSON.stringify(item.model.Dataset))
      all_data.push({
        Dataset: re,
        length: item.model.length,
        targetAnchor: inf.edges[k].targetAnchor
      });
    }
  }
  return all_data;
}
function outputdata(id, outcome, propsAPI){
  const { find, executeCommand, update } = propsAPI;
  const item = find(id);
  executeCommand(()=>{
    update(item, {
      ...outcome
    })
  })
}
function deletedata(propsAPI){
  const inf = propsAPI.save().nodes;
  const { find, executeCommand, update } = propsAPI;
  for(let i in inf){
    if(inf[i].label !== 'Output' && inf[i].label !== 'Input'){
      const item = find(inf[i].id);
      const values = {Dataset:{}}
      executeCommand(()=>{
        update(item, {
          ...values
        })
      })
    }
  }
}

export function run(stream, propsAPI) {

  for (let k = 1; k < stream.length; k++) {
    const all_data = inputdata(stream[k].id, propsAPI);
    console.log("stream:")
    console.log(stream)
    var outcome = new Array()
    switch (stream[k].label) {
      case '单变量线性回归':
          outcome.push(OneVarLinearRegression(all_data))
          break
      case '缺失值填充':
          outcome.push(FillNa(all_data))
          break
      case '归一化':
          outcome.push(Scaler(all_data))
          break
      // case 'Input':
      //   // INPUT(stream[k].id);
      //   break;
      // case 'Output':
      //   OUTPUT(stream[k].id);
      //   break;
      // case 'DenseNet':
      //   DENSENET(stream[k].id);
      //   break;
      // case 'ConvNet':
      //   CONVNET(stream[k].id);
      //   break;
      // case 'FillNa':
      //   FILLNA(stream[k].id);
      //   break;
      // case 'MaxMinScaler':
      //   MAXMINSCALER(stream[k].id);
      //   break;
      default:
        break;
    }
    //let outcome = all_data[1];
    //console.log(outcome)
    outputdata(stream[k].id, outcome[0][1], propsAPI);
  }

  console.log("最终图信息")
  console.log(propsAPI.save())
  console.log("-------------------------------")
  //deletedata(propsAPI);
}