import React from 'react';
import GGEditor from '@src';
import { Table, Button, Row, Col, Modal } from 'antd';
import { fetchTool } from '../../FetchTool';
import FlowMinimap from './FlowMinimap';

const { confirm } = Modal;

class ExperimentList extends React.Component {

	state = {
		dataSource: [],
		selectedRowKeys: null,
		minimapInfo: null,
		experimentId: null,
	}

	fetchModalList = async () => {
		const init = {
			method: 'GET',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
			credentials: 'include'
		}
		const res = await fetchTool("/experiments/description", init)
		if (res.code === 200) {
			return res.data
		}
	}

	async componentWillMount() {
		this.setState({
			dataSource: await this.fetchModalList()
		})
	}

	fetchModalStream = async (experimentId) => {
		const init = {
			method: 'GET',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
			credentials: 'include'
		}
		const res = await fetchTool(`/experiments/${experimentId}`, init)
		if (res.code === 200) {
			return res.data
		}
	}

	// 新建项目时第一次进入
	handleNewButton = async () => {
		this.props.handleClickEnter(null);
	}

	// 完成标题到id的转化
	getExperimentIdByText = (text) => {
		const { dataSource } = this.state;
		for (let index in dataSource) {
			const data = dataSource[index];
			if (data.title === text) {
				return data.experimentId;
			}
		}
	}

	//选择项目时，点击项目名称进入
	handleEnterModel = async (text) => {
		const experimentId = this.getExperimentIdByText(text);
		this.props.handleClickEnter(handleEnterModel);
		this.props.handleEnterModel(await this.fetchModalStream(experimentId));
	}

	// 点击删除时
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

	onRowClick = async (record, index) => {
		const experimentId = this.getExperimentIdByText(record.title);

		if(this.state.experimentId === experimentId) return;
		
		this.setState({
			selectedRowKeys: [index],
			minimapInfo: await this.fetchModalStream(experimentId),
		})
	}

	render() {

		const { dataSource } = this.state;
		let data = new Array();
		dataSource.map((item) => {
			data.push({
				title: item.title,
				description: item.description,
			})
		})

		const columns = [
			{
				title: "title",
				dataIndex: 'title',
				width: 100,
				render: text => <a onClick={this.handleEnterModel.bind(this, text)} >{text}</a>,
			},
			{
				title: 'description',
				dataIndex: 'description',
				width: 100,
			},
		]

		const { selectedRowKeys, minimapInfo } = this.state;
		const rowSelection = {
			type: "radio",
			selectedRowKeys
		};

		return (
			<div style={{ marginLeft: 20, marginTop: 20 }}>
				<Row>
					<Col span={12}>
						<Button
							type="primary"
							style={{ marginRight: 10, marginBottom: 10 }}
							onClick={this.handleNewButton}
						>
							新建项目
						</Button>
						<Button
							type="primary"
							onClick={this.handleDeleteButton}
							style={{ marginBottom: 10 }}
						>
							删除
						</Button>

						<Table
							bordered
							rowSelection={rowSelection}
							onRow={(record, index) => {
								return {
									onClick: event => { this.onRowClick(record, index) }, // 点击行
								};
							}}
							columns={columns}
							dataSource={data}
							pagination={{ pageSize: 6 }} />
					</Col>
					<Col span={12}>
						<GGEditor>
							<FlowMinimap minimapInfo={minimapInfo} ></FlowMinimap>
						</GGEditor>
					</Col>
				</Row>
			</div>)
	}
}

export default ExperimentList;