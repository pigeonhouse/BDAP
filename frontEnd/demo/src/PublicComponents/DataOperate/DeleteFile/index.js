import React from 'react';
import { Tooltip, Button, Modal } from 'antd';

import styles from './index.less';

const { confirm } = Modal;
class DeleteFile extends React.Component {

    deleteFile = (e) => {
        const { index, file } = this.props;
        const self = this;
        e.stopPropagation();
        confirm({
            title: file.isDir ? '确定要删除此文件夹？' : '确定要删除此文件？',
            content: file.fileName,
            onOk() {
                self.props.handleDeleteFile(index)
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