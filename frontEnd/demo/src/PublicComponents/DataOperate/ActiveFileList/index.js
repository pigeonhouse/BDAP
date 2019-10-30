import React from 'react';
import { Button, Tooltip } from 'antd';

import styles from './index.less';

class ActiveFileList extends React.Component {

    handleShowActiveFileList = () => {
        console.log("-----");
    }
    
    render() {
        return (
            <div style={{ display: "inline" }} >
                <Tooltip placement="bottom" title="常用文件列表" >
                    <Button
                        icon="star"
                        className={styles.buttonStyle}
                        onClick={this.handleShowActiveFileList}
                    />
                </Tooltip>
            </div>
        );
    }
}

export default ActiveFileList;


