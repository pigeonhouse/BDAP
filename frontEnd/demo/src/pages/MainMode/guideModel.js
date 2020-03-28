import React from "react"
import { Tooltip, Button, Modal, Icon, Drawer } from "antd";
import { Player } from 'video-react';
// import "../../../../node_modules/video-react/dist/video-react.css";
import styles from './index.less';
import { Collapse } from 'antd';

const { Panel } = Collapse;

/**
 * 用户导引界面的弹框的具体内容
 * 视频内容放在Collapse的Panel下
 *
 */

class GuideModel extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div>
                <Tooltip title="用户视频导引">
                    <Button style={{ border: 0, backgroundColor: '#343941', color: "#ddd", fontSize: 25 }} onClick={this.showModal} >
                        <Icon type="question" data-step="5" />
                    </Button>
                </Tooltip>
                <Modal
                    title="用户导引"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                >
                    <Collapse accordion>
                        <Panel header="平台的简单的入门" key="1">
                            <Player src="./src/videos/test2.mp4" />
                        </Panel>
                        <Panel header="数据集文件的详解" key="2">
                            <Player src="./src/videos/test.mp4" />
                        </Panel>
                        <Panel header="数据可视化展示详解" key="3">
                            <p>你好呀</p>
                        </Panel>
                        <Panel header="表达式编辑详解" key="4">
                            <p>你好呀</p>
                        </Panel>
                        <Panel header="几个典型教学案例的讲解" key="5">
                            <Collapse defaultActiveKey="1">
                                <Panel header="决策树算法" key="1">
                                    <Player src="./src/videos/test.mp4" />
                                </Panel>
                            </Collapse>
                            <Collapse defaultActiveKey="2">
                                <Panel header="kmeans聚类" key="1">
                                    <Player src="./src/videos/test.mp4" />
                                </Panel>
                            </Collapse>
                        </Panel>
                    </Collapse>
                </Modal>
            </div>
        )
    }
}
export default GuideModel;