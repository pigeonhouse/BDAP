import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow } from '@src';
import EditorMinimap from '../../ClusterModeComponents/EditorMinimap';
import { FlowContextMenu } from '../../ClusterModeComponents/EditorContextMenu';
import { FlowToolbar } from '../../ClusterModeComponents/EditorToolbar';
import { FlowItemPanel } from '../../ClusterModeComponents/EditorItemPanel';
import { FlowDetailPanel } from '../../ClusterModeComponents/EditorDetailPanel';
import styles from './index.less';

class ClusterMode extends React.Component {
  renderFlow() {
    return (
      <Flow className={styles.flow} />
    );
  }

  render() {
    return (
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
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
