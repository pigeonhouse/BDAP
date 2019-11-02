import React, { Fragment } from 'react';
import { Table } from 'antd';

class DataTable extends React.Component {
    render() {
        return <Fragment />
        const { previewData, headerAttributes } = this.props;
        if (headerAttributes === null) {
            return <Fragment />
        }

        var width = 100 * headerAttributes.length;
        // 转化为数组
        const datas = previewData.length === undefined ? [previewData] : previewData;

        var dataSource = datas.map((data, index) => {
            return {
                ...data,
                key: index.toString(),
            }
        });
        var columns = new Array();

        headerAttributes.map(header => {
            if (header.selected === true) {
                columns.push({
                    title: header.modifiedColName,
                    dataIndex: header.colName,
                    width: 100
                });
            }
        });
        return (
            <Table
                header="数据预览"
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    position: 'none'
                }}
                scroll={{ y: "calc(105vh - 405px)", x: `${width}px` }}
            />
        );
    }
}

export default DataTable;