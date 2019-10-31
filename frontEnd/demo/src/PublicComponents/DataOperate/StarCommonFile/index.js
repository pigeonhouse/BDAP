import React from 'react';
import { Tooltip, Button } from 'antd';

import styles from './index.less';

class StarCommonFile extends React.Component {

    handleClickStar = (e) => {
        e.stopPropagation();
        
        const { file, isCommonly } = this.props;

        if(isCommonly)

        this.props.getFileList();
    }

    render() {
        const { file, isCommonly } = this.props;
        const style = file.isCommonFile ? { color: 'rgba(0,0,0,0.65)' } : { color: '#ccc' };

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