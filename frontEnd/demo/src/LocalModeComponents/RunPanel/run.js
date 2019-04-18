import React, { Component } from 'react'
import { Button,Modal,Icon,message} from 'antd'
import { withPropsAPI } from '@src';

import { OneVarLinearRegression } from '../Models/MachineLearning/Regression/OneVarLinearRegression'
import { NaiveBayes } from '../Models/MachineLearning/Classification/NaiveBayes'
import { MutiVarLinearRegression } from '../Models/MachineLearning/Regression/MutiVarLinearRegression'
import { OneVarPolynomialRegression } from '../Models/MachineLearning/Regression/OneVarPolynomialRegression'
import { DecisionTreeRegression } from '../Models/MachineLearning/Regression/DecisionTree'
import { RandomForest } from '../Models/MachineLearning/Regression/RandomForest'
import { SVM } from '../Models/MachineLearning/Classification/SVM'

import { fillNa } from '../../PublicComponents/DataOperate/DataProcess/fillNa'
import { Onehot } from '../../PublicComponents/DataOperate/DataProcess/Onehot'
import { Randis } from '../../PublicComponents/DataOperate/DataProcess/Randis'
import { SelectCol } from '../../PublicComponents/DataOperate/DataProcess/SelectCol'
import { SeprtbyFeat } from '../../PublicComponents/DataOperate/DataProcess/SeprtbyFeat'
import { StrToNum } from '../../PublicComponents/DataOperate/DataProcess/StrToNum';
import { Nomalize } from '../../PublicComponents/DataOperate/DataProcess/Nomalize';
var echarts = require('echarts');
var current = 0;
var NeedDetection = 1;
class Run extends Component{
  state = { 
    visible: false,
  }
  showModal = (stream) => {
    this.setState({
      visible: true,
    });
    const init={
      method: 'POST', 
      body:JSON.stringify(stream),
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
    }
    fetch("http://localhost:5000/run",init)
    .then(res=>{
      console.log('---')
      console.log(res)
    })
    document.getElementById('dlChart').removeAttribute("_echarts_instance_")
    var myChart = echarts.init(document.getElementById('dlChart'));
    myChart.setOption({
      title: {
        text: '准确率'
      },
      tooltip: {
          trigger: 'axis',
          formatter: function (params) {
              params = params[0];
              return params.value[0]+'/'+params.value[1];
          },
          axisPointer: {
              animation: false
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
      },
      yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
      },
      series: [{
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: []
      }]
    })
    this.showLineChart([{
      value: [
        0, 0
      ]
    }], myChart);
  }
  showLineChart=(data, myChart)=>{
    setTimeout(()=>{
      // fetch("http://localhost:5000/trainingAccuracy")
      // .then(res => {
      //   if(res.status === 200){
      //     res.json().then(res=>{
      //       console.log(res)
      //     })
      //   }
      // })
      data.push({value:[data[data.length-1].value[0]+1, data[data.length-1].value[1]+1]})
      myChart.setOption({
        series: [{
          data: data
        }]
      })
      this.showLineChart(data, myChart)
    }, 1000);
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  showDetail = ()=>{
    const { propsAPI } = this.props;
    const inf = propsAPI.save();
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
        let sourceanchor = inf.edges[indexE].sourceAnchor;
        for (let indexN of inf.nodes.keys()) {
          if (Sourc === inf.nodes[indexN].id) {
            Deg[indexN]++;
            sourceId[indexN][targetanchor] = {
              source:source,
              sourceAnchor:sourceanchor
            };
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
            if(inf.nodes[indexN].group === 'ml'){
              const { find, update } = propsAPI;
              const item = find(Sourc);
              var temp = new Object();
              //error
              if(!labelarray.hasOwnProperty("predict_x")) labelarray['predict_x']=[];
              if(!labelarray.hasOwnProperty("train_x")) labelarray['train_x']=[];
              if(!labelarray.hasOwnProperty("train_y")) labelarray['train_y']=[];
              temp = JSON.parse(JSON.stringify(labelarray));
              temp['public'] = [...temp.predict_x, ...temp.predict_y];
              update(item,{labelArray:temp});
            }
            let labelarr = {};
            for(let i in labelarray){
              labelarr[i] = new Array();
              for(let j in labelarray[i]){
                if(labelarray[i][j][1] === true){
                  labelarr[i].push(labelarray[i][j][0]);
                }
              }
            }
            labelarray = JSON.parse(JSON.stringify(labelarr));
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
    console.log('stream:')
    console.log(stream);
    this.run(stream, propsAPI);
  }
  run = (stream, propsAPI)=>{  
    if(NeedDetection){
      console.log("------Detected---------")
      if(this.handleLegal())  return ;
      else NeedDetection = 0;
    }
    setTimeout(()=>{
      if(current !== stream.length){
        let k = current;
        const all_data = this.inputdata(stream[k], propsAPI);
        var outcome = new Array()
        if(stream[k].label !== '本地数据'){
          const { find } = propsAPI;
          const item = find(stream[k].id);
          const group = item.model.group;
          if(group == "feature"){
            if(stream[k].label !== '数据随机划分'){
              if(!all_data[0].labelArray.hasOwnProperty('public')){
                message.error("还没有选择字段，请在右边参数栏点击选择字段");
                const { find, update, executeCommand } = propsAPI;
                const nextitem = find(stream[k].id);
                var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
                value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
                executeCommand(() => {
                  update(nextitem, {keyConfig:{...value}});
                });
                NeedDetection = 1;
                return ;
              } 
            }
          }
          else if(group == 'ml'){
            if(all_data[0].labelArray.train_x.length == 0 || all_data[0].labelArray.train_y.length == 0
            || all_data[0].labelArray.predict_x.length == 0){
              message.error("还没有选择完字段，请在右边参数栏点击选择字段");
                const { find, update, executeCommand } = propsAPI;
                const nextitem = find(stream[k].id);
                var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
                value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
                executeCommand(() => {
                  update(nextitem, {keyConfig:{...value}});
                });
                NeedDetection = 1;
                return 0;
            }
          }
          switch (stream[k].label) {
            case '单变量线性回归':
                outcome = OneVarLinearRegression(all_data);
                break
            case '多变量线性回归':
                outcome = MutiVarLinearRegression(all_data);
                break
            case '单变量多项式回归':
                outcome = OneVarPolynomialRegression(all_data);
                break
            case '决策树回归':
                outcome = DecisionTreeRegression(all_data);
                break
            case '随机森林回归':
                outcome = RandomForest(all_data);
                break
            case '朴素贝叶斯':
                outcome = NaiveBayes(all_data)
                break
            case '支持向量机':
                outcome = SVM(all_data)
                break
            case '数据随机划分':
                outcome = Randis(all_data)
                break
            case '特征区间化':
                outcome = SeprtbyFeat(all_data)
                break  
            case '特征分组归类':
                outcome = StrToNum(all_data)
                break
            case '特征二进制化':
                outcome = Onehot(all_data)
                break
            case '数据类型转化':
                
                break
            case '缺失值填充':
                outcome = fillNa(all_data);
                break
            case '归一化':
                outcome = Nomalize(all_data);
                break
            case '卷积神经网络':
                this.showModal(stream);
                // runMnist()
                
                break
            default:
              break;
          }
          this.outputdata(stream[k].id, outcome, propsAPI);
          const { update, executeCommand } = propsAPI;
          const currentitem = find(stream[k].id);
          var value = JSON.parse(JSON.stringify(currentitem.model.keyConfig));
          value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
          executeCommand(() => {
            update(currentitem, {keyConfig:{...value}});
          });
        }
        if(k < stream.length-1 && stream[k+1].label !== '本地数据'){
          const { find, update, executeCommand } = propsAPI;
          const nextitem = find(stream[k+1].id);
          var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
          value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
          executeCommand(() => {
            update(nextitem, {keyConfig:{...value}});
          });
        }
        current++;
        if(current === stream.length){
          NeedDetection = 1;
          current = 0;
          console.log("最终图信息")
          console.log(propsAPI.save())
          console.log("-------------------------------")
          message.success("成功执行完毕!")
          //this.deletedata(propsAPI);
        }
        else this.run(stream, propsAPI);
      }
    },1000)

  }
  handleLegal = ()=> {
    NeedDetection = 1;
    const { propsAPI } = this.props;
    const inf = propsAPI.save();
    console.log("--------LegalTest---------")
    console.log(inf);
    if(!inf.hasOwnProperty("nodes")){
      message.error("先从左边拖来一些部件框吧")
      return 1;
    }
    if(!inf.hasOwnProperty("edges")){
      message.error("一个边都还没有连呢！")
      return 1;
    }
    
    var Sourc;
    var count_avali = 0, ind;
    let Deg = new Array(inf.nodes.length).fill(0);
    let Varif = new Array(inf.nodes.length).fill(0);
    for(let indexE of inf.edges.keys()){
      Sourc = inf.edges[indexE].target;
      for (let indexN of inf.nodes.keys()){
        if (Sourc === inf.nodes[indexN].id){
          Deg[indexN]++;
          Varif[indexN] = 1;
          break;
        }
      }
      // Sourc = inf.edges[indexE].source;
      // for (let indexN of inf.nodes.keys()){
      //   if (Sourc === inf.nodes[indexN].id){
      //     Varif[indexN] = 1;
      //     break;
      //   }
      // }
    }
    // Varif = Deg;
    // for(let c = 0; c < inf.nodes.length; c++){
    //   for(let i = 0; i < Deg.length; i++){
    //     if(Deg[i] === 0){
    //       Deg[i] = -1;
    //       count_avali++;
    //       for(let j = 0; j < inf.edges.length; j++)
    //         if(inf.nodes[i].id == inf.edges[j].source)
    //           for(let k = 0; k < inf.nodes.length; k++)
    //             if(inf.nodes[k].id == inf.edges[j].target)
    //               Deg[k]--;
    //       break;
    //     }
    //   }
    // }
    // if(count_avali < Deg.length){
    //   ind = 0;
    //   for(let k = 0; k < Deg.length; k++){
    //     if(Deg[k] != -1){
    //       ind = 1;
    //       const { find, update, executeCommand } = propsAPI;
    //       const nextitem = find(inf.nodes[k].id);
    //       var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
    //       value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
    //       executeCommand(() => {
    //         update(nextitem, {keyConfig:{...value}});
    //       });
    //     }
    //   }
    //   if(ind){
    //     message.error("注意:不能有回路!")
    //     return 3; //loop
    //   }
    // }
    // Deg = Varif;
    //开头是数据输入；且手动输入input必须有上传
    for(let i = 0; i < Deg.length; i++){
        if(Deg[i] === 0){
          const name = inf.nodes[i].group;
          if(name == "input"){
            if(inf.nodes[i].label == "本地数据" && inf.nodes[i].Dataset.length == 0){
              message.error("还没有上传文件给本地数据模块，请点击本地数据后，在右边参数栏点击'上传本地文件'!(或者您的文件是空的)");
              return 5; //本地数据没有上传
            }
          }
          else{
            const { find, update, executeCommand } = propsAPI;
            const nextitem = find(inf.nodes[i].id);
            var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
            value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
            executeCommand(() => {
              update(nextitem, {keyConfig:{...value}});
            });
            message.error("连线开头必须是数据模块哦!")
            return 4;  //开头连错，不是数据模块
          }
        }
    }

    for(let c = 0; c < inf.nodes.length; c++){
      for(let i = 0; i < Deg.length; i++){
        if(Deg[i] === 0){
          Deg[i] = -1;
          count_avali++;
          for(let j = 0; j < inf.edges.length; j++){
            if(inf.nodes[i].id == inf.edges[j].source){
              for(let k = 0; k < inf.nodes.length; k++){
                if(inf.nodes[k].id == inf.edges[j].target){
                  Deg[k]--;
                }
              }
            }
          }
          break;
        }
      }
    }
    if(count_avali < inf.nodes.length){ 
      for(let k = 0; k < Deg.length; k++){
        if(Deg[k] != -1){
          const { find, update, executeCommand } = propsAPI;
          const nextitem = find(inf.nodes[k].id);
          var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
          value.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg';
          executeCommand(() => {
            update(nextitem, {keyConfig:{...value}});
          });
        }
      }
      message.error("您有未连入的模块哦！给您用叉号标示出来了")
      return 2; //有未连入的
    }
    return 0; 
  }
  inputdata=(stream, propsAPI)=>{
    const { find } = propsAPI;
    var all_data = [];

    all_data.push({
      labelArray: stream.labelArray,
      all_attr: stream.attribute
    })
    const sourceId = stream.sourceId;
    for(let i in sourceId){
      let item = find(sourceId[i].source);
      if(item.model.anchor[1] === 1){
        all_data.push({
          Dataset: JSON.parse(JSON.stringify(item.model.Dataset)),
        })
      }
      else {
        all_data.push({
          Dataset: JSON.parse(JSON.stringify(item.model.Dataset[sourceId[i].sourceAnchor-item.model.anchor[0]])),
        })
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
      <div>
        
        <Button onClick={()=>this.showDetail()} style={{border:0,backgroundColor:'#343941',color:"#ddd",fontSize:25}}>
            <Icon type="play-circle" style={{fontSize:25}}/>运行
        </Button>

        <Modal title="Deep Learning" visible={this.state.visible}
            onOk={this.handleOk} onCancel={this.handleCancel} width={900}
          >
            <div id="dlChart" style={{ maxWidth: 350, height: 280 }}> </div>
        </Modal>
      </div>
    );
  }
}

export default withPropsAPI(Run);