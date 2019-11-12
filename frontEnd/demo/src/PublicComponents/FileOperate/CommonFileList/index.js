import React from 'react';
import { Button, Tooltip, Icon } from 'antd';

import styles from './index.less';

class CommonFileList extends React.Component {

    // 获取常用文件列表
    getStarFileList = () => {
        const { updateAttributes, handleUpdateCommonFileList } = this.props;

        const attributes = {
            filePath: ['常用文件列表'],
            status: 'common',
        }

        updateAttributes(attributes);
        handleUpdateCommonFileList();
    }

    render() {
        const { status } = this.props;
        const style = status === 'common' ? { color: '#1890ff' } : null;

        return (
            <div style={{ display: "inline" }} >
                <Tooltip placement="bottom" title="常用文件列表" >
                    <Button
                        className={styles.buttonStyle}
                        onClick={this.getStarFileList}
                    >
                        <Icon type="star" style={style} />
                    </Button>
                </Tooltip>
            </div>
        );
    }
}

export default CommonFileList;


