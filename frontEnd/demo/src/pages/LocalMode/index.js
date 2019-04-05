import React from 'react';
import { Row, Col, Button, notification,Steps, message, Modal,Layout,Menu,Icon } from 'antd';
import GGEditor, { Flow } from '@src';
import EditorMinimap from '../../LocalModeComponents/EditorMinimap';
import { FlowContextMenu } from '../../LocalModeComponents/EditorContextMenu';
import { FlowToolbar } from '../../LocalModeComponents/EditorToolbar';
import { FlowItemPanel } from '../../LocalModeComponents/EditorItemPanel';
import { FlowDetailPanel } from '../../LocalModeComponents/EditorDetailPanel';
import styles from './index.less';
import IntroJs from 'intro.js';

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
      message.success('恭喜你已经初步毕业了!')
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
    notification['info']({
      message: '亲,你是否需要我的指导呢？',
      description: '点击方框右下角的"我需要"按钮，我可以简短的自我介绍一下',
      style: {
        width: 600,
        marginLeft: -650,
      },
      duration: 2,
      btn,
      key
    });
  }
  render() {
    return (
      
      <GGEditor className={styles.editor}>

      
      <Menu
        mode="horizontal"
        style={{ lineHeight: '40px', backgroundColor:'#323232',color:"white" }}
      >
      <Button style={{border:0,backgroundColor:'#323232',color:"#ddd",marginTop:10}} size="large">
          <Icon type="bars" style={{fontSize:20}} />
      </Button>
        <Button style={{border:0,backgroundColor:'#323232',color:"#ddd",fontSize:18,marginBottom:15,fontFamily:'consolas'}}>BigDataPlayground Local-Mode</Button>
        <Button style={{border:0,backgroundColor:'#323232',color:"#ddd",fontSize:25,marginTop:10}}>
            <Icon type="user" />
        </Button>
       
      </Menu>
     

        <Row type="flex" className={styles.editorBd} >
        
          <Col span={4} className={styles.editorSidebar} data-step="1" data-intro='在这里是各种组件，挑选你需要的组件'> 
            <FlowItemPanel />
          </Col>
  
            
          <Col span={16} className={styles.editorContent}>
            <Col className={styles.editorHd} data-step="4" data-intro='这里是各种功能部件，点击‘run’，运行你的程序'> 
              <FlowToolbar/>
            </Col>
                    
            <Flow className={styles.flow} />
            </Col>
            

  
          <Col span={4} className={styles.editorSidebar} >
            <div className={styles.detailPanel} data-step="3" data-intro='在这里对你的组件进行上传数据，或者设定参数'>
            <FlowDetailPanel />
            </div>
            <div data-step="5" data-intro='在这里看到你所挑选部件的全貌'>
            <EditorMinimap />
            </div>
          </Col>
          
        </Row>

        <FlowContextMenu />
        <div>test</div>
      </GGEditor>
      
 
     
    );
  }
}

export default LocalMode;
