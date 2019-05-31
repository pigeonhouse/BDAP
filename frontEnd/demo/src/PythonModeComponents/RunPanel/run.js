import React, { Component } from 'react'
import { Button, Modal, Icon, message, Row, Col, List } from 'antd'
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

import { inputdata } from '../../PublicComponents/HandleStream/streamRunner'
import { outputdata } from '../../PublicComponents/HandleStream/streamRunner'
import { generateStream } from '../../PublicComponents/HandleStream/generateStream'
import { isLegal } from '../../PublicComponents/HandleStream/isLegal'

var echarts = require('echarts');
var current = 0;
class Run extends Component{
  state = { 
    visible: false,
    currentStatus: [
      {title:`迭代次数:`, value:0},
      {title:`准确率:`, value:0},
      {title:`损失函数:`, value:0},
      {title:`学习率:`, value:0},
      {title:`最终准确率:`, value:'未完成'}
    ]
  }
  showModal = (stream) => {
    this.setState({
      visible: true,
      currentStatus: [
        {title:`迭代次数:`, value:0},
        {title:`准确率:`, value:0},
        {title:`损失函数:`, value:0},
        {title:`学习率:`, value:0},
        {title:`最终准确率:`, value:'未完成'}
      ]
    });
    const init={
      method: 'POST', 
      body:JSON.stringify(stream),
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
    }
    fetch("http://10.105.222.92:5000/runPython",init)
    .then(res=>{
      if(res.status === 200)
        res.json().then(res=>{
          const currentStatus = this.state.currentStatus;
          currentStatus[4].value = res;
          this.setState({currentStatus});
        })
    })
    document.getElementById('accuracyChart').removeAttribute("_echarts_instance_")
    var accuracyChart = echarts.init(document.getElementById('accuracyChart'));
    document.getElementById('lessChart').removeAttribute("_echarts_instance_")
    var lessChart = echarts.init(document.getElementById('lessChart'));
    document.getElementById('learningRateChart').removeAttribute("_echarts_instance_")
    var learningRateChart = echarts.init(document.getElementById('learningRateChart'));
    accuracyChart.setOption({
      title: {
        text: '准确率'
      },
      grid: {
        left: '0.1%',
        containLabel: true
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
          boundaryGap: false,
      },
      series: [{
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: []
      }]
    })
    lessChart.setOption({
      title: {
        text: '损失函数'
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
      grid: {
        left: '0.1%',
        containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
      },
      yAxis: {
          type: 'value',
          boundaryGap: false,
      },
      series: [{
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: []
      }]
    })
    learningRateChart.setOption({
      title: {
        text: '学习率'
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
          boundaryGap: false,
      },
      series: [{
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: []
      }],
      grid: {
        left: '0.1%',
        containLabel: true
      },
    })
    accuracyChart.showLoading();
    lessChart.showLoading();
    learningRateChart.showLoading();
    this.showLineChartFirst([], [], [], accuracyChart, lessChart, learningRateChart);
  }
  showLineChartFirst=(dataa, datal, datar, accuracyChart, lessChart, learningRateChart)=>{
    fetch("http://10.105.222.92:5000/trainingAccuracy")
    .then(res => {
      if(res.status === 200){
        res.json().then(res=>{
          if(Number(res.round) === 0 && Number(res.accuracy) === 0 &&
            Number(res.learning_rate) === 0 && Number(res.loss) === 0 ){
            if(dataa.length === 0)
            this.showLineChartFirst(dataa, datal, datar, accuracyChart, lessChart, learningRateChart);
          }
          else {
            accuracyChart.hideLoading();
            lessChart.hideLoading();
            learningRateChart.hideLoading();
            dataa.push({value:[res.round, res.accuracy]});
            datar.push({value:[res.round, res.learning_rate]});
            datal.push({value:[res.round, res.loss]});
            var currentStatus = this.state.currentStatus;
            currentStatus[0].value = Number(res.round);
            currentStatus[1].value = Number(res.accuracy);
            currentStatus[2].value = Number(res.loss);
            currentStatus[3].value = Number(res.learning_rate);
            this.setState({currentStatus});
            accuracyChart.setOption({
              series: [{
                data: dataa
              }]
            })
            lessChart.setOption({
              series: [{
                data: datal
              }]
            })
            learningRateChart.setOption({
              series: [{
                data: datar
              }]
            })
            this.showLineChart(dataa, datal, datar, accuracyChart, lessChart, learningRateChart);
          }
        })
        .catch(e=>{
          setTimeout(()=>{
          this.showLineChartFirst(dataa, datal, datar, accuracyChart, lessChart, learningRateChart);
          }, 100);
        })
      }
    })
  }
  showLineChart=(dataa, datal, datar, accuracyChart, lessChart, learningRateChart)=>{
    setTimeout(()=>{
      fetch("http://10.105.222.92:5000/trainingAccuracy")
      .then(res => {
        if(res.status === 200){
          return res.json();
        }
      })
      .then(res=>{
        if(Number(res.round) !== 0 || Number(res.accuracy) !== 0 ||
          Number(res.learning_rate) !== 0 || Number(res.loss) !== 0 ){
            dataa.push({value:[res.round, res.accuracy]});
            datar.push({value:[res.round, res.learning_rate]});
            datal.push({value:[res.round, res.loss]});
            var currentStatus = this.state.currentStatus;
            currentStatus[0].value = Number(res.round);
            currentStatus[1].value = Number(res.accuracy);
            currentStatus[2].value = Number(res.loss);
            currentStatus[3].value = Number(res.learning_rate);
            this.setState({currentStatus});
            accuracyChart.setOption({
              series: [{
                data: dataa
              }]
            })
            lessChart.setOption({
              series: [{
                data: datal
              }]
            })
            learningRateChart.setOption({
              series: [{
                data: datar
              }]
            })
            this.showLineChart(dataa, datal, datar, accuracyChart, lessChart, learningRateChart);
        }
      })
      .catch(e=>{
        console.log(e)
        setTimeout(()=>{
          this.showLineChart(dataa, datal, datar, accuracyChart, lessChart, learningRateChart);
        }, 100);
      })
    }, 100);
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
  onClickButton = ()=>{
    const { propsAPI } = this.props;
    const stream = generateStream(propsAPI);
    this.run(stream, propsAPI);
  }
  changeStatusColor=(id, color)=>{
    const { propsAPI } = this.props;
    const { find, update, executeCommand } = propsAPI;
    const nextitem = find(id);
    var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
    value.state_icon_url = color;
    executeCommand(() => {
      update(nextitem, {keyConfig:{...value}});
    });
  }
  selectFunction=()=>{
    switch (stream) {
      // case '单变量线性回归':
      //     return OneVarLinearRegression(all_data);
      // case '多变量线性回归':
      //     return MutiVarLinearRegression(all_data);
      // case '单变量多项式回归':
      //     return OneVarPolynomialRegression(all_data);
      // case '决策树回归':
      //     return DecisionTreeRegression(all_data);
      // case '随机森林回归':
      //     return RandomForest(all_data);
      // case '朴素贝叶斯':
      //     return NaiveBayes(all_data)
      // case '支持向量机':
      //     return SVM(all_data)
      // case '数据随机划分':
      //     return Randis(all_data)
      // case '特征区间化':
      //     return SeprtbyFeat(all_data) 
      // case '特征分组归类':
      //     return StrToNum(all_data)
      // case '特征二进制化':
      //     return Onehot(all_data)
      // case '缺失值填充':
      //     return fillNa(all_data);
      // case '归一化':
      //     return Nomalize(all_data);
      case '训练':
          return this.showModal(stream);              
      default:
          return ;
    }
  }
  run = (stream, propsAPI)=>{  
    // if(isLegal())  return ;
 
    setTimeout(()=>{
      if(current !== stream.length){
        let k = current;
        const all_data = inputdata(stream[k], propsAPI);
        var outcome = new Array()
        if(stream[k].label !== '本地数据'){
          const { find } = propsAPI;
          const item = find(stream[k].id);
          const group = item.model.group;
          if(group == "feature"){
            if(stream[k].label !== '数据随机划分'){
              if(!all_data[0].labelArray.hasOwnProperty('public')){
                message.error("还没有选择字段，请在右边参数栏点击选择字段");
                this.changeStatusColor(stream[k].id, 
                 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg');
                return ;
              } 
            }
          }
          else if(group == 'ml'){
            if(all_data[0].labelArray.train_x.length == 0 || all_data[0].labelArray.train_y.length == 0
            || all_data[0].labelArray.predict_x.length == 0){
              message.error("还没有选择完字段，请在右边参数栏点击选择字段");
              this.changeStatusColor(stream[k].id, 
                'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg');
                return 0;
            }
          }
          selectFunction(stream[k].label, all_data);
          // outputdata(stream[k].id, outcome, propsAPI);
          this.changeStatusColor(stream[k].id, 
            'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg');
        }
        if(k < stream.length-1 && stream[k+1].label !== '本地数据'){
          this.changeStatusColor(stream[k+1].id, 
            'https://loading.io/spinners/palette-ring/index.rotate-palette-loader.svg');
        }
        current++;
        if(current === stream.length){
          NeedDetection = 1;
          current = 0;
          console.log("最终图信息")
          console.log(propsAPI.save())
          console.log("-------------------------------")
          message.success("成功执行完毕!")
        }
        else this.run(stream, propsAPI);
      }
    },200)

  }
  render(){
    return (
      <div>  
        <Button onClick={()=>this.onClickButton()} style={{border:0,backgroundColor:'#343941',color:"#ddd",fontSize:25}}>
            <Icon type="play-circle" style={{fontSize:25}}/>运行
        </Button>

        <Modal title="Deep Learning" visible={this.state.visible}
            centered={true} style={{ top: 10 }}
            onOk={this.handleOk} onCancel={this.handleCancel} width={900}
        >
          <Row>
            <Col span={12} id="accuracyChart" style={{ height: 280 }}> </Col>
            <Col span={12} style={{ height: 280 }}>
              <List
                size="small"
                style={{margin:'50px', marginTop:0}}
                header={<div>当前状态</div>}
                bordered
                dataSource={this.state.currentStatus}
                renderItem={item => (<List.Item><Col span={8}>{item.title}</Col>{item.value}</List.Item>)}
              />
            </Col>
          </Row>
          <Row>
            <Col span = {12} id="lessChart" style={{ height: 280 }}> </Col>
            <Col span = {12} id="learningRateChart" style={{  height: 280 }}> </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default withPropsAPI(Run);