import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import LineMarkerEcharts from './LineMarkerEcharts';

// class Datashow extends Component{
//     constructor(props){
//         super(props);
//     }

// //     ShowP = ()=> {

//         var echarts = require('echarts');
        
//         var echart=echarts.init(document.getElementById('main'));

//         var option={
//             baseOption:{
//                     title:{
//                     text:'模拟商店一周销售情况',
//                     subtext:'虚拟数据'
//                 },
//                 legend:{
//                     data:['购买金额','销售金额']
//                 },
//                 xAxis:{
//                     data:['周一','周二','周三','周四','周五','周六','周日']
//                 },
//                 yAxis:{

//                 },
//                 tooltip:{
//                     show:true,
//                     formatter:'系列名:{a}<br />类目:{b}<br />数值:{c}'
//                 },
//                 series:[{
//                     name:'购买金额',
//                     type:'bar',
//                     data:[200,312,431,241,175,275,369],
//                     markPoint: {
//                         data: [
//                             {type: 'max', name: '最大值'},
//                             {type: 'min', name: '最小值'}
//                         ]
//                     },
//                     markLine:{
//                         data:[
//                             {type:'average',name:'平均值',itemStyle:{
//                                 normal:{
//                                     color:'green'
//                                 }
//                             }}
//                         ]
//                     }
//                 },{
//                     name:'销售金额',
//                     type:'line',
//                     data:[321,432,543,376,286,298,400],
//                     markPoint: {
//                         data: [
//                             {type: 'max', name: '最大值'},
//                             {type: 'min', name: '最小值'}
//                         ]
//                     },
//                     markLine:{
//                         data:[
//                             {type:'average',name:'平均值',itemStyle:{
//                                 normal:{
//                                     color:'blue'
//                                 }
//                             }}
//                         ]
//                     }
//                 }]
//             },
//             media:[
//                 {
//                     //小与1000像素时候响应
//                     query:{
//                         maxWidth:1000
//                     },
//                     option:{
//                         title:{
//                             show:true,
//                             text:'测试一下'
//                         }
//                     }
//                 }
//             ]
//         };
//         //每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况
//         window.onresize = echart.resize;
//         echart.setOption(option);
//         console.log("okk");
//     }

//     render(){
//         return (
//             // <Button style={{minWidth:'206px',marginBottom:'10px'}} onClick={this.ShowP}>show</Button>
//             // <div>
//             //     <LineMarkerEcharts/>
//             // </div>    
//         );
//     }
// } 
class Datashow extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button style={{minWidth:'206px',marginBottom:'10px'}} onClick={this.showModal}>show</Button>
          <Modal
            title="Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            bodyStyle={{height: '500px'}}
            width={1000}
          >
            <LineMarkerEcharts/>
          </Modal>
          
      </div>
    );
  }
}

export default Datashow;
