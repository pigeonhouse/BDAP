import React from 'react'
import { Modal, Table , Icon,Collapse,Row,Col,Button} from 'antd';
import {
  Command,
  NodeMenu,
  EdgeMenu,
  GroupMenu,
  MultiMenu,
  CanvasMenu,
  ContextMenu,
} from '@src';
import styles from './index.less';
import iconfont from '../../theme/iconfont.less';
import { withPropsAPI } from '@src';
import LineMarkerEcharts from './LineMarkerEcharts';
import Downlowd from '../DataOperate/download';
import GGEditor, { Flow, RegisterCommand } from '@src';
import { SeprtbyFeat } from '../DataOperate/DataProcess/SeprtbyFeat'

const Panel = Collapse.Panel;
var echarts = require('echarts');


class FlowContextMenu extends React.Component {
  state = { 
    loading:false,
    visible: false,
    Nvisible: false,
    Svisible:false,
    MlEvaluteVisible:false,
    evalution:[[]],
    // filterDropdownVisible:false
  }

  barChart = (indexOfFeature,data,showType)=>{
    console.log(data)
    var myChart = echarts.init(document.getElementById('main'));
    const chartData = SeprtbyFeat([
      [{all_attr:{labelArray:{public:['normal', 5]}}}],
      [{Dataset:[data]}]
    ]).group;
    if(showType === 'bar'){
      var xAxisGroup = new Array();
      var seriesGroup = [{
        name: '频数',
        type: 'bar',
        data: new Array()
      }];
      for(let i in chartData){
        xAxisGroup.push(chartData[i][0]);
        seriesGroup[0].data.push(chartData[i][2]);
      }
      myChart.setOption({
        xAxis: {
            data: xAxisGroup
        },
        yAxis: {},
        series: seriesGroup
    });
    }
    else if(showType === 'pie'){
      var seriesGroup = [{
        type: 'pie',
        data: new Array()
      }];
      for(let i in chartData){
        seriesGroup[0].data.push({
          value:chartData[i][2],
          name:chartData[i][0]
        });
      }
      myChart.setOption({
          series: [{
              type: 'pie',
              data: seriesGroup
          }]
      });
    }
  }

  Datum = () => {
    const { propsAPI } = this.props;
    const { find } = propsAPI;
    var currentId = propsAPI.getSelected()[0];
  
    const currentData = find(currentId).getModel().Dataset;
    var columns = new Array()
    for(let i = 0; i < currentData.length; i++){
      columns.push({
                   title : currentData[i].label,
                   dataIndex: currentData[i].label,
                   width : 50,
                   filterDropdown: (
                    <div>
                      <Button onClick={()=>{this.barChart(i,currentData[i],"bar")}}>柱状图</Button>
                      <br></br>
                      <Button onClick={()=>{this.barChart(i,currentData[i],"pie")}}>饼图</Button>
                    </div>
                    ),
                  // filterDropdownVisible: this.state.filterDropdownVisible,
                  // onFilterDropdownVisibleChange: ()=> this.setState({ filterDropdownVisible: true }),
                 })
    }
    this.setState({col:columns})
    console.log(columns)
    var datas = new Array()
    var ln;
    for(let i = 0; i < currentData.length; i++){
      if(currentData[i].value.hasOwnProperty('length')){
        ln = currentData[i].value.length;
        break;
      }
    }
    for(let i = 0; i < ln; i++){
      var temp = new Array()
      for(let j = 0; j < currentData.length; j++){
        temp[currentData[j].label] = currentData[j].value[i]
      }
      datas.push(temp)
    }

    var list = "";
    for(let i = 0; i < columns.length; i++){
      list+=columns[i].title;
      if(i+1 != columns.length)  list+=',';
      else  list+=' \n ';
    }
    
    let N = -1;
    Object.getOwnPropertyNames(datas[0]).forEach(function(key){
      N++;
    })
    for(let i=0;i < datas.length;i++){
      let j = 0;
      Object.getOwnPropertyNames(datas[i]).forEach(function(key){
        if(key != "length"){
          j++;
          list+=datas[i][key];
          if(j != N)  list+=','; 
          else  list+=' \n ';
        }
      })
    }

    this.setState({data:datas,list:list});
  }

