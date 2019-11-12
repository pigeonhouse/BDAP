import React from 'react';
import { Button, Tooltip, Modal } from 'antd';

import DataTable from './DataTable';
import styles from './index.less';
import { fetchTool } from '../../../FetchTool';

class DataPreview extends React.Component {

    state = {
        visible: false,
        loading: true,
    }

    handleCancel = e => {
        e.stopPropagation();
        this.setState({
            visible: false,
            loading: true,
        });
    }

    handleOk = e => {
        e.stopPropagation();
        this.setState({
            visible: false,
            loading: true,
        });
    }

    handleShowData = async e => {
        e.stopPropagation();
        this.setState({
            visible: true,
        });

        const { status, file, filePathUpload } = this.props;

        const url = ``;

        const response = await fetchTool(url, init);

        if (response.status === 200) {
            const res = await response.json();

            this.setState({
                loading: false,
            })
        }
    }

    handleStop = e => {
        e.stopPropagation();
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
                    {/* <DataTable
                        loading={loading}
                    /> */}
                </Modal>
            </div>
        );
    }
}

export default DataPreview;