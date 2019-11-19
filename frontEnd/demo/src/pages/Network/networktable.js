import React from "react"
import { Row, Col, Tabs, Table, Button, message, Modal } from "antd";
const { confirm } = Modal;
/**
 * selectedRowKeys好像没有用到
 */
const dataSource = [
    {
        key: '1',
        name: '网络1',
        points: 32,
        edges: 55,
        time: 2019
    },
    {
        key: '2',
        name: '网络2',
        points: 3,
        edges: 5,
        time: 2019
    },
    {
        key: '3',
        name: '网络3',
        points: 32,
        edges: 58,
        time: 2019
    },
    {
        key: '4',
        name: '网络4',
        points: 87,
        edges: 59,
        time: 2018
    },
    {
        key: '5',
        name: '网络5',
        points: 39,
        edges: 98,
        time: 2017
    },
];

const columns = [
    {
        title: '网络名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '点数',
        dataIndex: 'points',
        key: 'points',
    },
    {
        title: '边数',
        dataIndex: 'edges',
        key: 'edges',
    },
    {
        title: '生成时间',
        dataIndex: 'time',
        key: 'time',
    },
];
class Networktable extends React.Component {
    state = {
        selectedRows: null,
        dataSource: dataSource,
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRows,
        })
    };
    handleConfirmButton = () => {
        const info = this.state.selectedRows;
        this.props.handleClick(info);
    }

    handleDeleteButton = () => {
        const { selectedRows} = this.state;
        const dataSource = [...this.state.dataSource];
        const self = this;
        const length = selectedRows.length;
        if (length === 0) {
            message.warning("请先选择要删除的选项");
        }
        else {
            confirm({
                title: '确定要删除此项目？',
                onOk() {
                    for (let index = 0; index < length; index++) {
                        const key = selectedRows[index].key
                        for(let i = 0; i < dataSource.length; i++){
                            if(key===dataSource[i].key){
                                dataSource.splice(i,1);
                            }
                        }
                    }
                    self.setState({
                        dataSource,
                        selectedRows: null,
                    })
                }
            })
        }
    }


    render() {
        const rowSelection = {
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Row>
                    <Table rowSelection={rowSelection} bordered columns={columns} dataSource={this.state.dataSource}
                        scroll={{ y: "calc(105vh - 405px)" }}
                        pagination={false}
                    ></Table>
                </Row>
                <Row>
                    <Col offset={17} span={3}>
                        <Button
                            style={{ marginTop: 10 }}
                            onClick={this.handleDeleteButton}
                        >删除</Button>
                    </Col>
                    <Col offset={1} span={3}>
                        <Button
                            style={{ marginTop: 10 }}
                            onClick={this.handleConfirmButton}
                        >
                            确定
            </Button>
                    </Col>
                </Row>


            </div>
        )
    }
}
export default Networktable;