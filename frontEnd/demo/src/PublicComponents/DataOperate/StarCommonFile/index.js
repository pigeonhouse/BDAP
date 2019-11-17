import React from 'react';
import { Tooltip, Button } from 'antd';

import styles from './index.less';

import { fetchTool } from '../../../FetchTool';

const init = {
    method: 'GET',
    mode: 'cors',
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
};

class StarCommonFile extends React.Component {

    handleClickStar = async (e) => {
        e.stopPropagation();
        const { file, filePathUpload, status } = this.props;
        var operate = '';

        if (file.isCommonFile) {
            operate = 'cancel';
        } else {
            operate = 'set';
        }

        const { path, fileName } = file;

        var starFilePath = path === undefined ? filePathUpload : path;

        const url = `/filesystem-service/common-files/${operate}?path=${starFilePath + fileName}`;

        const response = await fetchTool(url, init);
        // 得到请求后实现
        if (response && response.status === 200) {
            this.props.handleUpdateFileList();
        }
    }

    render() {
        const { file } = this.props;
        const style = file.isCommonFile ? { color: '#1890ff' } : null;
        const text = file.isCommonFile ? '取消常用文件' : '标记为常用文件';

        return (
            <Tooltip placement="bottom" title={text} >
                <Button
                    icon="star"
                    className={styles.iconStyle}
                    onClick={this.handleClickStar}
                    style={style}
                />
            </Tooltip>
        );
    }
}

export default StarCommonFile;