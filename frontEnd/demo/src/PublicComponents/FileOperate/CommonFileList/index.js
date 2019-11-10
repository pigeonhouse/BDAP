import React from 'react';
import { Button, Tooltip, Icon } from 'antd';

import styles from './index.less';

class CommonFileList extends React.Component {

    render() {
        const { isCommonly } = this.props;
        const style = isCommonly ? { color: '#1890ff' } : null;

        return (
            <div style={{ display: "inline" }} >
                <Tooltip placement="bottom" title="常用文件列表" >
                    <Button
                        className={styles.buttonStyle}
                        onClick={this.props.getStarFileList}
                    >
                        <Icon type="star" style={style} />
                    </Button>
                </Tooltip>
            </div>
        );
    }
}

export default CommonFileList;


