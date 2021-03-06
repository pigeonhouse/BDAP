import React from 'react';
import { Upload, Button, Icon, Modal, Input, Tooltip, Row, Col, message } from 'antd';

import { fetchTool, mode } from '../../../FetchTool';
import FileTree from '../FileTree';
import EditorTable from './EditorTable';
import DataTable from './DataTable';
import styles from './index.less';
import Papa from 'papaparse';
import Cookies from 'js-cookie';

class UploadFile extends React.Component {
    state = {
        visible: false,
        uploading: false,
        path: null,
        confirmLoading: false,
        headerAttributes: null,
        fileName: null,
        modifiedFileName: null,
        previewData: null,
        treeData: null,
        defaultValue: '/'
    };

    // 创建treeData
    createTreeData = (filePath, index, parentPath, parentKey) => {
        const children = [{
            title: filePath[index],
            key: `${parentKey}-${index}`,
            value: `${parentPath}${filePath[index]}/`
        }];

        if (filePath.length !== index + 1) {
            children[0].children = this.createTreeData(filePath, index + 1, children[0].value, children[0].key);
        } else if (filePath.length === index + 1) {
            this.setState({ defaultValue: '/' + children[0].value });
        }

        return children;
    }

    showModal = () => {
        const filePath = this.props.filePath || [];
        const { type, status } = this.props;
        var path = '/';
        var treeData = [{
            title: '/', key: '0', value: ''
        }];

        if (type === 'global') {
            this.setState({
                path,
                treeData,
                visible: true
            });
        }
        else if (type === 'current') {

            if (filePath.length !== 0 && status === 'normal') {
                // path构造
                filePath.map((item) => {
                    path += item + '/';
                });

                treeData[0].children = this.createTreeData(filePath, 0, '', '0');
            }

            this.setState({ path, treeData, visible: true });
        }
    };

    handleSelectPath = (value) => {
        this.setState({ path: value });
    }

    handleOk = async e => {
        this.setState({
            confirmLoading: true,
        });

        const { fileName, modifiedFileName, headerAttributes, path } = this.state;
        const data = {
            fileName,
            modifiedFileName,
            path: path || '/',
            headerAttributes,
            previewData: ""
        }

        const init = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        };
        const url = '/filesystem-service/file/confirm';

        const response = await fetchTool(url, init);
        if (response.status === 200) {
            message.success('上传成功');
            this.setState({
                visible: false,
                uploading: false,
                path: null,
                confirmLoading: false,
                headerAttributes: null,
                previewData: null,
                modifiedFileName: null,
                fileName: null,
            });
            this.props.handleUpdateFileList();
        }
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            uploading: false,
            path: null,
            confirmLoading: false,
            headerAttributes: null,
            previewData: null,
            modifiedFileName: null,
            fileName: null,
        });
    };

    handleChangeHeaders = (data) => {
        const { headerAttributes } = this.state;
        data.map((item, index) => {
            headerAttributes[index].modifiedColName = item.name;
            headerAttributes[index].modifiedDataType = item.type;
        })
        this.setState({ headerAttributes });
    }

    handleChangeSelect = (selectedRowKeys) => {
        var { headerAttributes } = this.state;
        headerAttributes.map((header, index) => {
            headerAttributes[index].selected = false;
        })
        selectedRowKeys.map((key) => {
            headerAttributes[Number(key)].selected = true;
        })
        this.setState({ headerAttributes });
    }

    handleChangeFileName = (e) => {
        this.setState({ modifiedFileName: e.target.value });
    }

    render() {
        const self = this;
        const { modifiedFileName, previewData, headerAttributes, confirmLoading } = this.state;

        const props = {
            name: 'file',
            action: mode === 'backEndTest' ? 'http://127.0.0.1:1001/filesystem-service/file' :
                'https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001/filesystem-service/file',
            headers: {
                "token": Cookies.get('token'),
            },
            onChange(info) {
                if (info.file.status === 'done') {
                    const response = info.file.response;
                    const { headerAttributes } = response;
                    for (let header in headerAttributes) {
                        headerAttributes[header].selected = true;
                        headerAttributes[header].modifiedColName = headerAttributes[header].colName;
                        headerAttributes[header].modifiedDataType = headerAttributes[header].dataType;
                    }
                    const results = Papa.parse(response.previewData, { header: true, dynamicTyping: true });

                    let splits = response.fileName.split('.')
                    let modifiedName = ""
                    for (let i = 0; i < splits.length - 1; i++) {
                        modifiedName += splits[i];
                    }
                    self.setState({
                        modifiedFileName: modifiedName,
                        fileName: response.fileName,
                        headerAttributes: response.headerAttributes,
                        previewData: results.data
                    });
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
                    style={{ top: 20 }}
                    title="上传文件"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确定上传"
                    confirmLoading={confirmLoading}
                    destroyOnClose={true}
                    width="1300px"
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
                                <Col span={20} >
                                    <FileTree
                                        defaultValue={this.state.defaultValue}
                                        treeData={this.state.treeData}
                                        handleSelectPath={this.handleSelectPath}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={7} >
                            <Row>
                                <Col span={2}></Col>
                                <Col span={5} style={{ padding: 5 }} >文件名:</Col>
                                <Col span={16} >
                                    <Input
                                        placeholder="请输入文件名"
                                        value={modifiedFileName}
                                        onChange={this.handleChangeFileName}
                                    ></Input>
                                </Col>
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
                    <Row>
                        <Col span={10} >
                            <EditorTable
                                headerAttributes={headerAttributes}
                                handleChangeHeaders={this.handleChangeHeaders}
                                handleChangeSelect={this.handleChangeSelect}
                            />
                        </Col>
                        <Col span={1} ></Col>
                        <Col span={13} >
                            <DataTable
                                previewData={previewData}
                                headerAttributes={headerAttributes}
                            />
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}

export default UploadFile;