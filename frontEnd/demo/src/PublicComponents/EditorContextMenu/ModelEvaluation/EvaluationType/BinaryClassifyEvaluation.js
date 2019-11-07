import React from "react";
import {   RocSet     }from "../EvaluatePicture/roc";
import { Tabs,Table } from "antd";
import { PRCSet } from "../EvaluatePicture/prc";
import{FscoreSet} from "../EvaluatePicture/Fscore"
const { TabPane } = Tabs;
var echarts=require("echarts");
var loading=false;

var myChart=null;


//图列表
const panes = [
    { title: 'ROC曲线图', key: 'roc' },
    { title: 'PRC曲线图', key: 'prc' },
    { title: 'F值图', key: 'f-score' }
  ];
//取到的返回结果




//右表表中数据

class BinaryEvaluation extends React.Component{
    
    constructor(props){
        super();
        
        this.state = {
          visible:props.visible,
          activeKey:panes[0].key,
          data:props.data
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
        return RocSet(myChart,{
          loading:loading,
          data:this.state.data.ROC
        });
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
          case "roc":RocSet(myChart,{
            loading:loading,
            data:this.state.data.ROC
          });break;
          case "prc": PRCSet(myChart,{
          loading:loading,
          data:this.state.data.PRC
        });break;
          case "f-score":FscoreSet(myChart,{
            loading:loading,
            data:this.state.data.f1Score
          });break;
        }
    }
    }
    render(){
      const data=this.state.data;
      var dataSource=[];
      var columns=[];
      if(data!=[])
      {
       dataSource = [
        {
          key: '1',
          name: 'auPRC',
          value: data.auPRC
        },
        {
          key: '2',
          name: '准确率',
          value: data.auROC
        },
        
      ];
      //右表表项
      columns = [
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
    }
        return(
          
          
           <div >
            <Tabs onChange={this.onChange}
            activeKey={this.state.activeKey}type="card" style={{height:"100%",width:"100%"}}>
                {panes.map(pane => ( 
            <TabPane tab={pane.title} key={pane.key} >
             <div  >
                 <div id={pane.key} style={{height:"300px",width:"55%",float:"left"}}></div>
                 <div  style={{top:"40px",height:"300px",width:"40%",float:"right"}}>
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