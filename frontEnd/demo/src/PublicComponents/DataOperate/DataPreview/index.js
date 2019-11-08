import React from 'react';
import { Button, Tooltip, Modal } from 'antd';

import DataTable from './DataTable';
import styles from './index.less';

class DataPreview extends React.Component {

    state = {
        visible: false,
        loading: false,
    }

    handleCancel = e => {
        e.stopPropagation();
        this.setState({
            visible: false,
            loading: false,
        });
    }

    handleOk = e => {
        e.stopPropagation();
        this.setState({
            visible: false,
            loading: false,
        });
    }

    handleShowData = e => {
        e.stopPropagation();
        this.setState({
            visible: true,
            loading: true,
        });
    }

    handleStop = e => {
        e.stopPropagation();
    }

    stopLoading = () => {
        this.setState({ loading: false });
    }

    render() {
        const { visible, loading } = this.state;

        return (
            <div onClick={this.handleStop} style={{ display: "inline" }}>
                <Tooltip placement="bottom" title="预览数据" >
                    <Button
                        icon="eye"
                        className={styles.iconStyle}
                        onClick={this.handleShowData}
                    />
                </Tooltip>
                <Modal
                    title="数据预览"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    visible={visible}
                    destroyOnClose={true}
                >
                    <DataTable
                        loading={loading}
                        visible={visible}
                        stopLoading={this.stopLoading}
                    />
                </Modal>
            </div>
        );
    }
}

export default DataPreview;