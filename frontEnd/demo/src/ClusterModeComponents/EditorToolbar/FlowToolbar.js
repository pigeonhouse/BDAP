import React from 'react';
import { Tooltip, Divider, Modal, Button, Input, Link, HashRouter, Route  } from 'antd';
import { Toolbar, Command } from '@src';
import styles from './index.less';
import iconfont from '../../theme/iconfont.less';
import {AppendingLineChart} from "../linechart/linechart.ts";
import d3 from "d3"
import SparkRun from "../sparkRun"
import { withPropsAPI } from '@src';
import store from '../../store';

class FlowToolbar extends React.Component {

  state = {
    visible: false,
  }

  livyTest = () =>{
  console.log(this.state.data)
  const init={
    method: 'POST', 
    body:JSON.stringify(this.state.data),
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    }
    fetch(
      'http://localhost:5000/test',init
    )
      //.then(res => res.json())
      .then(data => {
        console.log(res)
        this.setState({users: data})
      })
      .catch(e => console.log('错误:', e))
  }

  returnLoss = () =>{
    // const init={
    //   method: 'GET', 
    // }
    // fetch(
    //   'http://localhost:5000/returnLoss',init
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     this.setState({users: data})
    //   })
    //   .catch(e => console.log('错误:', e))


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
  stopLine = () =>{
    const action = getStopLineAction();
    store.dispatch(action);
    console.log(store.getState().running);
  }
  showLine = () =>{
    // const action = getShowLineAction();
    // store.dispatch(action);
    // console.log(store.getState().running);
    
    //OneVarLinearRegression();
    // console.log(this.state.stream)
    // var step = this.state.stream
    // console.log(step[0]["label"])
    // console.log(step[0]["attribute"])
    // for(let index = 1; index < step.length; index++){
    //   console.log(step[index]["label"])
    //   console.log(step[index]["attribute"])
    // }

  }


  render() {
    return (
      // <div>
      // {/* <div span={4} style={{float:"left", maxHeight:5}}>
      //     <Input placeholder='Search' style={{maxWidth:180,marginLeft:10}}></Input>
      //     <Button shape="circle" style={{marginLeft:20, marginRight:20}} icon="search" />
      // </div> */}
      <Toolbar className={styles.toolbar}>
        <Command name="undo">
          <Tooltip title="撤销" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconUndo}`} />
          </Tooltip>
        </Command>
        <Command name="redo">
          <Tooltip title="重做" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconRedo}`} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="copy">
          <Tooltip title="复制" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
          </Tooltip>
        </Command>
        <Command name="paste">
          <Tooltip title="粘贴" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`} />
          </Tooltip>
        </Command>
        <Command name="delete">
          <Tooltip title="删除" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="zoomIn">
          <Tooltip title="放大" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconZoomInO}`} />
          </Tooltip>
        </Command>
        <Command name="zoomOut">
          <Tooltip title="缩小" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconZoomOutO}`} />
          </Tooltip>
        </Command>
        <Command name="autoZoom">
          <Tooltip title="适应画布" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconFit}`} />
          </Tooltip>
        </Command>
        <Command name="resetZoom">
          <Tooltip title="实际尺寸" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconActualSizeO}`} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="toBack">
          <Tooltip title="层级后置" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconToBack}`} />
          </Tooltip>
        </Command>
        <Command name="toFront">
          <Tooltip title="层级前置" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconToFront}`} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="multiSelect">
          <Tooltip title="多选" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconSelect}`} />
          </Tooltip>
        </Command>
        <Command name="addGroup">
          <Tooltip title="成组" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconGroup}`} />
          </Tooltip>
        </Command>
        <Command name="unGroup">
          <Tooltip title="解组" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconUngroup}`} />
          </Tooltip>
        </Command>
        
  
        <SparkRun></SparkRun>
       {/* <Button onClick={()=>this.livyTest()}>spark-test</Button> */}
       {/* <Button onClick={()=>this.returnLoss()}>return-loss</Button> */}
{/* 
        <Selectword></Selectword> */}

        {/* <Modal title="Basic Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>iter:
            <div id="iter-number"></div>
          </p>
          <p>train-loss:
            <div id="loss-train"></div>
          </p>
          
          <div id="linechart"></div>
          
          <div id="images">  </div>
          
          <Button type="primary" onClick={()=>this.showLine()}>start</Button>
          <span> </span>
          <Button type="primary" onClick={()=>this.stopLine()}>stop</Button>

          {/* <input type="file" id="files" name="files[]" onChange={(e)=>this.readFile(e)} multiple />
	        <output id="list"></output> */}
          {/* <Button type="primary" onClick={()=>this.makeFile()}>makeFile</Button>
          <Download 
          list = {this.state.finalData}
          filename = {'test'}
        />

        </Modal> */} 


        {/* <Button className={styles.buttonRight1} href='#'>用户</Button>
        <Button className={styles.buttonRight2} href='#'>退出</Button> */}
        {/* <Link to='/' className={styles.buttonRight2}>退出</Link>
              <Route exact={true}path='/' component={Home}></Route> */}

      </Toolbar>
      // </div>
    );
  }
}

export default withPropsAPI(FlowToolbar);