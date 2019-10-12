import React from 'react';
import { Button } from 'antd';
import { fetchTool } from '../../FetchTool';

import Papa from 'papaparse';

class DataSource extends React.Component {
    handleChangeDataSource = async () => {
        const init = {
            method: 'POST',
            mode: 'cors',
            body: 'filePath=' + '/simpleTest.csv',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            credentials: 'include'
        }

        const res = await fetchTool("/query/readyForData", init);

        if (res.code === 200) {

            // 通过papa转化
            const results = Papa.parse(res.data, { header: true, dynamicTyping: true });
            const fieldNameArray = results.meta.fields;

            this.props.initLabelArray(fieldNameArray);
            this.props.initDataSet(results.data, fieldNameArray.length);
        }
    }

    render() {
        return (
            <Button onClick={this.handleChangeDataSource} >DataSource</Button>
        );
    }
}

export default DataSource;