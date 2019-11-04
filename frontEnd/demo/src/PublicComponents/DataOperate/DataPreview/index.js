import React from 'react';
import { Button, Tooltip, Modal } from 'antd';

import DataTable from './DataTable';
import styles from './index.less';

class DataPreview extends React.Component {

    state = {
        visible: false,

    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleShowData = (e) => {
        e.stopPropagation();
        this.setState({ visible: true });
    }

    render() {
        const { visible } = this.state;

        return (
            <div style={{ display: "inline" }}>
                <Tooltip placement="bottom" title="预览数据" >
                    <Button
                        icon="eye"
                        className={styles.iconStyle}
                        onClick={this.handleShowData}
                    />
                </Tooltip>
                <Modal
                    title="数据预览"
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    visible={visible}
                    destroyOnClose={true}
                >
                    <DataTable

                    />
                </Modal>
            </div>
        );
    }
}

export default DataPreview;