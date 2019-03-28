import React from 'react';
import { Row, Col, Button, notification } from 'antd';
import GGEditor, { Flow } from '@src';
import EditorMinimap from '../../LocalModeComponents/EditorMinimap';
import { FlowContextMenu } from '../../LocalModeComponents/EditorContextMenu';
import { FlowToolbar } from '../../LocalModeComponents/EditorToolbar';
import { FlowItemPanel } from '../../LocalModeComponents/EditorItemPanel';
import { FlowDetailPanel } from '../../LocalModeComponents/EditorDetailPanel';
import styles from './index.less';
var introJs = require('intro.js');

class LocalMode extends React.Component {
  renderFlow() {
    return (
      <Flow className={styles.flow} />
    );
  }

  guide(key) {
    introJs().setOptions({
      nextLabel: '下一步',
      prevLabel: '上一步',
      skipLabel: '跳过',
      doneLabel: "完成",
      exitOnOverlayClick:true,
      showProgress:true,
      exitOnEsc: true,
      showBullets:true,
      showButtons:true
    }).oncomplete(function () {
    }).onexit(function () {
    }).start();
    notification.close(key);
  }

  componentDidMount(){
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => this.guide(key)}>
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
      duration: 3,
      btn,
      key,
      onClose: close,
    });
  }
  render() {
    return (
      <GGEditor className={styles.editor}>
        <Row type="flex" data-step="1" data-position="right" data-intro="这是主要展示系统一些统计数据">
          <Col span={24} className={styles.editorHd}> 
          {/* <li data-step="1" data-position="right" data-intro="这是主要展示系统一些统计数据">
         </li>
         <li data-step="2" data-position="right" data-intro="这是系统功能"> 
         </li>            
         <li data-step="3" data-position="right" data-intro="这是镜像功能">
         </li> */}
            <FlowToolbar/>
          </Col>
        </Row>
        <Row type="flex" >
          <Col span={4} className={styles.editorSidebar} className={styles.editorBd} >
            <FlowItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            {this.renderFlow()}
          </Col>
          <Col span={4} className={styles.editorSidebar} >
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    );
  }
}

export default LocalMode;
