import React from 'react';
import { Button } from 'antd';

class DataSource extends React.Component {
    handleChangeDataSource = () => {
        const init = {
            method: 'POST',
            mode: 'cors',
            body: 'filePath=' + '/simpleTest.csv',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            credentials: 'include'
        }
        fetch('https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:8888/query/readyForData', init)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    res.text().then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            
                        }
                    })
                }
            })
    }

    render() {
        return (
            <Button onClick={this.handleChangeDataSource} >DataSource</Button>
        );
    }
}

export default DataSource;