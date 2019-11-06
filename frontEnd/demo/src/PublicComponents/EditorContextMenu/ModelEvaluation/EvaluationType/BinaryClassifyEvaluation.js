import React from "react";
import {   RocSet     }from "../EvaluatePicture/roc";
import { Tabs,Table } from "antd";
import { KSSet } from "../EvaluatePicture/ks.JS";
const { TabPane } = Tabs;
var echarts=require("echarts");
var loading=false;
var style={
	xLabel:"TP",
	yLabel:"FP",
	color:"#509ee3"
};
var myChart=null;
var titleText="title";
var prop={
	chartStyle:style,
	loading:loading,
	titleText:titleText
};
//图列表
const panes = [
    { title: 'ROC曲线图', key: 'roc' },
    { title: 'KS曲线图', key: 'ks' },
  ];
//右表表中数据
const dataSource = [
    {
      key: '1',
      name: 'F1Score',
      value: 0.7
    },
    {
      key: '2',
      name: 'RMSE',
      value: 0.556
    },
    {
      key: '3',
      name: 'AUC',
      value: 0.8
    },
  ];
  //右表表项
  const columns = [
    {
      title: '评价指标',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
    },
  ];
class BinaryEvaluation extends React.Component{
    
    constructor(props){
        super();
        
        this.state = {
          visible:props.visible,
          activeKey:panes[0].key
        }
        
      }
    //标签页变换处理
      onChange = activeKey => {
        this.setState({ activeKey });
      };
      //设置默认标签页图表
      componentDidMount(){
        
        console.log(document.getElementById(panes[0].key));
        myChart=echarts.init(document.getElementById(panes[0].key));
        return RocSet(myChart,prop);
    }
    //切换标签页更换图
    componentDidUpdate(){
    if(this.props.visible==true)
    {
        myChart.clear();
        console.log(document.getElementById(this.state.activeKey));
        myChart=echarts.init(document.getElementById(this.state.activeKey));
        switch(this.state.activeKey)
        {
          case "roc":RocSet(myChart,prop);break;
         case "ks":KSSet(myChart,prop);break;
        }
    }
    }
    render(){
        return(
           <div >
            <Tabs onChange={this.onChange}
            activeKey={this.state.activeKey}type="card" style={{height:"100%",width:"100%"}}>
                {panes.map(pane => ( 
            <TabPane tab={pane.title} key={pane.key} >
             <div  >
                 <div id={pane.key} style={{height:"300px",width:"60%",float:"left"}}></div>
                 <div  style={{top:"40px",height:"300px",width:"40%",float:"left"}}>
                 <Table bordered dataSource={dataSource} columns={columns} />
            </div>

			</div>
            </TabPane>))}		
            </Tabs>
            
           
            </div> 
        )
    }
}
export default BinaryEvaluation;