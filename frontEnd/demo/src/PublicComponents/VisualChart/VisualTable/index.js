import React from 'react';
import { Table, Row, Col } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32 + i,
        address: `London, Park Lane no . ${i}`,
    });
}

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

    // clearFilters = () => {
    //     this.setState({ filteredInfo: null });
    // };

    // clearAll = () => {
    //     this.setState({
    //         filteredInfo: null,
    //         sortedInfo: null,
    //     });
    // };

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };
    // onInputChange = (e) => {
    //     this.setState({ searchText: e.target.value });
    // }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                // filters: [{ text: "select" + " " + this.state.searchText, value: this.state.searchText }],
                // filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                // filteredValue: filteredInfo.name || null,
                // onFilter: (value, record) => record.name.includes(value),
                // sorter: (a, b) => a.name.length - b.name.length,
                // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => a.age - b.age,
                sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                // filters: [{ text: "select" + " " + this.state.searchText, value: this.state.searchText }],
                // filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                // filteredValue: filteredInfo.address || null,
                // onFilter: (value, record) => record.address.includes(value),
                // sorter: (a, b) => a.address.length - b.address.length,
                // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
            },

        ];
        return (
            <div style={{ paddingTop: 10 }}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Table columns={columns}
                            dataSource={data}
                            onChange={this.handleChange}
                            pagination={{ pageSize: 50 }}
                            scroll={{ x: "110%", y: "calc(100vh - 405px)" }}
                        />
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}

export default VisualTable;