  showNModal = () => {
    this.setState({
      Nvisible: true,
    });
    this.Datum();
  }
  handleNOk = (e) => {
    console.log(e);
    this.setState({
      loading: true,
    });
    setTimeout(()=>{
      this.setState({loading:false, Nvisible:false});
    },100)
  }
  handleNCancel = (e) => {
    console.log(e);
    this.setState({
      Nvisible: false,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
    this.Datum();

  }

  handleOk = (e) => {
    this.setState({
      visible: false,
      MlEvaluteVisible: false,
      col:[],
      data:[]
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
      MlEvaluteVisible: false,
      col:[],
      data:[]
    });
  }
  modelEvaluation = ()=>{
    const { propsAPI } = this.props;
    var currentId = propsAPI.getSelected()[0].id
    var saveData = propsAPI.save().nodes
    var currentNode = new Array()
  
    for(let i = 0; i < saveData.length; i++){
      if(currentId == saveData[i].id){       
          currentNode.push(saveData[i])
      }
    }
    currentNode = currentNode[0]
    if (currentNode.group == "ml"){
        var ev = currentNode.attr.evaluateResult
        this.setState({evalution:ev})
        this.setState({MlEvaluteVisible:true})
    }
    else alert("NOT A ML MODEL")
  }
  trans = () => {
    this.setState({
      loading: true,
    });
    setTimeout(()=>{
      this.setState({loading:false});
    },100)
  }

  render() {
   
    return (
      <ContextMenu className={styles.contextMenu}>
        <GGEditor style={{width:0, height:0}}>
          <Flow />
          <RegisterCommand 
          name="showpicture" 
          config={
            {
              queue: true,  
              enable(editor) {
                return true;
              }, 
            }
          }
          />
        </GGEditor>
        <NodeMenu>
          <Command name="copy">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
              <span>复制</span>
            </div>
          </Command>
          <Command name="delete">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
          <Command name="copy">
            <div className={styles.item} onClick={this.showModal}>
              <Icon type="form" />
              <span>数据预览</span>
            </div>
          </Command>
          <Command name="copy">
            <div className={styles.item} onClick={this.showNModal}>
              <Icon type="line-chart" />
              <span>图形化展示</span>
            </div>
          </Command>

          <Command name="copy">
            <div className={styles.item} onClick={this.modelEvaluation}>
              <Icon type="solution" />
              <span>模型评估</span>
            </div>
          </Command>

        </NodeMenu>
      

        <Modal title="模型评估" visible={this.state.MlEvaluteVisible}
          onOk={this.handleOk} onCancel={this.handleCancel} width={500}
        >
          <Collapse bordered={false} >
          {this.state.evalution.map((pair,index)=>{
            return (<Panel 
                      header={pair[0]+" : "+pair[1]}  
                      key={index} 
                      style={{fontSize:25,marginBottom: 24,border: 0}}>
                      <p style={{fontSize:15,lineHeight:2}}>{pair[2]}</p>
                    </Panel>)
          })}
          </Collapse>
        </Modal>

        <Modal
            title="Modal"
            visible={this.state.Nvisible}
            onOk={this.handleNOk}
            onCancel={this.handleNCancel}
            bodyStyle={{height: '450px'}}
            width={1100}
          >
          <LineMarkerEcharts trans={()=>this.trans()}/>
        </Modal>

        <Modal title="Basic Modal" visible={this.state.visible} width={1200} 
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
        <Row>
        <Col span={15}>
          <Table columns={this.state.col} dataSource={this.state.data} pagination={{ pageSize: 70 }} scroll={{ x:500, y: 300 }} height={800}  size="small" />
          </Col>
            
          <Col span={9}>
            <div id="main" style={{ width: 400, height: 400 }}></div>
            
          </Col>
          </Row>
        </Modal>



        <EdgeMenu>
          <Command name="delete">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
        </EdgeMenu>

        <GroupMenu>
          <Command name="copy">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
              <span>复制</span>
            </div>
          </Command>
          <Command name="delete">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
          <Command name="unGroup">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconUngroup}`} />
              <span>解组</span>
            </div>
          </Command>
        </GroupMenu>

        <MultiMenu>
          <Command name="copy">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
              <span>复制</span>
            </div>
          </Command>
          <Command name="paste">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`} />
              <span>粘贴</span>
            </div>
          </Command>
          <Command name="addGroup">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconGroup}`} />
              <span>成组</span>
            </div>
          </Command>
          <Command name="delete">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
        </MultiMenu>

        <CanvasMenu>
          <Command name="undo">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconUndo}`} />
              <span>撤销</span>
            </div>
          </Command>
          <Command name="redo">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconRedo}`} />
              <span>重做</span>
            </div>
          </Command>
          <Command name="pasteHere">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`} />
              <span>粘贴</span>
            </div>
          </Command>
        </CanvasMenu>

      </ContextMenu>
    );
  }
}

export default withPropsAPI(FlowContextMenu);
