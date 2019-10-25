import React from 'react';
import { Table, Row, Col } from 'antd';

class VisualTable extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };




    render() {
        let { labelArray, dataSet, loading } = this.props;

        let data = [];
        let columns = [];

        dataSet.map((item, index) => {
            data.push({
                key: index,
                ...item,
            });
        })

        labelArray.map((item) => {
            columns.push({
                title: item,
                dataIndex: item,
                key: item,
                width:100,
            })
        })

        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        return (
            <div style={{ paddingTop: 10 }} >
                <Row>
                    <Col span={3}></Col>
                    <Col span={18} >
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            loading={loading}
                            onChange={this.handleChange}
                            pagination={{ pageSize: 50 }}
                             scroll={{ y: "calc(105vh - 405px)" ,x:"100% "}}
                        />
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </div>
        );
    }
}

export default VisualTable;