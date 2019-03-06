import store from '../../store'
import { Conv, Dens, FillN, MaxM, Delete} from '../../store/actionCreate';
import {OneVarLinearRegression} from '../Models/MachineLearning/Regression/OneVarLinearRegression'
import { Scaler } from '../Models/MachineLearning/DataPreprocessing/Scaler';
import { FillNa } from '../Models/MachineLearning/DataPreprocessing/FillNa'
import React, { Component } from 'react'
import { Button } from 'antd'
import { withPropsAPI } from '@src';
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

class Run extends Component{
  showDetail = ()=>{
    // this.handleLegal()
    const { propsAPI } = this.props;
    console.log(propsAPI.save())

    const inf = propsAPI.save();

    // const action = UpINF(inf);
    // // console.log(action);
    // // console.log(inf);
    // store.dispatch(action);

    var Sourc = 0;
    var tag = 'Input';
    var stream = new Array();
    var attribute = new Array();
    var labelarray = new Array();


    if(inf.hasOwnProperty('edges')){
      let Deg = new Array(inf.nodes.length).fill(0);
      var sourceId = new Array(inf.nodes.length).fill(0);
      for(let i in sourceId) {
        sourceId[i] = new Array();
      }
      for (let indexE of inf.edges.keys()) {
        Sourc = inf.edges[indexE].target;
        let targetanchor = inf.edges[indexE].targetAnchor;
        let source = inf.edges[indexE].source;
        for (let indexN of inf.nodes.keys()) {
          if (Sourc === inf.nodes[indexN].id) {
            Deg[indexN]++;
            sourceId[indexN][targetanchor] = source;
          }
        }
      }
      for (var k = 0; k < inf.nodes.length; ) {
        for (let indexN of inf.nodes.keys()){
          if(Deg[indexN] === 0){
            k++;
            Deg[indexN]--;
            Sourc = inf.nodes[indexN].id;
            tag = inf.nodes[indexN].label;
            attribute = inf.nodes[indexN].attr;
            labelarray = inf.nodes[indexN].labelArray;
            stream.push({
                        'id':Sourc,
                        "label":tag,
                        "attribute":attribute,
                        "labelArray":labelarray,
                        "sourceId":sourceId[indexN]
                      });
            for (var i = 0; i < inf.edges.length; i++){
              if(Sourc === inf.edges[i].source){
                for (var m = 0; m < inf.nodes.length; m++){
                  if(inf.nodes[m].id === inf.edges[i].target){
                    Deg[m]--;
                  }
                }
              }
            }
          }
        }
      }
    }
    // if(inf.hasOwnProperty('edges')){
    // for (let indexN of inf.nodes.keys()) {
    //   if ('Input' === inf.nodes[indexN].label) {
    //     Sourc = inf.nodes[indexN].id;
    //     attribute = inf.nodes[indexN].attr
    //     stream.push({"label":tag,"attribute":attribute});
    //     break;
    //   }
    // }
    // for (var k = 0; k < inf.nodes.length; k++) {
    //   for (let indexE of inf.edges.keys()) {
    //     if (Sourc === inf.edges[indexE].source) {
    //       Sourc = inf.edges[indexE].target;
    //       for (let indexN of inf.nodes.keys()) {
    //         if (Sourc === inf.nodes[indexN].id) {
    //           tag = inf.nodes[indexN].label;
    //           attribute = inf.nodes[indexN].attr
    //           stream.push({"label":tag,"attribute":attribute})
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //   }
    // }
    console.log('stream:')
    console.log(stream);
    this.run(stream, propsAPI);
  }
  run=(stream, propsAPI)=>{
    for (let k = 0; k < stream.length; k++) {
      if(stream[k].label!=="本地数据"){
        const all_data = this.inputdata(stream[k].id, propsAPI);
        var outcome = new Array()
        switch (stream[k].label) {
          case '单变量线性回归':
              outcome.push(OneVarLinearRegression(all_data))
              this.outputdata(stream[k].id, outcome[0][2], propsAPI);
              break
          case '缺失值填充':
              outcome.push(FillNa(all_data))
              this.outputdata(stream[k].id, outcome[0][1], propsAPI);
              break
          case '归一化':
              outcome.push(Scaler(all_data))
              this.outputdata(stream[k].id, outcome[0][1], propsAPI);
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

        
      }
    }
  
    console.log("最终图信息")
    console.log(propsAPI.save())
    console.log("-------------------------------")
    //this.deletedata(propsAPI);
  }
 handleLegal = ()=> {
    const { propsAPI } = this.props;
    var isLegal = 0;
    var noneed = 1;
    const inf = propsAPI.save();

    if(inf.hasOwnProperty('edges')){
      if (inf.nodes.length > 1) {
        var Sourc;
        const lenE = inf.edges.length;
        const LenE =lenE;
        let path = new Array(inf.nodes.length).fill(0);

        for (let indexN of inf.nodes.keys()) {
          if ('Input' === inf.nodes[indexN].label) {
            Sourc = inf.nodes[indexN].id;
            path[indexN] = 1;
            noneed = 0;
            break;
          }
        }
        if(noneed === 0) {
          for (var k = 0; k < lenE; k++) {

            for (let indexE of inf.edges.keys()) {
              if (Sourc === inf.edges[indexE].source) {
                Sourc = inf.edges[indexE].target;

                for (let indexN of inf.nodes.keys()) {
                  if (inf.nodes[indexN].id === Sourc) {
                    if (path[indexN] === 0) {
                      if (k === LenE - 1 && inf.nodes[indexN].label === 'Output') {
                        isLegal = 1;
                        break;
                      } else {
                        path[indexN] = 1;
                        break;
                      }
                    } else {
                      noneed = 1;
                      break;
                    }
                  }
                }
                break;
              }
            }
            if (noneed === 1) {
              break;
            }
          }
        }
      }
    }
    if(isLegal === 1) {
      alert('legal');
    }else{
      alert('illegal');
    }

  }
  inputdata=(id, propsAPI)=>{
    const { find } = propsAPI;
    const currentitem = find(id);
    var all_data = [];
    const inf = propsAPI.save();
    let labelArray = [];
    if(currentitem.model.select_status > 1){
      const modelarray = currentitem.model.labelArray;
      for(let m in modelarray){
        let labelarr = [];
        for(let k in modelarray[m]){
          if(modelarray[m][k][1] === true)
            labelarr.push(modelarray[m][k][0])
        }
        labelArray.push(labelarr);
      }
    }
    else {
      const modelarray = currentitem.model.labelArray;
      for(let m in modelarray){
        if(modelarray[m][1] === true)
          labelArray.push(modelarray[m][0])
      }
    }
    console.log('labelArray:')
    console.log(labelArray);
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
    console.log('all_data:');
    console.log(all_data);
    return all_data;
  }
  outputdata=(id, outcome, propsAPI)=>{
    const { find, executeCommand, update } = propsAPI;
    const item = find(id);
    executeCommand(()=>{
      update(item, {
        ...outcome
      })
    })
  }
  deletedata=(propsAPI)=>{
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
  
  render(){
    return (
      <Button onClick={()=>this.showDetail()}>run</Button>
    );
  }
}

export default withPropsAPI(Run);