import React from 'react';
import { Button } from 'antd';
import { fetchTool } from '../../FetchTool';

import Papa from 'papaparse';

class DataSource extends React.Component {
    
    
    handleChangeDataSource = async () => {

        const init = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({"filePath":"/simpleTest.csv"}),
 
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
            for(let i in result){
                if(typeof(result[i]) === "number"){
                    labelType[i] = "int";
                } else {
                    labelType[i] = "string";
                }
            }

            this.props.initLabelArray(fieldNameArray, labelType);
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