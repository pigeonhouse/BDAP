import React from 'react';
import { Tooltip, Button } from 'antd';

import styles from './index.less';

class DownloadFile extends React.Component {

    handleDownloadFile = e => {
        e.stopPropagation();
        this.props.handleDownloadFile(this.props.index);
    }

    render() {
        return (
            <Tooltip placement="bottom" title="下载数据" >
                <Button
                    icon="download"
                    className={styles.iconStyle}
                    onClick={this.handleDownloadFile}
                />
            </Tooltip>
        );
    }
}

export default DownloadFile;