import store from '../../store'
import { Conv, Dens, FillN, MaxM, Delete} from '../../store/actionCreate';
var inf = store.getState().picture;

function CONVNET(id) {
  const action = Conv(id);
  store.dispatch(action);
  //console.log(store.getState().Dataset);
};
function DENSENET(id) {
  const action = Dens(id);
  store.dispatch(action);
  //console.log(store.getState().Dataset);
}

function FILLNA(id) {
  const action = FillN(id);
  store.dispatch(action);
  //console.log(store.getState().Dataset);
}

function MAXMINSCALER(id) {
  const action = MaxM(id);
  store.dispatch(action);
  //console.log(store.getState().Dataset);
}

function DELETE() {
  const action = Delete();
  store.dispatch(action);
  //console.log(store.getState().Dataset);
}

function INPUT(_id) {
  // const action = Inp(id);
  // store.dispatch(action);
  // let inff = store.getState().Dataset;

  // for(let k = 0; k < inff.length; k++){
  //   if(inff[k].id === _id)
  //     // console.log(inff[k].data);
  // }
  //对接upload
}

function OUTPUT(_id) {
  let temStore = store.getState().Dataset;
  let outpStore = [];

  for(let k = 0; k < inf.edges.length; k++){
    if(inf.edges[k].target === _id)
      for(let p = 0; p < inf.nodes.length; p++){
        if(inf.edges[k].source === inf.nodes[p].id){
            let id = inf.nodes[p].id;
            for(let m = 0; m < temStore.length; m++){
              if(temStore[m].id === id){
                outpStore.push(temStore[m]);
              }
            }
            break;
        }
      }
  }
  //outpStore为和对应output模块相连的模块，对应仓库中输出的所有元素集
  //对接展示方案的函数
}


export function run(stream) {

  //await load();
  // const model = createModel();
  // model.summary();
  // await train(model, () => showPredictions(model),b);

  for (let k = 0; k < stream.length; k++) {
    switch (stream[k].label) {
      case 'Input':
        // INPUT(stream[k].id);
        break;
      case 'Output':
        OUTPUT(stream[k].id);
        break;
      case 'DenseNet':
        DENSENET(stream[k].id);
        break;
      case 'ConvNet':
        CONVNET(stream[k].id);
        break;
      case 'FillNa':
        FILLNA(stream[k].id);
        break;
      case 'MaxMinScaler':
        MAXMINSCALER(stream[k].id);
        break;
      default:
        break;
    }
  }

  //DELETE();
}