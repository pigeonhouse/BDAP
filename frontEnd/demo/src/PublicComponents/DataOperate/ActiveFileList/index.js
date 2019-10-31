import React from 'react';
import { Button, Tooltip, Icon } from 'antd';

import styles from './index.less';

class ActiveFileList extends React.Component {

    render() {
        const { isCommonly } = this.props;
        const style = isCommonly ? { color: '#1890ff' } : { color: '#ccc' }

        return (
            <div style={{ display: "inline" }} >
                <Tooltip placement="bottom" title="常用文件列表" >
                    <Button
                        className={styles.buttonStyle}
                        onClick={this.props.getStartFileList}
                    >
                        <Icon type="star" style={style} />
                    </Button>
                </Tooltip>
            </div>
        );
    }
}

export default ActiveFileList;


