import React, { Fragment } from 'react';
import { Table, Input, Popconfirm, Form, Tooltip, Select } from 'antd';

import styles from './index.less';

const EditableContext = React.createContext();
const { Option } = Select;

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'select') {
            return (
                <Select >
                    <Option value="String">String</Option>
                    <Option value="Double">Double</Option>
                    <Option value="Int">Int</Option>
                    <Option value="Boolean">Boolean</Option>
                </Select>
            );
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

class EditorTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null, editingKey: '' };
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: 150,
                editable: true,
            },
            {
                title: 'type',
                dataIndex: 'type',
                width: 120,
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                width: 100,
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

    componentWillMount() {
        this.generateData(this.props.headerAttributes);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.data === null) this.generateData(nextProps.headerAttributes);
    }

    generateData = (headerAttributes) => {
        if (headerAttributes === null) return;

        var data = [];
        headerAttributes.map((column, index) => {
            data.push({
                key: index.toString(),
                name: column.modifiedColName ? column.modifiedColName : column.colName,
                type: column.modifiedDataType ? column.modifiedDataType : column.dataType
            })
        })

        this.setState({ data });
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
                this.props.handleChangeHeaders(newData);
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
                this.props.handleChangeHeaders(newData);
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const { headerAttributes } = this.props;
        const self = this;
        if (headerAttributes === null) return <Fragment />;

        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                self.props.handleChangeSelect(selectedRowKeys);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name,
            }),
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            if (col.title === 'name') {
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
            } else {
                return {
                    ...col,
                    onCell: record => ({
                        record,
                        inputType: 'select',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record),
                    }),
                };
            }

        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    header="元数据"
                    style={{ top: 20 }}
                    bordered
                    rowSelection={rowSelection}
                    components={components}
                    dataSource={this.state.data}
                    columns={columns}
                    pagination={{
                        position: 'none'
                    }}
                    scroll={{ y: "calc(105vh - 405px)", x: "450px" }}
                />
            </EditableContext.Provider>
        );
    }
}

export default Form.create()(EditorTable);