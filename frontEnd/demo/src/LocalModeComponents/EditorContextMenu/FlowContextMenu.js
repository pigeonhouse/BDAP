import React from 'react'
import { Modal, Table , Icon,Collapse} from 'antd';
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

const Panel = Collapse.Panel;

class FlowContextMenu extends React.Component {
  state = { 
    loading:false,
    visible: false,
    Nvisible: false,
    Svisible:false,
    MlEvaluteVisible:false,
    evalution:[[]]
  }

  Datum = () => {
    const { propsAPI } = this.props;
    var currentId = propsAPI.getSelected()[0].id
    var saveData = propsAPI.save().nodes
    var currentData = new Array()
  
    for(let i = 0; i < saveData.length; i++){
      if(currentId == saveData[i].id){       
          currentData.push(saveData[i].Dataset)
      }
    }
    currentData = currentData[0]
    var columns = new Array()
    for(let i = 0; i < currentData.length; i++){
      columns.push({
                   title : currentData[i].label,
                   dataIndex: currentData[i].label,
                   width : 50,
                 })
    }
    this.setState({col:columns})
    // console.log(currentData);
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
    // let s1 = new Array();
    // let s2 = new Array();
    // let s3 = new Array();
    // s1['id']="Average";
    // s2['id']="Max";
    // s3['id']="Min";
    // for(let i = 1; i < currentData.length; i++){
    //   let tem_avr = 0;
    //   let tem_min;
    //   let tem_max;
    //   for(let k = 0; k < currentData[i].value.length; k++)
    //     if(currentData[i].value[k] != null){
    //       tem_min = currentData[i].value[k];
    //       tem_max = currentData[i].value[k];
    //     }
    //   for(let k = 0; k < currentData[i].value.length; k++){
    //     tem_avr += currentData[i].value[k];
    //     if(currentData[i].value[k] > tem_max){
    //       tem_max = currentData[i].value[k];
    //     }
    //     if(currentData[i].value[k]!=null && currentData[i].value[k] < tem_min){
    //       tem_min = currentData[i].value[k];
    //     }
    //   }
    //   tem_avr = tem_avr/currentData[i].value.length;
    //   s1[currentData[i].label]=tem_avr;
    //   s2[currentData[i].label]=tem_max;
    //   s3[currentData[i].label]=tem_min;
    // }
    // datas.push(s1);
    // datas.push(s2);
    // datas.push(s3);
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
    // console.log(list);
    // console.log("datas");
    // let a = Math.random();
    // console.log(a);
    // console.log(datas);
    this.setState({data:datas,list:list});
  }
  // makeup = () => {
  //   let dat = this.state.datas;
  //   for(let k = 0; k < dat.length;k++){
  //     if(dat[k].id == 'Average'){
  //       for(let j = 0;j < ;)
  //     }
  //   }
  // }
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
    // console.log(this.state.data);
    // console.log(this.state.col);
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

          {/* <div className={styles.item} onClick={this.showSModal}>
          <Icon type="dot-chart" />
          <span>图形化展示-散点图</span>
          </div> */}
        </NodeMenu>
      

        <Modal title="模型评估" visible={this.state.MlEvaluteVisible}
          onOk={this.handleOk} onCancel={this.handleCancel} width={500}
        >
          <Collapse bordered={false} >
          {this.state.evalution.map((pair,index)=>{
            return (<Panel header={pair[0]+" : "+pair[1]}  key={index} style={{fontSize:25,marginBottom: 24,border: 0}}>
                        <p style={{fontSize:15,lineHeight:2}}>{pair[2]}</p>
                      </Panel>)
          }

          )}
            {/* <Panel header={this.state.title}  key="1" style={{fontSize:30,marginBottom: 24,border: 0}}>
              <p style={{fontSize:20}}>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2" style={{fontSize:30,marginBottom: 24,border: 0}}>
              <p style={{fontSize:20}}>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3" style={{fontSize:30,marginBottom: 24,border: 0}}>
              <p style={{fontSize:20}}>{text}</p>
          </Panel> */}
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
        {/* <Modal
            title="Modal"
            visible={this.state.Svisible}
            onOk={this.handleSOk}
            onCancel={this.handleSCancel}
            bodyStyle={{height: '450px'}}
            width={800}
          >
            <DistributeScatter />
        </Modal> */}

        <Modal title="Modal Data" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel} width={900}
        >
          <Downlowd list={this.state.list} filename={"数据集"}/>
          <Table columns={this.state.col} dataSource={this.state.data} pagination={{ pageSize: 70 }} scroll={{ y: 340 }} bordered size="small" />
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
