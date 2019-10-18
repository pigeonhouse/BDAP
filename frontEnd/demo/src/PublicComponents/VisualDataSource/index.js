import React from 'react';
import LabelSelect from './LabelSelect';
import { notification } from 'antd';
import { fetchTool } from '../../FetchTool';

import styles from './index.js';
import Papa from 'papaparse';

class DataSource extends React.Component {

    state = {
        labelArray: [],
        filePath: [],
        isMouseEnter: false,
    };

    mouseEnter = () => {
        this.setState({ isMouseEnter: true })
    }

    mouseLeave = () => {
        this.setState({ isMouseEnter: false })
    }

    async componentWillMount() {
        const res = await this.fetchmodule();
        let labelArray = new Array();
        let filePath = new Array();
        res.files.map((item) => {
            labelArray.push(item.fileName);
            filePath.push(item.filePath);
        })
        this.setState({ labelArray, filePath });
    }

    async fetchmodule() {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        }
        const res = await fetchTool("/module", init)
        if (res.code === 200) {
            return res.data
        }
    }

    handleChangeDataSource = async (filePath) => {

        const init = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ "filePath": filePath }),

            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        }

        // const res = await fetchTool("/query/readyForData", init);
        // console.log(res)
        const res = {
            code:200,
            data:`SL,SW,PL,PW,CLASS
            5.1,3.5,1.4,0.2,0
            4.9,3,1.4,0.2,0
            4.7,3.2,1.3,0.2,0
            4.6,3.1,1.5,0.2,0
            5,3.6,1.4,0.2,0
            5.4,3.9,1.7,0.4,0
            4.6,3.4,1.4,0.3,0
            5,3.4,1.5,0.2,0
            4.4,2.9,1.4,0.2,0
            4.9,3.1,1.5,0.1,0
            5.4,3.7,1.5,0.2,0
            4.8,3.4,1.6,0.2,0
            4.8,3,1.4,0.1,0
            4.3,3,1.1,0.1,0
            5.8,4,1.2,0.2,0
            5.7,4.4,1.5,0.4,0
            5.4,3.9,1.3,0.4,0
            5.1,3.5,1.4,0.3,0
            5.7,3.8,1.7,0.3,0
            5.1,3.8,1.5,0.3,0
            5.4,3.4,1.7,0.2,0
            5.1,3.7,1.5,0.4,0
            4.6,3.6,1,0.2,0
            5.1,3.3,1.7,0.5,0
            4.8,3.4,1.9,0.2,0
            5,3,1.6,0.2,0
            5,3.4,1.6,0.4,0
            5.2,3.5,1.5,0.2,0
            5.2,3.4,1.4,0.2,0
            4.7,3.2,1.6,0.2,0
            4.8,3.1,1.6,0.2,0
            5.4,3.4,1.5,0.4,0
            5.2,4.1,1.5,0.1,0
            5.5,4.2,1.4,0.2,0
            4.9,3.1,1.5,0.1,0
            5,3.2,1.2,0.2,0
            5.5,3.5,1.3,0.2,0
            4.9,3.1,1.5,0.1,0
            4.4,3,1.3,0.2,0
            5.1,3.4,1.5,0.2,0
            5,3.5,1.3,0.3,0
            4.5,2.3,1.3,0.3,0
            4.4,3.2,1.3,0.2,0
            5,3.5,1.6,0.6,0
            5.1,3.8,1.9,0.4,0
            4.8,3,1.4,0.3,0
            5.1,3.8,1.6,0.2,0
            4.6,3.2,1.4,0.2,0
            5.3,3.7,1.5,0.2,0
            5,3.3,1.4,0.2,0
            7,3.2,4.7,1.4,1
            6.4,3.2,4.5,1.5,1
            6.9,3.1,4.9,1.5,1
            5.5,2.3,4,1.3,1
            6.5,2.8,4.6,1.5,1
            5.7,2.8,4.5,1.3,1
            6.3,3.3,4.7,1.6,1
            4.9,2.4,3.3,1,1
            6.6,2.9,4.6,1.3,1
            5.2,2.7,3.9,1.4,1
            5,2,3.5,1,1
            5.9,3,4.2,1.5,1
            6,2.2,4,1,1
            6.1,2.9,4.7,1.4,1
            5.6,2.9,3.6,1.3,1
            6.7,3.1,4.4,1.4,1
            5.6,3,4.5,1.5,1
            5.8,2.7,4.1,1,1
            6.2,2.2,4.5,1.5,1
            5.6,2.5,3.9,1.1,1
            5.9,3.2,4.8,1.8,1
            6.1,2.8,4,1.3,1
            6.3,2.5,4.9,1.5,1
            6.1,2.8,4.7,1.2,1
            6.4,2.9,4.3,1.3,1
            6.6,3,4.4,1.4,1
            6.8,2.8,4.8,1.4,1
            6.7,3,5,1.7,1
            6,2.9,4.5,1.5,1
            5.7,2.6,3.5,1,1
            5.5,2.4,3.8,1.1,1
            5.5,2.4,3.7,1,1
            5.8,2.7,3.9,1.2,1
            6,2.7,5.1,1.6,1
            5.4,3,4.5,1.5,1
            6,3.4,4.5,1.6,1
            6.7,3.1,4.7,1.5,1
            6.3,2.3,4.4,1.3,1
            5.6,3,4.1,1.3,1
            5.5,2.5,4,1.3,1
            5.5,2.6,4.4,1.2,1
            6.1,3,4.6,1.4,1
            5.8,2.6,4,1.2,1
            5,2.3,3.3,1,1
            5.6,2.7,4.2,1.3,1
            5.7,3,4.2,1.2,1
            5.7,2.9,4.2,1.3,1
            6.2,2.9,4.3,1.3,1
            5.1,2.5,3,1.1,1
            5.7,2.8,4.1,1.3,1
            `
        }
        if (res.code === 200) {

            // 通过papa转化
            const results = Papa.parse(res.data, { header: true, dynamicTyping: true });
            let labelType = {};
            const fieldNameArray = results.meta.fields;

            const result = results.data[0];
            for (let i in result) {
                if (typeof (result[i]) === "number") {
                    labelType[i] = "int";
                } else {
                    labelType[i] = "string";
                }
            }

            this.props.initLabelArray(fieldNameArray, labelType);
            this.props.initDataSet(results.data, fieldNameArray.length);
        }
    }

    handleChangeLabel = (value) => {
        if (this.props.sessionFinish === false) {
			const args = {
				message: 'Session',
				description:
					'正在创建session，请稍候',
				key: "session"
			};
			notification['info'](args);
			return;
		}
        if (this.props.fileName === value) return;
        this.props.changeFileName(value)

        const { labelArray, filePath } = this.state;
        for (let i in labelArray) {
            if (labelArray[i] === value) {
                return this.handleChangeDataSource(filePath[i]);
            }
        }
    }

    render() {
        return (
            <div>
                <div className={styles.header} >
                    <h3>DataSource</h3>
                </div>
                <div
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
                >
                    <LabelSelect
                        handleChangeLabel={this.handleChangeLabel}
                        label={this.props.fileName}
                        labelArray={this.state.labelArray}
                    ></LabelSelect>
                </div>
            </div>
        );
    }
}

export default DataSource;