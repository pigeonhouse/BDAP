import React from 'react';
import { Row, Col, Button,Steps, message, Modal,Layout,notification,Icon} from 'antd';
import GGEditor, { Flow } from '@src';
import EditorMinimap from '../../LocalModeComponents/EditorMinimap';
import { FlowContextMenu } from '../../LocalModeComponents/EditorContextMenu';
import { FlowToolbar } from '../../LocalModeComponents/EditorToolbar';
import { FlowItemPanel } from '../../LocalModeComponents/EditorItemPanel';
import { FlowDetailPanel } from '../../LocalModeComponents/EditorDetailPanel';
import styles from './index.less';
import IntroJs from 'intro.js';
import Run from "../../LocalModeComponents/Models/run"


class LocalMode extends React.Component {
  Intro = (key) => {
    notification.close(key)
    IntroJs().setOptions({
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "结束",
        showProgress:true,
        exitOnEsc:true,
        showButtons:true,
        showStepNumbers:true,
        keyboardNavigation:true,
        showBullets: false,
    }).oncomplete(function () {
      message.success('开始你的数据挖掘之旅吧！')
    }).onexit(function () {
    }).start();
}
  renderFlow() {
    return (
      <Flow className={styles.flow} />
    );
  }
  componentDidMount(){
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" onClick={() => this.Intro(key)}>
        我需要
      </Button>
    );
    notification.open({
      message: '是否需要帮助？',
      description: '点击下方的"我需要"按钮，可以帮助您进行简单的引导。',
      style: {
        width: 400,
      },
      duration: 2,
      btn,
      // key
    });
  }
  render() {
    return (
      
      <GGEditor className={styles.editor}>

      
        <Row
          style={{ lineHeight: '40px',height: '40px', backgroundColor:'#343941',color:"white" }}
        >

          <Col span={1}>
            <Button style={{border:0,backgroundColor:'#343941',color:"#ddd"}} size="large">
                <Icon type="bars" style={{fontSize:20}} />
            </Button>
          </Col>

          <Col span={21}>
            <Button style={{border:0,backgroundColor:'#343941',color:"#ddd",fontSize:18,fontFamily:'consolas'}}>BigDataPlayground Local-Mode</Button>
          </Col>

          
          <Col span={2}>
            <a href="https://www.yuque.com/ddrid/tx7z84">
              <Button style={{border:0,backgroundColor:'#343941',color:"#ddd",fontSize:25}} >
                <Icon type="question-circle" data-step="5" data-intro="如果想要进一步了解详细的使用教程及组件介绍，请点击此处查看文档。"/>
              </Button>
            </a>
          </Col>
        
          <a href="https://github.com/pigeonhouse/BigDataPlayground" className={styles.githubCorner} aria-label="View source on GitHub">
          <svg 
            width="45" 
            height="45" 
            viewBox="0 0 250 250" 
            style={{
              fill:'#fff', 
              color:'#343941',
              position: 'absolute', 
              top: 0,
              border: 0,
              right: 0}}
            aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin: '130px 106px'}} className={styles.octoArm}></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className={styles.octoBody}></path>
          </svg>
          </a>      
        </Row>
     

        <Row type="flex" style={{height:'calc(100vh - 105px)'}}>
  
          <Col span={1} style={{backgroundColor:'#71b0d1', height:'calc(100vh - 105px)'}}>
              
            <Button className={styles.leftMenu}>
              <Icon type="database" style={{fontSize:40}} />
            </Button>
              
            <Button className={styles.leftMenu}>
              <Icon type="api" style={{fontSize:40}} /> 
            </Button>

            <Button className={styles.leftMenu}>
              <Icon type="setting" style={{fontSize:40}} /> 
            </Button>
              
          </Col>

          <Col style={{height:'calc(100vh - 105px)'}} span={4} className={styles.editorSidebar}
            data-step="1" data-intro='在组件栏可以挑选想要的模块，左键单击拖拽添加至右侧画布内。' data-position='right'> 
            <FlowItemPanel />
          </Col>

            
          <Col span={15} className={styles.editorContent} style={{height:'calc(100vh - 105px)'}}>
            <div className={styles.editorHd} data-step="2" data-intro='在工具栏可以进行撤销，复制，删除，成组等操作。' > 
              <FlowToolbar/>
            </div>
            <Flow  style={{height:'calc(100vh - 142px)'}}/>
          </Col>

          <Col span={4} className={styles.editorSidebar} style={{height:'calc(100vh - 105px)'}}>
            <div className={styles.detailPanel} data-step="3" style={{maxHeight:'calc(100vh - 105px)'}} data-intro='在参数栏对你的组件进行参数配置。' data-position='left'>
              <FlowDetailPanel />
            </div>
            <EditorMinimap /> 
          </Col>
        
        </Row>

        
        <Row type="flex" style={{bottom:0, height: '65px',lineHeight:'65px', backgroundColor:'#343941' }}
        data-step="4" data-intro="所有配置完成后，点击'运行'按钮开始运行整个工作流。" data-position='top'
        >
          <Col span={11}></Col>
          <Col span={2}>
              <Run></Run>
          </Col>
          <Col span={11}></Col>
        </Row>
      
        <FlowContextMenu />
      </GGEditor>
     
    );
  }
}

export default LocalMode;
