import React from 'react';
import { Table, Button, Row, Col, Modal, Card } from 'antd';
import LocalMode from "../../pages/MainMode"
import TableTwo from "./TableTwo"
import { Link ,Redirect} from 'react-router-dom';
import ExperimentPanel from "../../pages/ExperimentPanel"
class ExperimentList extends React.Component {

	state = {
		dataSource: [],
	}

	componentDidMount() {
		const data = [
			{
				key: 0,
				date: '2018-02-11',
				filename: 'test1',
				user: '20191107xx'
			},
			{
				key: 1,
				date: '2018-03-11',
				filename: 'test2',
				user: '20191107xx'
			},
			{
				key: 2,
				date: '2018-04-11',
				filename: 'test3',
				user: '20191107xx'
			},
			{
				key: 3,
				date: '2018-05-11',
				filename: 'test4',
				user: '20191107xx'
			},
			{
				key: 4,
				date: '2018-06-11',
				filename: 'test5',
				user: '20191107xx'
			},
			{
				key: 5,
				date: '2018-09-11',
				filename: 'test6',
				user: '20191107xx'
			},
		];
		this.setState({
			dataSource: data
		})
	}
	handleNewButton = () => {
		 // alert("你可以去创建自己的文件了，需要跳转页面");
		// return <Redirect to="/route" />;
		this.props.handleP()
	}
	handleDeleteButton = () => {
		alert("你确定删除吗");
	}
	onRowClick = (record, index) => {
		let selectKey = [index];
		Modal.info({
			title: "信息",
			content: record.filename
		})
		this.setState({
			selectedRowKeys: selectKey,
			selectedItem: record
		})

	}
	render() {

		const columns = [
			{
				title: 'FileName',
				dataIndex: 'filename',
				width: 100,
				render: text => <a>{text}</a>,
			},
			{
				title: 'Date',
				dataIndex: 'date',
				width: 100,
			},
			{
				title: 'User',
				dataIndex: 'user',
				width: 100,
			},
			// {
			// 	title: 'Action',
			// 	key: 'action',
			// 	width: 100,
			// 	// render: () => <a>Delete</a>,
			// },
		]

		const { selectedRowKeys } = this.state;
		const rowSelection = {
			type: "radio",
			selectedRowKeys
		};

		return (
			<div style={{ marginLeft: 20, marginTop: 20 }}>
				<Row>
					<Col span={12}>
						<Button type="primary"  style={{ marginRight: 10, marginBottom: 10 }} onClick={this.handleNewButton}>
							新建项目
						</Button>
						<Button type="primary" onClick={this.handleDeleteButton} style={{ marginBottom: 10 }}>删除</Button>
						<Table
							bordered
							rowSelection={rowSelection}
							onRow={(record, index) => {
								return {
									onClick: event => { this.onRowClick(record, index) }, // 点击行
									//   onDoubleClick: event => {},
									//   onContextMenu: event => {},
									//   onMouseEnter: event => {}, // 鼠标移入行
									//   onMouseLeave: event => {},
								};
							}}
							columns={columns}
							dataSource={this.state.dataSource}
							pagination={{ pageSize: 6 }} />
					</Col>
					<Col span={12}>缩略图预览</Col>
				</Row>

			</div>)
	}
}

export default ExperimentList;