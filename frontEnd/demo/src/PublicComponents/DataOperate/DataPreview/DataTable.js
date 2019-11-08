import React from 'react';
import { Table } from 'antd';

import { fetchTool } from '../../../FetchTool';

class DataTable extends React.Component {

    state = {
        dataSource: [],
        columns: [],
        width: 0,
    }

    async componentWillReceiveProps(nextProps) {
        const { visible, loading } = nextProps;
        if (visible === true && loading === true) {
            const init = {

            }
            const url = '';

            const response = await fetchTool(url, init);
            if (response.status === 200) {
                const res = await response.json();

                nextProps.stopLoading();
            }
        }
    }

    transformData = () => {
        var dataSource = datas.map((data, index) => {
            return {
                ...data,
                key: index.toString(),
            }
        });

        var width = 100 * headerAttributes.length;
        // 转化为数组
        const datas = previewData.length === undefined ? [previewData] : previewData;


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
    }

    render() {
        const { loading } = this.props;
        const { columns, dataSource, width } = this.state;

        return (
            <Table
                header="数据预览"
                bordered
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={{
                    position: 'none'
                }}
                scroll={{ y: "calc(105vh - 405px)", x: width === 0 ? '100%' : `${width}px` }}
            />
        );
    }
}

export default DataTable;