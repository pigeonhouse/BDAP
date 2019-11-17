import React from 'react';
import { Tooltip, Button, Input, Modal, message } from 'antd';

import FileTree from '../FileTree';
import { fetchTool } from '../../../FetchTool';

import styles from './index.less';

class SetNewDir extends React.Component {
    state = {
        visible: false,
        dirName: null,
        confirmLoading: false,
        path: null,
        treeData: null,
        defaultValue: '/',
    }

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
                visible: true,
                confirmLoading: false
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

            this.setState({ path, treeData, visible: true, confirmLoading: false, });
        }
    }

    handleSelectPath = (value) => {
        this.setState({ path: value });
    }

    //新建文件夹Modal点击确定触发
    handleSetNewDir = async () => {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        }
        var { path, dirName } = this.state;

        const url = `/filesystem-service/mkdir?path=${path}${dirName}/`;

        const response = await fetchTool(url, init);
        if (response.status === 200) {
            message.success('文件夹新建成功');
            //后端请求新建文件夹
            this.setState({
                confirmLoading: false,
                visible: false,
            })
            this.props.handleUpdateFileList();
        }
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    }

    //新建文件夹Modal输入框变更控制
    onChangeDirValue = e => {
        this.setState({
            dirName: e.target.value
        })
    }

    render() {
        const { visible, dirName, confirmLoading, defaultValue, treeData } = this.state;
        return (
            <Tooltip placement="bottom" title="新建文件夹" >
                <Button
                    icon="folder-add"
                    className={styles.buttonStyle}
                    onClick={this.showModal}
                />
                <Modal
                    title="新建文件夹"
                    onOk={this.handleSetNewDir}
                    onCancel={this.handleCancel}
                    visible={visible}
                    cancelText="取消"
                    okText="确定创建"
                    confirmLoading={confirmLoading}
                    destroyOnClose={true}
                >
                    <FileTree
                        defaultValue={defaultValue}
                        treeData={treeData}
                        handleSelectPath={this.handleSelectPath}
                    />
                    <Input
                        addonBefore="文件夹名"
                        placeholder="请输入文件夹名"
                        value={dirName}
                        onChange={this.onChangeDirValue}
                    />
                </Modal>
            </Tooltip>
        );
    }
}

export default SetNewDir;