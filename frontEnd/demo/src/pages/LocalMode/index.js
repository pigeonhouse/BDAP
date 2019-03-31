import React from 'react';
import { Row, Col, Button, notification,Steps, message, Modal } from 'antd';
import GGEditor, { Flow } from '@src';
import EditorMinimap from '../../LocalModeComponents/EditorMinimap';
import { FlowContextMenu } from '../../LocalModeComponents/EditorContextMenu';
import { FlowToolbar } from '../../LocalModeComponents/EditorToolbar';
import { FlowItemPanel } from '../../LocalModeComponents/EditorItemPanel';
import { FlowDetailPanel } from '../../LocalModeComponents/EditorDetailPanel';
import styles from './index.less';
// var introJs = require('intro.js');

const Step = Steps.Step;

  const steps = [{
  title: '左侧部件',
  content: '左侧部件主要是功能部件，拖拽相应的框进来',
  }, {
  title: '上侧部件',
  content: '运行的必须的部件',
  }, {
  title: '右上侧扩展部件',
  content: '对特定的功能框进行详细设置的部件',
  },{
    title: '右下缩略图',
    content: '在这里看到全貌',
  }];

class LocalMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      visible: false,
    };
  }

  showModal = (key) => {
    notification.close(key);
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
    message.success('恭喜你已经初步毕业了!')
  }

  next = () => {
    const Current = this.state.current + 1;
    this.setState({ 
      current:Current
    });
  }

  prev = () => {
    const Current = this.state.current - 1;
    this.setState({ current:Current });
  }
  renderFlow() {
    return (
      <Flow className={styles.flow} />
    );
  }
  componentDidMount(){
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" onClick={() => this.showModal(key)}>
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
    const { current } = this.state;
    return (
      <GGEditor className={styles.editor}>
        <Row type="flex">
          <Col span={24} className={styles.editorHd}> 
            <FlowToolbar/>
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={4} className={styles.editorSidebar} > 
            <FlowItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
              <Modal
              title="介绍"
              visible={this.state.visible}
              cancelText={this.state.canceltxt}
              bodyStyle={{height: '450px'}}
              onCancel={this.hideModal}
              width={1100}
              footer={[
                // <Button key="back" onClick={this.hideModal}>算了,不用了</Button>
              ]}
              >
              <div>
                <Steps current={current}>
                  {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                {/* <img src={require('../img/Selet.jpg')} /> */}
                  {
                    current < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>下一步</Button>
                  }
                  {
                    current === steps.length - 1
                    && <Button type="primary" onClick={() => this.hideModal()}>完成</Button>
                  }
                  {
                    current > 0
                    && (
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                      上一步
                    </Button>
                    )
                  }
                </div>
              </div>
            </Modal>
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
