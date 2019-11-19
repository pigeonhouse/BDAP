import React, { Component} from 'react';
import GGEditor, { Flow } from '@src';
import { Row, Col, message } from 'antd';
import { FlowToolbar } from '../../PublicComponents/EditorToolbar';
import { FlowDetailPanel } from '../../PublicComponents/EditorDetailPanel';
import { FlowContextMenu } from '../../PublicComponents/EditorContextMenu';
import FlowNodePanel from '../../PublicComponents/EditorNodePanel';
import SparkRunning from '../../ClusterModeComponents/SparkRunPanel/SparkRun';
import LoadStream from '../../PublicComponents/HandleStream/LoadStream';

import { fetchTool } from '../../FetchTool';
import styles from './index.less';

/*
*这个文件现在来看只是个架子，还没有实现网络的框架
*/
class NetExperientPanel extends Component {

    state = {
        experiment: null,
        info:null,
    }
    //在这里实现数据的更新,获取到了表格的数据
    componentWillMount(){
        
        this.setState({
            info:this.props.info, 
        },()=>{
            console.log(this.props.info);
            console.log("info");
        })
    }
    saveStream = async (init, url, experiment) => {
        const response = await fetchTool(url, init);

        if (response.status === 200) {
            this.setState({ experiment });

            message.success('存储成功');
        } else {
            message.error('存储失败');
        }
    }

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

    addModel = () => {
        this.child.addModel();
    }

    render() {
        return (
            <GGEditor className={styles.editor} >
                <Row type="flex" style={{ height: 'calc(100vh - 105px)' }}>
                    <Col span={4} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 'calc(100vh - 105px)' }} span={4} className={styles.editorSidebar}
                            data-step="1" data-intro='在组件栏可以挑选想要的模块，左键单击拖拽添加至右侧画布内。' data-position='right'>
                            <FlowNodePanel onRef={this.onRef} />
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
                <FlowContextMenu addModel={this.addModel} />
                <SparkRunning running={this.props.running} stopRunning={this.props.stopRunning} ></SparkRunning>
                <LoadStream experiment={this.state.experiment} ></LoadStream>
            </GGEditor>
        );
    }
}

export default NetExperientPanel;


