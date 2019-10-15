import React from 'react';
import GGEditor from '@src';
import { Table, Button, Row, Col, Modal } from 'antd';
import { fetchTool } from '../../FetchTool';
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