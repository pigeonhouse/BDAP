import React from 'react';
import { Button, Tooltip, Modal } from 'antd';

import DataTable from './DataTable';
import styles from './index.less';
import { fetchTool } from '../../../FetchTool';
import Papa from 'papaparse';

const init = {
    method: 'GET',
    mode: 'cors',
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
};

class DataPreview extends React.Component {

    state = {
        visible: false,
        loading: true,
        fieldNameArray: [],
        result: [],
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

        const { status, filePathUpload, file } = this.props;
        const { fileName, path } = file;
        const filePath = path === undefined ? filePathUpload + fileName : path;

        const url = `/experiment-service/query/readyForData?filePath=${filePath}`;

        const response = await fetchTool(url, init);

        if (response && response.status === 200) {
            const data = await response.text();

            const results = Papa.parse(data, { header: true, dynamicTyping: true });
            const fieldNameArray = results.meta.fields;
            const result = results.data;
            
            this.setState({
                fieldNameArray,
                result,
                loading: false,
            })
        }
    }

    handleStop = e => {
        e.stopPropagation();
    }

    render() {
        const { visible, loading, result, fieldNameArray } = this.state;

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
                    width={1000}
                >
                    <DataTable
                        loading={loading}
                        fieldNameArray={fieldNameArray}
                        result={result}
                    />
                </Modal>
            </div>
        );
    }
}

export default DataPreview;