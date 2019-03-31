import React from 'react';
import {  Row, Col, Button, notification, message} from 'antd';
import GGEditor, { Flow } from '@src';
import EditorMinimap from '../../ClusterModeComponents/EditorMinimap';
import { FlowContextMenu } from '../../ClusterModeComponents/EditorContextMenu';
import { FlowToolbar } from '../../ClusterModeComponents/EditorToolbar';
import { FlowItemPanel } from '../../ClusterModeComponents/EditorItemPanel';
import { FlowDetailPanel } from '../../ClusterModeComponents/EditorDetailPanel';
import styles from './index.less';
import IntroJs from 'intro.js';

class ClusterMode extends React.Component {
  renderFlow() {
    return (
      <Flow className={styles.flow} />
    );
  }
  
  Intro = (key) => {
    notification.close(key)
    IntroJs().setOptions({
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "结束",
    }).start();
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
        <Row type="flex" className={styles.editorHd} data-step="1" data-intro='开始引导!'>
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd} data-step="2" data-intro='开始引导2!'>
          <Col span={4} className={styles.editorSidebar}>
            <FlowItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            {this.renderFlow()}
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    );
  }
}

export default ClusterMode;
