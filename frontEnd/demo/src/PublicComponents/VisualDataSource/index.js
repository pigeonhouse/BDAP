import React from 'react';
import LabelSelect from './LabelSelect';
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

        const res = await fetchTool("/query/readyForData", init);
        console.log(res)
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