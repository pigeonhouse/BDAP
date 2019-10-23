import React from 'react';
import { Table, Input, Button, Popconfirm, Form, message } from 'antd';
import { fetchTool } from '../../FetchTool'
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

	render() {
		const { editable, dataIndex, title, record, index, children, ...restProps } = this.props;
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

var dataSource = []
class EditableTable extends React.Component {
	constructor(props) {
		super(props);

		this.columns = [
			{
				title: 'fileName',
				dataIndex: 'fileName',
				key: 'fileName',

			},
			{
				title: 'filePath',
				dataIndex: 'filePath',
				key: 'filePath',
			},

			{
				title: 'operate',
				dataIndex: 'operate',
				render: (text, record) =>
					dataSource.length >= 1 ? (
						<Popconfirm title="确定要删除吗?" onConfirm={() => this.props.handleDelete(record.filePath)}>
							<a>删除此常用数据集</a>
						</Popconfirm>
					) : null,
			},
		];
	}


	componentWillUpdate(nextProps) {

		dataSource = nextProps.item
		console.log(dataSource)


	}
	getCookieValue = (name) => {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		return arr;
	}

	render() {
		const components = {
			body: {
				row: EditableFormRow,
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
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
				}),
			};
		});
		return (
			<div>
				<Table
					components={components}
					rowClassName={() => 'editable-row'}
					bordered
					dataSource={this.props.item}
					columns={columns}
				/>
			</div>
		);
	}
}
export default EditableTable;