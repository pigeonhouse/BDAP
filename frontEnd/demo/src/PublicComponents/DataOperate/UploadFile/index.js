import React from 'react';
import {
    Upload, Button, Icon, Modal, Table, Input,
    InputNumber, Popconfirm, Form, Tooltip, Row, Col
} from 'antd';

import FileTree from './FileTree';
import styles from './index.less';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const { editing, dataIndex, title, inputType, record, index, children, ...restProps } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [{ key: '0', name: "00", type: "44" }], editingKey: '', visible: false };
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '25%',
                editable: true,
            },
            {
                title: 'type',
                dataIndex: 'type',
                width: '25%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() => this.save(form, record.key)}
                                        style={{ marginRight: 8 }}
                                        className={styles.Astyle}
                                    >
                                        保存
                                    </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="确认取消?" onConfirm={() => this.cancel(record.key)}>
                                <a className={styles.Astyle} >取消</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <a
                                disabled={editingKey !== ''}
                                className={styles.Astyle}
                                onClick={() => this.edit(record.key)}>
                                编辑
                            </a>
                        );
                },
            },
        ];
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const props = {
            name: 'file',
            action: 'https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:1001/filesystem-service/file',
            headers:{
                "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsaXZ5QWRkciI6IjEwLjEwNS4yMjIuOTA6ODk5OCIsImF1ZCI6IjIwMTcyMTE1MTEiLCJzZXNzaW9uSWQiOjk3LCJ1c2VySWQiOiIyMDE3MjExNTExIn0.QpSpOUcQXYtMraZCQp4eWuMH624glPu8tKUNyJe3hnU",
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {

                    if (info.file.response.code === 413)
                        message.error(info.file.response.message);
                    if (info.file.response.code === 200)
                        message.success(`${info.file.name} file uploaded successfully`);
                    if (info.file.response.code === 410)
                        message.error("输入非法，请选择正确的CSV格式文件进行上传！");
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }

        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div style={{ display: "inline" }} >
                <Tooltip placement="bottom" title="上传文件" >
                    <Button
                        icon="upload"
                        className={styles.buttonStyle}
                        onClick={this.showModal}
                    />
                </Tooltip>

                <Modal
                    title="上传文件"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="1200px"
                >
                    <Row>
                        <Col span={14} >
                            <Row>
                                <Col span={1}></Col>
                                <Col span={3} style={{ padding: 5 }} >
                                    <p style={{ right: 10 }} >
                                        文件路径:
                                    </p>
                                </Col>
                                <Col span={20} ><FileTree /></Col>
                            </Row>
                        </Col>
                        <Col span={7} >
                            <Row>
                                <Col span={2}></Col>
                                <Col span={5} style={{ padding: 5 }} >文件名:</Col>
                                <Col span={16} ><Input></Input></Col>
                                <Col span={1}></Col>
                            </Row>
                        </Col>
                        <Col span={3} >
                            <Upload {...props} withCredentials={true} data={{ file: "/" }}>
                                <Button>
                                    <Icon type="upload" /> 选择文件
    		                    </Button>
                            </Upload>
                        </Col>
                    </Row>

                    <EditableContext.Provider value={this.props.form}>
                        <Table
                            style={{ top: 20 }}
                            bordered
                            components={components}
                            dataSource={this.state.data}
                            columns={columns}
                            rowClassName="editable-row"
                            pagination={{
                                defaultPageSize: 5,
                                onChange: this.cancel,
                            }}
                            scroll={{ y: 240 }}
                        />
                    </EditableContext.Provider>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(UploadFile);