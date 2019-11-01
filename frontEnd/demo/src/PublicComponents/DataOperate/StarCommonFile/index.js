import React from 'react';
import { Tooltip, Button } from 'antd';

import styles from './index.less';

class StarCommonFile extends React.Component {

    handleClickStar = (e) => {
        e.stopPropagation();

        const { file, handleCancelStar, handleSelectStar, index } = this.props;

        if (file.isCommonFile) {
            handleCancelStar(index);
        } else {
            handleSelectStar(index);
        }
    }

    render() {
        const { file } = this.props;
        const style = file.isCommonFile ? { color: '#1890ff' } : null;

        return (
            <Tooltip placement="bottom" title="标记为常用文件" >
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