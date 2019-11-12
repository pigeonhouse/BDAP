import React from 'react';
import { Tooltip, Button, Modal } from 'antd';

import styles from './index.less';

const { confirm } = Modal;
const init = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
}
class DeleteFile extends React.Component {

    handleDeleteFile = async () => {
        const { file, filePathUpload, handleUpdateFileList } = this.props;
        const { fileName, path, isDir } = file;
        var filePath = (path === undefined ? filePathUpload : path) + fileName;
        if (isDir === true) filePath += '/';

        const url = `/filesystem-service?path=${filePath}`;

        const response = await fetchTool(url, init);
        if (response && response.status === 200) {
            handleUpdateFileList();
        }
    }

    deleteFile = (e) => {
        const { file } = this.props;
        const self = this;
        e.stopPropagation();
        confirm({
            title: file.isDir ? '确定要删除此文件夹？' : '确定要删除此文件？',
            content: file.fileName,
            onOk() {
                self.props.handleDeleteFile();
            }
        })
    }

    render() {
        return (
            <Tooltip placement="bottom" title="删除文件" >
                <Button
                    icon="delete"
                    className={styles.iconStyle}
                    onClick={this.deleteFile}
                />
            </Tooltip>
        );
    }
}

export default DeleteFile;