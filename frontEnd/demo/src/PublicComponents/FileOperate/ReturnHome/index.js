import React from 'react';
import { Tooltip, Button } from 'antd';

import styles from './index.less';

class ReturnHome extends React.Component {

    //返回根目录，将filePath的数据清空,status改为normal
    handleClickHome = () => {
        const { handleUpdateFileList, updateAttributes } = this.props;

        const attributes = {
            filePath: [],
            status: 'normal'
        }
        updateAttributes(attributes);
        handleUpdateFileList();
    }

    render() {
        return (
            <Tooltip placement="bottom" title="返回根目录" >
                <Button
                    icon="home"
                    className={styles.buttonStyle}
                    onClick={this.handleClickHome}
                />
            </Tooltip>
        )
    }
}

export default ReturnHome;