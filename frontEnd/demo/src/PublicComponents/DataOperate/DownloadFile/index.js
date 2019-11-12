import React from 'react';
import { Tooltip, Button } from 'antd';

import styles from './index.less';

import { fetchTool } from '../../../FetchTool';
const init = {
    method: 'GET',
    mode: 'cors',
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
};

class DownloadFile extends React.Component {

    _handleDownloadFile = async (e) => {
        e.stopPropagation();

        const { status, filePathUpload, file } = this.state;
        const { fileName, path } = file;
        const filePath = path === undefined ? filePathUpload : path + fileName;

        const url = `/experiment-service/query/readyForData?filePath=${filePath}`;

        const response = await fetchTool(url, init);

        if (response.status === 200) {
            const data = await response.text();
            this.downFile(data);
        }
    }

    get handleDownloadFile() {
        return this._handleDownloadFile;
    }
    set handleDownloadFile(value) {
        this._handleDownloadFile = value;
    }

    downFile = (list) => {
        var elementA = document.createElement('a');
        elementA.download = "Dataset.csv";
        elementA.style.display = 'none';
        var blob = new Blob([list], {
            type: "text/csv;charset=" + 'utf-8' + ";"
        });
        elementA.href = URL.createObjectURL(blob);
        document.body.appendChild(elementA);
        elementA.click();
        document.body.removeChild(elementA);
    }

    render() {
        return (
            <Tooltip placement="bottom" title="下载数据" >
                <Button
                    icon="download"
                    className={styles.iconStyle}
                    onClick={this.handleDownloadFile}
                />
            </Tooltip>
        );
    }
}

export default DownloadFile;