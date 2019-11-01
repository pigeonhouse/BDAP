import React, { Component, Fragment } from 'react';
import GGEditor, { Flow, withPropsAPI } from '@src';
import { Row, Col, message } from 'antd';
import { FlowToolbar } from '../../PublicComponents/EditorToolbar';
import { FlowDetailPanel } from '../../PublicComponents/EditorDetailPanel';
import { FlowContextMenu } from '../../PublicComponents/EditorContextMenu';
import FlowNodePanel from '../../PublicComponents/EditorNodePanel';
import ExperimentList from "../../PublicComponents/ExperimentList";
import SparkRunning from '../../ClusterModeComponents/SparkRunPanel/SparkRun';
import LoadStream from '../../PublicComponents/HandleStream/LoadStream';

import { fetchTool } from '../../FetchTool';
import styles from './index.less';

class ExperimentPanel extends Component {

    state = {
        experiment: null,
    }

    handleClickEnter = (experiment) => {
        this.setState({ experiment });
        this.props.handleClickEnter();
    }

    saveStream = async (init, url, experiment) => {
        const response = await fetchTool(url, init);

        if (response.status === 200) {
            this.setState({
                experiment: {
                    title: experiment.title,
                    description: experiment.description,
                    experimentId: await response.text()
                }
            });
            message.success('存储成功');
        } else {
            message.error('存储失败');
        }
    }

    handleSaveStream = (experiment, flowInfo) => {
        var formData = {};
        formData = JSON.stringify({
            description: {
                title: experiment.title,
                description: experiment.description,
            },
            experiment: flowInfo
        });
        const url = '/experiment-service/experiments';

        var init = {
            method: 'PUT',
            mode: 'cors',
            body: formData,
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        };

        this.saveStream(init, url, experiment);
    }

    render() {
        const { currentTab, clickTab } = this.props;
        if (currentTab !== '1') return <Fragment></Fragment>;

        if (clickTab === '1') {
            const { experiment } = this.state;
            if (experiment !== null) {
                this.setState({ experiment: null })
            }
            return (
                <div className={styles.editor}>
                    <Row style={{ minHeight: 'calc(100vh - 105px)' }}>
                        <ExperimentList
                            handleClickEnter={this.handleClickEnter}
                        />
                    </Row>
                </div>
            );
        }
        return (
            <GGEditor className={styles.editor} >
                <Row type="flex" style={{ height: 'calc(100vh - 105px)' }}>
                    <Col span={4} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 'calc(100vh - 105px)' }} span={4} className={styles.editorSidebar}
                            data-step="1" data-intro='在组件栏可以挑选想要的模块，左键单击拖拽添加至右侧画布内。' data-position='right'>
                            <FlowNodePanel />
                        </div>
                    </Col>

                    <Col span={15} className={styles.editorContent}>
                        <div className={styles.editorHd} data-step="2" data-intro='在工具栏可以进行撤销，复制，删除，成组等操作。' >
                            <FlowToolbar
                                experiment={this.state.experiment}
                                handleSaveStream={this.handleSaveStream}
                            />
                        </div>
                        <Flow style={{ height: 'calc(100vh - 142px)' }}
                        />
                    </Col>

                    <Col span={5} className={styles.editorSidebar}>
                        <div className={styles.detailPanel} data-step="3" style={{ maxHeight: 'calc(100vh - 105px)' }} data-intro='在参数栏对你的组件进行参数配置。' data-position='left'>
                            <FlowDetailPanel />
                        </div>
                    </Col>
                </Row>
                <FlowContextMenu />
                <SparkRunning running={this.props.running} stopRunning={this.props.stopRunning} ></SparkRunning>
                <LoadStream experiment={this.state.experiment} ></LoadStream>
            </GGEditor>
        );
    }
}

export default withPropsAPI(ExperimentPanel);