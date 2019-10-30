import React from 'react';
import { Table, Input, Popconfirm, Form } from 'antd';

import styles from './index.less';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
                <div
                    className={styles.editableCellValueWrap}
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };

    render() {
        const { editable, dataIndex, title, record, index, handleSave, children, ...restProps } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'operation',
                dataIndex: 'operation',
                width: 100,
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
                            <a className={styles.Astyle} >Delete</a>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: 'label',
                dataIndex: 'label',
                width: 100,
                editable: true,
            },
            {
                title: 'type',
                dataIndex: 'type',
                width: 100,
                editable: true,
            },
        ];

        this.state = {
            dataSource: [
                {
                    key: '0',
                    name: 'Edward King 0',
                    type: '32',
                },
                {
                    key: '1',
                    name: 'Edward King 1',
                    type: '32',
                },
            ],
            count: 2,
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        var editorColumns = this.columns;

        if (editorColumns.length < 13) {
            for (let i = 1; i <= 10; i++) {
                editorColumns.push({
                    title: (i + 2).toString(),
                    dataIndex: i.toString(),
                    width: 150,
                })
            }
        }

        const columns = editorColumns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (
            <Table
                components={components}
                bordered
                dataSource={dataSource}
                columns={columns}
                scroll={{ y: "calc(105vh - 405px)", x: "1800px" }}
            />
        );
    }
}

export default DataTable;