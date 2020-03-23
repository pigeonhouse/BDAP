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

/**
 * 工作流实验组件，完成包括创建项目，搭建及保存工作流的功能
 * 同时也能对实验结果进行一定程度的可视化
 */
class ExperimentPanel extends Component {

    state = {
        // 项目的简要信息
        experiment: null,
    }

    /**
     * 点击新建项目或某个项目名后进入工作流搭建界面
     * @param {object} experiment  保存当前界面展示的工作流的简要信息（）
     */
    handleClickEnter = (experiment) => {
        this.setState({ experiment });
        this.props.handleClickEnter();
    }

    /**
     * 根据init及url参数，向后端发送存储为项目的请求，为用户提示是否存储成功
     * @param {object} init  fetch参数
     * @param {string} url  fetch的url
     * @param {object} experiment  最新的将要保存的项目信息
     */
    saveStream = async (init, url, experiment) => {
        const response = await fetchTool(url, init);

        if (response.status === 200) {
            this.setState({ experiment });

            message.success('存储成功');
        } else {
            message.error('存储失败');
        }
    }

    /**
     * 在点击保存项目后，将用户输入的项目名及项目描述信息，随机生成的项目id，以及
     * 整个工作流的图信息作为参数发送给后端，请求保存项目。
     * @param {object} experiment  项目名称，随机生成的项目id等信息
     * @param {object} flowInfo  当前界面的工作流图信息
     */
    handleSaveStream = (experiment, flowInfo) => {
        var formData = {};
        const url = '/experiment-service/experiments';

        formData = JSON.stringify({
            description: experiment,
            experiment: flowInfo
        });

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

    onRef = (ref) => {
        this.child = ref;
    }

    /**
     * 通过onRef函数及addModel函数将FlowNodePanel组件的子函数暴露给FlowContextMenu组件，
     * 使得在右击模块，并选择保存为模型时，通过addModel函数在FlowNodePanel组件中增加新保存的
     * 模型
     */
    addModel = () => {
        this.child.addModel();
    }

    render() {
        const { currentTab, clickTab } = this.props;
        if (currentTab !== '1') return <Fragment></Fragment>;

        // clickTab为1时表示目前未进入工作流的搭建界面，仅在进入项目的选择界面
        if (clickTab === '1') {
            const { experiment } = this.state;
            if (experiment !== null) {
                this.setState({ experiment: null })
            }
            return (
                <div className={styles.editor}>
                    <Row style={{ minHeight: 'calc(100vh - 105px)' }}>
                        {/* 项目列表，展示后端已保存的项目 */}
                        <ExperimentList handleClickEnter={this.handleClickEnter} />
                    </Row>
                </div>
            );
        }
        return (

            // 工作流搭建界面
            <GGEditor className={styles.editor} >
                <Row type="flex" style={{ height: 'calc(100vh - 105px)' }}>

                    {/* 模块选择列表，可以选择数据模块，算法模块，评估模块等拖动到中间 */}
                    <Col span={4} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 'calc(100vh - 105px)' }} span={4} className={styles.editorSidebar}
                            data-step="1" data-intro='在组件栏可以挑选想要的模块，左键单击拖拽添加至右侧画布内。' data-position='right'>
                            <FlowNodePanel onRef={this.onRef} />
                        </div>
                    </Col>

                    {/* 展示工作流的界面，对拖入其中的模块可按上方工具栏操作，也可右击选择操作 */}
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

                    {/* 位于界面右侧，用于展示模块的参数信息 */}
                    <Col span={5} className={styles.editorSidebar}>
                        <div className={styles.detailPanel} data-step="3" style={{ maxHeight: 'calc(100vh - 105px)' }} data-intro='在参数栏对你的组件进行参数配置。' data-position='left'>
                            <FlowDetailPanel />
                        </div>
                    </Col>
                </Row>

                {/* 右击模块展示的下拉菜单，用于查看选中模块的信息*/}
                <FlowContextMenu addModel={this.addModel} />

                {/* 工作流运行时执行的函数组成的组件 */}
                <SparkRunning running={this.props.running} stopRunning={this.props.stopRunning} ></SparkRunning>

                {/* 在进入界面时，向后端发送请求，将返回的工作流导入GGeditor */}
                <LoadStream experiment={this.state.experiment} ></LoadStream>
            </GGEditor>
        );
    }
}

export default withPropsAPI(ExperimentPanel);