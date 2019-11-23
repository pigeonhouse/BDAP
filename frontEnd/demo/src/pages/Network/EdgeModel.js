import React from "react"
import { Row, Col, Tabs, Table, Button, Modal, Input, Select } from "antd";
const { Option } = Select;

class EdgeModel extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        function onChange(value) {
            console.log(`selected ${value}`);
        }

        function onBlur() {
            console.log('blur');
        }

        function onFocus() {
            console.log('focus');
        }

        function onSearch(val) {
            console.log('search:', val);
        }
        return (
            <div>
                <Button onClick={this.showModal}>
                    导入边数据
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Row>
                        <Col span={5}>
                            <p>文件路径：</p>
                        </Col>
                        <Col span={19}>
                            <Input placeholder="请输入文件路径" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}>
                            <p>文件类型：</p>
                        </Col>
                        <Col span={19}>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a type"
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}>
                            <p>自定义描述：</p>
                        </Col>
                        <Col span={19}>
                            <Input placeholder="请输入文件描述" />
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
export default EdgeModel;