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
		searchData:[],
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
		const data =  await this.fetchModalList();
		console.log(data)
		console.log("data!")
		this.setState({
			dataSource: data,
			searchData:data,
		})
	}

	// 新建项目时第一次进入
	handleNewButton = async () => {
		this.props.handleClickEnter(null);
	}

	// 完成标题到id的转化
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
		const res = await fetchTool(`/experiments/${experimentId}`, init)
		if (res.code === 202) {
			return res.data
		}
	}
	getDeleteSearchData=(experimentId)=>{
		const searchData=this.state.searchData;
		for (let index in searchData) {
			const datatemp = searchData[index];
			if (datatemp.experimentId === experimentId) {
				searchData.splice(index,1);
				this.setState({searchData})
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
			var { dataSource, experiment} = self.state;
			const titleKey = dataSource[selectTitleDelte].title;
			console.log("titleKey");
			console.log(JSON.stringify(titleKey));
			const experimentId=dataSource[selectTitleDelte].experimentId;
			confirm({
				title: 'Do you Want to delete this item?',
				content: titleKey,
				onOk() {
					self.getDeleteSearchData(experimentId);
					dataSource.splice(selectTitleDelte[0], 1);
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
		const res = await fetchTool(`/experiments/${experiment.experimentId}`, init)
		if (res.code === 200) {
			console.log(res.data)
			return res.data
		}
	}

	onRowClick = async (record, index) => {

		const experiment = this.state.experiment;
        console.log(record.title+"ll")
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
	onSearch = () => {
		const {searchText} = this.state;
		const data = this.state.searchData;
		const reg = new RegExp(searchText, 'gi');
		this.setState({
			filterDropdownVisible: false,
			filtered: !!searchText,
			dataSource: data.map((record) => {
				 const match = record.title.match(reg);
				if (!match) {
					return null;
				}
				return {
					...record,
					key:record.title,
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

	getColumnSearchProps = () => ({
		filterDropdown: (
			<div className="custom-filter-dropdown">
				<Input
					ref={ele => this.searchInput = ele}
					placeholder="Search name"
					value={this.state.searchText}
					onChange={this.onInputChange}
					onPressEnter={this.onSearch}
				/>
				<Button type="primary" onClick={this.onSearch}>Search</Button>
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
			    ...this.getColumnSearchProps(),
				render: text => <a onClick={this.handleEnterModel.bind(this, text)} >{text}</a>,
			},
			{
				title: 'description',
				dataIndex: 'description',
			},
		]

		const { selectedRowKeys, minimapInfo } = this.state;
		const rowSelection = {
			type: "radio",
			onChange: this.onSelectChange,
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