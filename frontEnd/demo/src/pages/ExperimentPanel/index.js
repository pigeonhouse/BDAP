import React, { Component } from 'react';
import GGEditor, { Flow } from '@src';
import { Row, Col } from 'antd';
import { FlowToolbar } from '../../PublicComponents/EditorToolbar';
import { FlowDetailPanel } from '../../PublicComponents/EditorDetailPanel';
import FlowNodePanel from '../../PublicComponents/EditorNodePanel';
import { FlowContextMenu } from '../../PublicComponents/EditorContextMenu';
import ExperimentList from "../../PublicComponents/ExperimentList";
import SparkRunning from '../../ClusterModeComponents/SparkRunPanel/SparkRun';
import Cookies from 'js-cookie'
import styles from './index.less';

class ExperimentPanel extends Component {
    state = {
        nodesModuleInfo: [],
    }

    componentWillMount() {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        }
        fetch('http://localhost:8888/module', init)
            .then(res => {
                if (res.status === 200) {
                    
                    res.json().then(res => {
                        if (res.code === 200) {
                            Cookies.set("loginToken",res.token);
                            this.setState({ nodesModuleInfo: res.data });
                        }
                    })
                }
            })
    }

    render() {
        if (this.props.currentTab === this.props.clickTab) {
            return <ExperimentList handleClickEnter={this.props.handleClickEnter} />
        }
        return (
            <GGEditor className={styles.editor} >
                <Row type="flex" style={{ height: 'calc(100vh - 105px)' }}>
                    <Col span={4} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 'calc(100vh - 105px)' }} span={4} className={styles.editorSidebar}
                            data-step="1" data-intro='在组件栏可以挑选想要的模块，左键单击拖拽添加至右侧画布内。' data-position='right'>
                            <FlowNodePanel nodesModuleInfo={this.state.nodesModuleInfo} />
                        </div>
                    </Col>

                    <Col span={16} className={styles.editorContent}>
                        <div className={styles.editorHd} data-step="2" data-intro='在工具栏可以进行撤销，复制，删除，成组等操作。' >
                            <FlowToolbar />
                        </div>
                        <Flow style={{ height: 'calc(100vh - 142px)' }}
                        />
                    </Col>

                    <Col span={4} className={styles.editorSidebar}>
                        <div className={styles.detailPanel} data-step="3" style={{ maxHeight: 'calc(100vh - 105px)' }} data-intro='在参数栏对你的组件进行参数配置。' data-position='left'>
                            <FlowDetailPanel />
                        </div>
                    </Col>
                </Row>
				<FlowContextMenu />
                <SparkRunning  running={this.props.running} stopRunning={this.props.stopRunning} ></SparkRunning>
            </GGEditor>
        );
    }
}

export default ExperimentPanel;