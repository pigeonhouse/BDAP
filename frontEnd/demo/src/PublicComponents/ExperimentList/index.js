import React from 'react';
import GGEditor from '@src';
import { Table, Button, Row, Col, message, Modal, Input, Icon } from 'antd';
import { fetchTool } from '../../FetchTool';
import FlowMinimap from './FlowMinimap';
const { confirm } = Modal;

class ExperimentList extends React.Component {

	state = {
		dataSource: [],
		selectedRowKeys: null,
		minimapInfo: null,
		experiment: null,
		//下面为搜索服务
		filterDropdownVisible: false,
		searchText: '',
		filtered: false,
		searchData: [],
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
		const response = await fetchTool("/experiment-service/experiments/description", init);
		return await response.json();
	}

	async componentWillMount() {
		const data = await this.fetchModalList();
		this.setState({
			dataSource: data,
			searchData: data.map(r => r),
		})
	}

	// 新建项目时第一次进入
	handleNewButton = async () => {
		this.props.handleClickEnter(null);
	}

	// 完成标题到id的转化，时而title是string 点击搜索时为json文件，但这个判断没有问题
	getExperimentByText = (text) => {
		const { dataSource } = this.state;
		for (let index in dataSource) {
			const data = dataSource[index];
			if (data.title === text) {
				return data;
			}
		}
	}

	//选择项目时，点击项目名称进入
	handleEnterModel = async (text) => {
		const experiment = this.getExperimentByText(text);
		this.props.handleClickEnter(experiment);
	}

	deleteModal = async (experimentId) => {
		const init = {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
			credentials: 'include'
		}

		const response = await fetchTool(`/experiment-service/experiments/${experimentId}`, init);
		return await response.json();
	}

	//当执行删除操作时，对searchData进行处理，即执行删除操作
	getDeleteSearchData = (experimentId) => {
		const searchData = this.state.searchData;
		for (let index in searchData) {
			const datatemp = searchData[index];
			if (datatemp.experimentId === experimentId) {
				searchData.splice(index, 1);
				this.setState({ searchData: searchData })
			}
		}
	}

	//找到dataSoure的title对应的searchData的title
	getDeleteTitle = (experimentId) => {
		const searchData = this.state.searchData;
		for (let index in searchData) {
			const datatemp = searchData[index];
			if (datatemp.experimentId === experimentId) {
				return datatemp.title
			}
		}
	}

	//点击删除的处理
	handleDeleteButton = () => {
		const selectTitleDelte = this.state.selectedRowKeys;
		const self = this;

		if (selectTitleDelte === null) {
			message.warning("请先选择要删除的选项");
		}
		else {
			var { dataSource, experiment } = self.state;
			const experimentId = dataSource[selectTitleDelte].experimentId;
			const titleKey = self.getDeleteTitle(experimentId);
			confirm({
				title: '确定要删除此项目？',
				content: titleKey,
				onOk() {
					dataSource.splice(selectTitleDelte[0], 1);
					self.getDeleteSearchData(experimentId);
					self.deleteModal(experiment.experimentId);
					self.setState({ dataSource, selectedRowKeys: null });
				}
			})
		}
	}

	fetchModalStream = async (experiment) => {
		const init = {
			method: 'GET',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
			credentials: 'include'
		}

		const response = await fetchTool(`/experiment-service/experiments/${experiment.experimentId}`, init)

		return await response.json();
	}

	onRowClick = async (record, index) => {
		const experiment = this.state.experiment;
		const nextExperiment = this.getExperimentByText(record.title);

		if (experiment !== null &&
			experiment.experimentId === nextExperiment.experimentId
		) return;

		this.setState({
			experiment: nextExperiment,
			selectedRowKeys: [index],
			minimapInfo: await this.fetchModalStream(nextExperiment),
		})
	}

	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.onRowClick(selectedRows[0], selectedRowKeys[0])
	};

	onInputChange = (e) => {
		this.setState({ searchText: e.target.value });
	}

	//处理重置按钮
	handelResetButton = () => {
		this.setState({
			searchText: "",
		}, () => { this.onSearch() })
	}

	//对搜索数据的匹配
	onSearch = () => {
		const { searchText } = this.state;
		const data = this.state.searchData;
		const reg = new RegExp(searchText, 'gi');
		this.setState({
			filterDropdownVisible: false,
			filtered: !!searchText,
			searchText: "",
			dataSource: data.map((record) => {
				const match = record.title.match(reg);
				if (!match) {
					return null;
				}
				return {
					...record,
					title: (
						<span>
							{record.title.split(reg).map((item, i) => (
								i > 0 ? [<span className={record.title} style={{ color: "red" }}>{match[0]}</span>, item] : item
							))}
						</span>
					),
				};
			}).filter(record => !!record),
		});
	}

	//搜索页面的实现
	getColumnSearchProps = () => ({
		filterDropdown: (
			<div style={{ padding: "8px", borderRadius: "6px", background: "#fff", boxShadow: "0 1px 5px" }}>
				<Input
					style={{ width: "150px" }}
					ref={ele => this.searchInput = ele}
					placeholder="Search name"
					value={this.state.searchText}
					onChange={this.onInputChange}
					onPressEnter={this.onSearch}
				/>
				<Button onClick={this.onSearch}
					style={{ marginLeft: 10, marginTop: 10 }}>搜索</Button>
				<Button onClick={this.handelResetButton}
					style={{ marginLeft: 10, marginTop: 10 }}>重置</Button>
			</div>
		),
		filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
		filterDropdownVisible: this.state.filterDropdownVisible,
		onFilterDropdownVisibleChange: (visible) => {
			this.setState({
				filterDropdownVisible: visible,
			}, () => this.searchInput.focus());
		},
	})


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
				width: 150,
				...this.getColumnSearchProps(),
				render: text => <a onClick={this.handleEnterModel.bind(this, text)} >{text}</a>,
			},
			{
				title: 'description',
				dataIndex: 'description',
				width: 250,
			},
		]

		const { selectedRowKeys, minimapInfo } = this.state;
		const rowSelection = {
			type: "radio",
			onChange: this.onSelectChange,
			selectedRowKeys
		};

		return (
			<Row style={{ height: "calc(100vh - 105px)" }} >
				<Col span={1}></Col>
				<Col span={11} >
					<div style={{ height: "calc(100vh - 105px)", paddingTop: 50 }} >
						<Button
							style={{ marginRight: 10, marginBottom: 10 }}
							onClick={this.handleNewButton}
						>
							新建项目
						</Button>
						<Button
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
							scroll={{ y: "calc(105vh - 405px)", x: '430px' }}
                            pagination={false}							
						/>
					</div>
				</Col>
				<Col span={1} style={{ height: "calc(100vh - 105px)", borderRight: "1px solid #ececec" }}> </Col>
				<Col span={1} ></Col>
				<Col span={10}>
					<GGEditor>
						<FlowMinimap minimapInfo={minimapInfo} ></FlowMinimap>
					</GGEditor>
				</Col>
			</Row>
		)
	}
}

export default ExperimentList;