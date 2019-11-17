import React from 'react';
import { Table } from 'antd';

class DataTable extends React.Component {

    render() {
        const { loading, result, fieldNameArray } = this.props;

        var dataSource = result.map((data, index) => {
            return {
                ...data,
                key: index.toString(),
            }
        });

        var width = 100 * fieldNameArray.length;

        var columns = new Array();

        fieldNameArray.map(header => {
            columns.push({
                title: header,
                dataIndex: header,
                width: 100
            });
        });

        return (
            <Table
                header="数据预览"
                bordered
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={false}
                scroll={{ y: "calc(105vh - 405px)", x: width === 0 ? '100%' : `${width}px` }}
            />
        );
    }
}

export default DataTable;