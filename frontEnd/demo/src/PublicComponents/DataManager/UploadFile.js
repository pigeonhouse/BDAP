import React from 'react';
import {
    Upload, Button, Icon, Radio, Modal, Row, Col,
    Table, Input, InputNumber, Popconfirm, Form
} from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        type: `London Park no. ${i}`,
    });
}

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
        this.state = { data, editingKey: '', visible: false };
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
                                    >
                                        Save
                                    </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="确认取消?" onConfirm={() => this.cancel(record.key)}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                Edit
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

    handleUploadData() {
        let d = {
            replace: this.state.replacevalue,
            withHeader: this.state.setheadervalue
        }
        return d;
    }

    onChangereplace = (value) => {
        this.setState({ replacevalue: value })
    }

    onChangesetHeader = (value) => {
        this.setState({ setheadervalue: value })
    }

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
        let formData = new FormData();
        formData.append('replace', this.state.replace)
        const props = {
            name: 'file',
            action: 'http://localhost:8888/hdfs/uploadwithheader',
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
            <Row>
                <Button onClick={this.showModal}>
                    <Icon type="upload" /> 上传文件
                </Button>
                <Modal
                    title="上传文件"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="700px"
                >
                    <Row>
                        <Upload {...props} withCredentials={true} data={() => this.handleUploadData()}>
                            <Button>
                                <Icon type="upload" /> 将文件上传至HDFS
    		                </Button>
                        </Upload>
                    </Row>
                    {/* <Row>
                        <Radio.Group onChange={this.onChangereplace} defaultValue={true}>
                            <p>是否覆盖原有文件: &nbsp;
                                  <Radio.Button value={true}>是</Radio.Button>
                                <Radio.Button value={false}>否</Radio.Button>
                            </p>
                        </Radio.Group>
                    </Row>
                    <Row>
                        <Radio.Group onChange={this.onChangesetHeader} defaultValue={true}>
                            <p>是否带有表头: &nbsp;
                                  <Radio.Button value={true}>是</Radio.Button>
                                <Radio.Button value={false}>否</Radio.Button>
                            </p>
                        </Radio.Group>
                    </Row> */}

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
            </Row>
        );
    }
}

export default Form.create()(UploadFile);