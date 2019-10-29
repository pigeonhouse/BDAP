import React from 'react';
import { Upload, Button, Icon, Modal, Input, Tooltip, Row, Col } from 'antd';

import FileTree from './FileTree';
import DataTable from './DataTable';
import styles from './index.less';

class UploadFile extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const props = {
            name: 'file',
            action: 'https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001/filesystem-service/file',
            headers: {
                "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaXZ5QWRkciI6IjEwLjEwNS4yMjIuOTA6ODk5OCIsImF1ZCI6IjIwMTcyMTE1MTEiLCJzZXNzaW9uSWQiOjk3LCJ1c2VySWQiOiIyMDE3MjExNTExIn0.QpSpOUcQXYtMraZCQp4eWuMH624glPu8tKUNyJe3hnU",
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file);
                }
                if (info.file.status === 'done') {

                    if (info.file.response.code === 413)
                        message.error(info.file.response.message);
                    if (info.file.response.code === 200)
                        message.success(`${info.file.name} file uploaded successfully`);
                    if (info.file.response.code === 410)
                        message.error("输入非法，请选择正确的CSV格式文件进行上传！");
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }

        return (
            <div style={{ display: "inline" }} >
                <Tooltip placement="bottom" title="上传文件" >
                    <Button
                        icon="upload"
                        className={styles.buttonStyle}
                        onClick={this.showModal}
                    />
                </Tooltip>

                <Modal
                    title="上传文件"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="1200px"
                >
                    <Row>
                        <Col span={14} >
                            <Row>
                                <Col span={1}></Col>
                                <Col span={3} style={{ padding: 5 }} >
                                    <p style={{ right: 10 }} >
                                        文件路径:
                                    </p>
                                </Col>
                                <Col span={20} ><FileTree /></Col>
                            </Row>
                        </Col>
                        <Col span={7} >
                            <Row>
                                <Col span={2}></Col>
                                <Col span={5} style={{ padding: 5 }} >文件名:</Col>
                                <Col span={16} ><Input></Input></Col>
                                <Col span={1}></Col>
                            </Row>
                        </Col>
                        <Col span={3} >
                            <Upload {...props} withCredentials={true} data={{ file: "/" }}>
                                <Button>
                                    <Icon type="upload" /> 选择文件
    		                    </Button>
                            </Upload>
                        </Col>
                    </Row>
                    <DataTable></DataTable>
                </Modal>
            </div>
        );
    }
}

export default UploadFile;