import React, { Component } from 'react';
import { Icon, message } from 'antd'
import { withPropsAPI, Command } from '@src'

import styles from '../index.less';

import { fetchTool } from '../../../FetchTool';

/**
 * 下载文件
 */

class Download extends Component {

    //将数据转化为文件所用格式
    _makeFile = async () => {
        const { propsAPI } = this.props;
        const { getSelected } = propsAPI;
        const item = getSelected()[0];

        const url = `/experiment-service/flow/node/data/${item.id}_0`;
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        }
        const response = await fetchTool(url, init);

        if (response.status === 200) {
            const data = await response.text();
            this.downFile(data, item.model.labelName.label);
        }
    }

    get makeFile() {
        return this._makeFile;
    }
    set makeFile(value) {
        this._makeFile = value;
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
            <Command name="download">
                <div className={styles.item} onClick={this.makeFile}>
                    <Icon type="download" />
                    <span>下载</span>
                </div>
            </Command>
        );
    }
}

export default withPropsAPI(Download);
