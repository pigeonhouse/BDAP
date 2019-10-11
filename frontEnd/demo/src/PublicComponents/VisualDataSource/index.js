import React from 'react';
import { Button } from 'antd';
import { fetchTool } from '../../FetchTool';

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

        console.log(res);
        if (res.code === 200) {
            
        }
    }

    render() {
        return (
            <Button onClick={this.handleChangeDataSource} >DataSource</Button>
        );
    }
}

export default DataSource;