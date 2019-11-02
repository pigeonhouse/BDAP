import React from 'react';
import { Tooltip, Button, Input, Modal } from 'antd';

import FileTree from '../FileTree';

import styles from './index.less';

class SetNewDir extends React.Component {
    state = {
        visible: false,
        dirName: null,
        confirmLoading: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
            confirmLoading: false,
        });
    }

    //新建文件夹Modal点击确定触发
    handleSetNewDir = () => {
        //后端请求新建文件夹
        this.setState({
            confirmLoading: false,
        })
        //message("错误信息")
        this.props.handleUpdateFileList();
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
        const { visible, dirName, confirmLoading } = this.state;
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
                    <FileTree />
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