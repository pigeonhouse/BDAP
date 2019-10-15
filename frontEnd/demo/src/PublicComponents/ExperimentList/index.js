import React from 'react';
import GGEditor from '@src';
import { Table, Button, Row, Col, Modal } from 'antd';
import FlowMinimap from './FlowMinimap';

const { confirm } = Modal;
const data = [
	{
		title: "numberOne",
		description: 'I LOVE REACT',
		status: "SUCCEED"
	}, {
		title: "numberTwo",
		description: 'I LOVE REACT',
		status: "FINISH"
	},
	{
		title: "numberThree",
		description: 'I LOVE REACT',
		status: "SUCCEED"
	},
]


class ExperimentList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
			selectTitle: "",
		}
	}
	async fetchmodule() {
		const init = {
			method: 'GET',
			mode: 'cors',
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			credentials: 'include'
		}
		const res = await fetchTool("/module", init)
		if (res.code === 200) {
			return res.data
		}
	}

	async fetchmodule2() {
		const init = {
			method: 'POST',
			mode: 'cors',
			body: {
				title: this.state.selectTitle
			},
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			credentials: 'include'
		}
		const res = await fetchTool("/module", init)
		if (res.code === 200) {
			return res.data
		}
	}


	componentWillMount() {
		console.log("ExperimentList componentWillMount()")
		this.setState({
			// dataSource: fetchmodule()
			//获取数据
		})
	}
	componentDidMount() {

		this.setState({
			dataSource: data
		})
	}
	handleNewButton = async () => {
		this.props.handleClickEnter()
		this.props.data(await this.fetchmodule())
	}
	handleDeleteButton = () => {
		const selectTitleDelte = this.state.selectTitle;
		const self = this;
		if (selectTitleDelte === '') {
			alert("删除失败，请先选择要删除的选项")
		}
		else {
			confirm({
				title: 'Do you Want to delete this item?',
				content: selectTitleDelte,
				onOk() {
					//发送selectTitleDelte
					// message.success("删除成功")
					self.setState({
						//发送数据，获取列表
						// dataSource: fetchmodule2()
					})

				}
			})
		}
	}

	onRowClick = (record, index) => {
		let selectKey = [index];
		Modal.info({
			title: "信息",
			content: record.title
		})
		this.setState({
			selectedRowKeys: selectKey,
			selectedItem: record,
			selectTitle: record.title
		})
	}
	// getCookieValue = (name) => {
	// 	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	// 	return arr;
	// }

	//进入页面，并将参数传递给ExperimentPanel 组件
	handleEnterModelButton = () => {
		this.props.handleClickEnter(),
			this.props.handleEnterModelBtn(this.state.selectTitle)

	}
	render() {

		const columns = [
			{
				title: "title",
				dataIndex: 'title',
				width: 100,
				render: text => <a>{text}</a>,
			},
			{
				title: 'description',
				dataIndex: 'description',
				width: 100,
			},
			{
				title: 'status',
				dataIndex: 'status',
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



		// const props = {
		// 	name: 'file',
		// 	method:'UPDATE',
		// 	action: 'localhost:8888/hdfs/',
		// 	headers: {
		// 	"Content-Type": 'multipart/form-data',
		// 	"Cookies":this.getCookieValue("loginToken")
		// 	},
		// onChange(info) {
		// 	  if (info.file.status !== 'uploading') {
		// 		console.log(info.file, info.fileList);
		// 	  }
		// 	  if (info.file.status === 'done') {
		// 		message.success(`${info.file.name} file uploaded successfully`);
		// 	  } else if (info.file.status === 'error') {
		// 		message.error(`${info.file.name} file upload failed.`);
		// 	  }
		// 	},
		//   }



		return (
			<div style={{ marginLeft: 20, marginTop: 20 }}>
				<Row>
					<Col span={12}>
						<Button type="primary" style={{ marginRight: 10, marginBottom: 10 }} onClick={this.handleNewButton}>
							新建项目
						</Button>
						<Button type="primary" style={{ marginRight: 10, marginBottom: 10 }}
							onClick={this.handleEnterModelButton}>
							进入项目
						</Button>
						<Button type="primary"
							onClick={this.handleDeleteButton} style={{ marginBottom: 10 }}>
							删除</Button>

						<Table
							bordered
							rowSelection={rowSelection}
							onRow={(record, index) => {
								return {
									onClick: event => { this.onRowClick(record, index) }, // 点击行
								};
							}}
							columns={columns}
							dataSource={this.state.dataSource}
							pagination={{ pageSize: 6 }} />
					</Col>
					<Col span={12}>
						<GGEditor>
							<FlowMinimap></FlowMinimap>
						</GGEditor>
					</Col>
				</Row>

			</div>)
	}
}

export default ExperimentList;






// class ExperimentList extends React.Component {

// 	state = {
// 		dataSource: [],
// 	}

// 	componentDidMount() {
// 		const data = [
// 			{
// 				key: 0,
// 				date: '2018-02-11',
// 				filename: 'test1',
// 				user: '20191107xx'
// 			},
// 			{
// 				key: 1,
// 				date: '2018-03-11',
// 				filename: 'test2',
// 				user: '20191107xx'
// 			},
// 			{
// 				key: 2,
// 				date: '2018-04-11',
// 				filename: 'test3',
// 				user: '20191107xx'
// 			},
// 			{
// 				key: 3,
// 				date: '2018-05-11',
// 				filename: 'test4',
// 				user: '20191107xx'
// 			},
// 			{
// 				key: 4,
// 				date: '2018-06-11',
// 				filename: 'test5',
// 				user: '20191107xx'
// 			},
// 			{
// 				key: 5,
// 				date: '2018-09-11',
// 				filename: 'test6',
// 				user: '20191107xx'
// 			},
// 		];
// 		this.setState({
// 			dataSource: data
// 		})
// 	}

// 	handleNewButton = async () => {
// 		this.props.handleClickEnter()
// 	}

// 	handleDeleteButton = () => {
// 		alert("你确定删除吗");
// 	}

// 	onRowClick = (record, index) => {
// 		let selectKey = [index];
// 		Modal.info({
// 			title: "信息",
// 			content: record.filename
// 		})
// 		this.setState({
// 			selectedRowKeys: selectKey,
// 			selectedItem: record
// 		})

// 	}

// 	// getCookieValue = (name) => {
// 	// 	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
// 	// 	return arr;
// 	// }
// 	render() {

// 		const columns = [
// 			{
// 				title: 'FileName',
// 				dataIndex: 'filename',
// 				width: 100,
// 				render: text => <a>{text}</a>,
// 			},
// 			{
// 				title: 'Date',
// 				dataIndex: 'date',
// 				width: 100,
// 			},
// 			{
// 				title: 'User',
// 				dataIndex: 'user',
// 				width: 100,
// 			},
// 			// {
// 			// 	title: 'Action',
// 			// 	key: 'action',
// 			// 	width: 100,
// 			// 	// render: () => <a>Delete</a>,
// 			// },
// 		]

// 		const { selectedRowKeys } = this.state;
// 		const rowSelection = {
// 			type: "radio",
// 			selectedRowKeys
// 		};

// 		// const props = {
// 		// 	name: 'file',
// 		// 	method:'UPDATE',
// 		// 	action: 'localhost:8888/hdfs/',
// 		// 	headers: {
// 		// 	"Content-Type": 'multipart/form-data',
// 		// 	"Cookies":this.getCookieValue("loginToken")
// 		// 	},
// 		// onChange(info) {
// 		// 	  if (info.file.status !== 'uploading') {
// 		// 		console.log(info.file, info.fileList);
// 		// 	  }
// 		// 	  if (info.file.status === 'done') {
// 		// 		message.success(`${info.file.name} file uploaded successfully`);
// 		// 	  } else if (info.file.status === 'error') {
// 		// 		message.error(`${info.file.name} file upload failed.`);
// 		// 	  }
// 		// 	},
// 		//   }

// 		return (
// 			<div style={{ marginLeft: 20, marginTop: 20 }}>
// 				<Row>
// 					<Col span={12}>
// 						<Button type="primary" style={{ marginRight: 10, marginBottom: 10 }} onClick={this.handleNewButton}>
// 							新建项目
// 						</Button>
// 						<Button type="primary" onClick={this.handleDeleteButton} style={{ marginBottom: 10 }}>删除</Button>
// 						<Table
// 							bordered
// 							rowSelection={rowSelection}
// 							onRow={(record, index) => {
// 								return {
// 									onClick: event => { this.onRowClick(record, index) }, // 点击行
// 									//   onDoubleClick: event => {},
// 									//   onContextMenu: event => {},
// 									//   onMouseEnter: event => {}, // 鼠标移入行
// 									//   onMouseLeave: event => {},
// 								};
// 							}}
// 							columns={columns}
// 							dataSource={this.state.dataSource}
// 							pagination={{ pageSize: 6 }} />
// 					</Col>
// 					<Col span={12}>
// 						<GGEditor>
// 							<FlowMinimap></FlowMinimap>
// 						</GGEditor>
// 					</Col>
// 				</Row>

// 			</div>)
// 	}
// }

// export default ExperimentList;