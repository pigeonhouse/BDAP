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

    //将数据转化为文件所用格式
    makeFile = async (e) => {
        e.stopPropagation();

        const { status, filePathUpload, file } = this.props;
        const { fileName, path } = file;
        const filePath = path === undefined ? filePathUpload + fileName : path;

        const url = `/experiment-service/query/readyForData?filePath=${filePath}`;

        const response = await fetchTool(url, init);

        if (response && response.status === 200) {
            const data = await response.text();
            this.downFile(data, fileName);
        }
    }

    //提供下载
    downFile = (list, label) => {
        var elementA = document.createElement('a');
        elementA.download = `${label}.csv`;
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
                    onClick={this.makeFile}
                />
            </Tooltip>
        );
    }
}

export default DownloadFile;