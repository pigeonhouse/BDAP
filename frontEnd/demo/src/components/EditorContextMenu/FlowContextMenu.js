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
import store from '../../store'
import { withPropsAPI } from '@src';
import LineMarkerEcharts from './LineMarkerEcharts';
import  DistributeScatter from './DistributeScatter';
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
                   title : currentData[i][0].label,
                   dataIndex: currentData[i][0].label,
                   width : 50,
                 })
    }
    this.setState({col:columns})
    var datas = new Array()
    for(let i = 0; i < currentData[0][0].value.length; i++){
      var temp = new Array()
      for(let j = 0; j < currentData.length; j++){
        temp[currentData[j][0].label] = currentData[j][0].value[i]
      }
      datas.push(temp)
    }
    this.setState({data:datas})
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

          <div className={styles.item} onClick={this.showModal}>
          <Icon type="form" />
          <span>数据预览</span>
          </div>

          <div className={styles.item} onClick={this.showNModal}>
          <Icon type="line-chart" />
          <span>图形化展示</span>
          </div>

          <div className={styles.item} onClick={this.modelEvaluation}>
          <Icon type="solution" />
          <span>模型评估</span>
          </div>


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
