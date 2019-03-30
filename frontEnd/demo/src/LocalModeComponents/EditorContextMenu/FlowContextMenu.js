import React from 'react'
import { Modal, Table , Icon,Collapse,Row,Col,Button,Cascader} from 'antd';
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
    evaluation:[[]],
    compareVisible:false,
    // filterDropdownVisible:false
  }

  Chart = (indexOfFeature,data,showType)=>{
    this.setState({
      currentIndex:indexOfFeature,
      compareVisible:true
    })
    document.getElementById('main').removeAttribute("_echarts_instance_")
    var myChart = echarts.init(document.getElementById('main'));
    var chartData = [
      {all_attr:{},
        labelArray:{public:[data.label]}
      },
      {Dataset:[data]}
    ];
    chartData[0].all_attr[`${data.label}`] = ['normal', 3];
    chartData = SeprtbyFeat(chartData)['Dataset'][0].group;
    if(showType === 'bar'){
      var xAxisGroup = new Array();
      var seriesGroup = [{
        name: '频数',
        type: 'bar',
        data: new Array()
      }];
      for(let i in chartData){
        xAxisGroup.push(`${parseInt(chartData[i][0])}`+'-'+`${parseInt(chartData[i][1])}`);
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

      document.getElementById('main').removeAttribute("_echarts_instance_")
      var myChart = echarts.init(document.getElementById('main'));

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
          series: seriesGroup
      });
    }
    else if(showType === 'box'){
      document.getElementById('main').removeAttribute("_echarts_instance_")
      var myChart = echarts.init(document.getElementById('main'));
      let Data = echarts.dataTool.prepareBoxplotData(this.state.currentData[indexOfFeature].value)
      myChart.setOption({
        series:[{
          data:Data.outliers
        }]
      })

    }
  }

  Datum = () => {
    const { propsAPI } = this.props;
    var item = propsAPI.getSelected()[0];
    const currentData = item.getModel().Dataset;
    var columns = new Array()
    console.log("------------------")
    console.log(currentData)
    for(let i = 0; i < currentData.length; i++){
      let first = currentData[i].value[0]
      // let len = 50
      // if(first!=null){
      //   len = first.length>10?50:500
      // }
      columns.push({
                   title : currentData[i].label,
                   dataIndex: currentData[i].label,
                   width : 1000 ,
                   filterDropdown: (
                    <div>
                      <Button onClick={()=>{this.Chart(i,currentData[i],"bar")}}>柱状图</Button>
                      <br></br>
                      <Button onClick={()=>{this.Chart(i,currentData[i],"pie")}}>饼图</Button>
                      <br></br>
                      <Button onClick={()=>{this.Chart(i,currentData[i],"box")}}>箱线图</Button>
                    </div>
                    ),
                  // filterDropdownVisible: this.state.filterDropdownVisible,
                  // onFilterDropdownVisibleChange: ()=> this.setState({ filterDropdownVisible: true }),
                 })
    }
    this.setState({currentData:currentData})
    this.setState({col:columns})

    let la = item.getModel().labelArray.public
    la = la.map(a=>a[0])
    this.setState({labelArray:la})

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
    const { getSelected } = propsAPI;
    const item = getSelected()[0];
    const currentNode = item.getModel();
    if (currentNode.group == "ml"){
        var ev = currentNode.evaluation;
        this.setState({evaluation:ev})
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

  onChange=(chosenName)=> {

    let data = this.state.currentData

    if(chosenName[0] != "None"){

        console.log(data)
        var xName = data[this.state.currentIndex].label
        var xData = data[this.state.currentIndex].value
        var yData = []
        var yName = []
        for(let i = 0;i<data.length; i++){
          if(data[i].label == chosenName[0]){
            yData.push(data[i].value)
            yName.push(data[i].label)
          }
        }
        yData = yData[0]
        yName = yName[0]

        var linChartData = []
        for(let i = 0; i < xData.length; i++){
            linChartData.push([xData[i],yData[i]])
        }

        document.getElementById('main').removeAttribute("_echarts_instance_")
        var myChart =echarts.init(document.getElementById('main'));
        
        myChart.setOption({
            xAxis: {name:xName},
            yAxis: {name:yName},
            series: [{
                symbolSize: 6,
                data: linChartData,
                type: 'scatter'
            }]
          })
        }

  }

  compare=()=>{
    if(this.state.compareVisible){

      var options = [{value:"None",label:"None"}]

      let labelarray = this.state.labelArray
      for(let i = 0; i<labelarray.length; i++){
          options.push({value:labelarray[i],label:labelarray[i]})
      }
      return(
        <div>
          <span>compare to  </span>
          <Cascader defaultValue={["None"]} options={options} onChange={this.onChange} size="small" />
        </div>
      )
    }
  }

  staticInformation=()=>{
    if(this.state.compareVisible){
      console.log("--------------")
      console.log(this.state.currentData)

      let data = this.state.currentData
      var statics = data[this.state.currentIndex].stat
      if(statics.type == "number"){
          return(
            <div>
                <Col span={10}>

                  <Row style={{marginBottom:10}}>
                    <span>平均值：</span>
                    <span>{statics.average}</span>
                  </Row>

                  <Row style={{marginBottom:10}}>
                  <span>最大值：</span>
                  <span>{statics.max}</span>
                  </Row>

                  <Row style={{marginBottom:10}}>
                  <span>方差：</span>
                  <span>{statics.variance}</span>
                  </Row>

                  <Row style={{marginBottom:10}}>
                  <span>缺失值个数：</span>
                  <span>{statics.numOfNull}</span>
                  </Row>

                  
                </Col>
                <Col span={12}>
                  <Row style={{marginBottom:10}}>
                  <span>中位数：</span>
                  <span>{statics.median}</span>
                  </Row>
                  <Row style={{marginBottom:10}}>
                  <span>最小值：</span>
                  <span>{statics.min}</span>
                  </Row>
                  <Row style={{marginBottom:10}}>
                  <span>标准差：</span>
                  <span>{statics.standardDeviation}</span>
                  </Row>
                  
                </Col>
                
            </div>
          )
      }else if (statics.type == "string"){
        let data = this.state.currentData
        var statics = data[this.state.currentIndex].stat
        let numOfNull = 0
        for(let i = 0; i<statics.value.length; i ++){
          if(statics.value[i].name==null){
              numOfNull = statics.value[i].count
          }
        }

        let uniqueValue = statics.value.length
          return(
            <div>
              <Row style={{marginBottom:10}}>
                  <span>缺失值个数：</span>
                  <span>{numOfNull}</span>
                  </Row>

                  <Row style={{marginBottom:10}}>
                  <span>不同值个数：</span>
                  <span>{uniqueValue}</span>
                  </Row>
            
              
            </div>
          )
      }

      return (<div></div>)

      
    }
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
          {this.state.evaluation.map((pair,index)=>{
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

        <Modal  title="Basic Modal" visible={this.state.visible} style={{ top: 30 }}  width={1200} 
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
        <Row>
        <Col span={15}>
          <Table columns={this.state.col} dataSource={this.state.data} pagination={{ pageSize: 70 }}  scroll={{ x:500, y: 480 }}   size="small" />
        </Col>

         <Col span={1}></Col>   

          <Col span={8}>
            <Collapse bordered={false} defaultActiveKey={['1','2']} >
              <Panel header="统计信息" key="1">
                <div>{this.staticInformation()}</div>
              </Panel>

              <Panel header="可视化" key="2">
                <div>{this.compare()}</div>           
                <div id="main" style={{ width: 300, height: 300 }}></div>
              </Panel>
            </Collapse>
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
