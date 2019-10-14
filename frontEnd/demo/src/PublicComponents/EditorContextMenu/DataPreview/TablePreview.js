import React from 'react';
import { Table } from 'antd';

class TablePreview extends React.Component {

    render() {

        let { labelArray, dataSet } = this.props;

        let data = [];
        let columns = [];

        dataSet.map((item, index) => {
            data.push({
                key: index,
                ...item
            });
        })

        labelArray.map((item) => {
            columns.push({
                title: item,
                dataIndex: item,
                key: item,
            })
        })

        return (
            <Table columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={{ x: "110%", y: "400px" }}
            />
        );
    }
}

export default TablePreview;