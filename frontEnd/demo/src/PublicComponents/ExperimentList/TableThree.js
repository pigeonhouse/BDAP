import React from 'react';
import { Table, Button, Input, Row, Col, Icon } from 'antd';

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        name: 'Jim Green',
        age: 32,
        address: 'China No. 2 Lake Park',
    },
    {
        key: '6',
        name: 'Jim Green',
        age: 62,
        address: 'China No. 2 Lake Park',
    },

];

class TableTwo extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        searchText: '',
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
            searchText: '',
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
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
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                filters: [{ text: "select" + " " + this.state.searchText, value: this.state.searchText }],
                filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
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
                filters: [{ text: "select" + " " + this.state.searchText, value: this.state.searchText }],
                filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.address.includes(value),
                sorter: (a, b) => a.address.length - b.address.length,
                sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
            },
        ];
        return (
            <div style={{ marginLeft: 30, marginTop: 30 }}>
                <Row>
                    <Col span={12}>
                        <div className="table-operations">
                            <Button onClick={this.setAgeSort} style={{ marginRight: 10, marginBottom: 10 }}>Sort age</Button>
                            <Button onClick={this.clearFilters} style={{ marginRight: 10, marginBottom: 10 }}>Clear filters</Button>
                            <Button onClick={this.clearAll} style={{ marginRight: 10, marginBottom: 10 }}>Clear filters and sorters</Button>
                            <Input placeholder="input searchText"
                                value={this.state.searchText}
                                onChange={this.onInputChange}
                                style={{ width: 150 }}
                            />
                        </div>
                        <Table columns={columns} dataSource={data} onChange={this.handleChange}
                            pagination={{ pageSize: 5 }} />
                    </Col>
                    <Col span={12}>可以显示其他内容</Col>
                </Row>

            </div>
        );
    }
}

export default TableTwo;