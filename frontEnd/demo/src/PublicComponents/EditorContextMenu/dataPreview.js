import React, { Component } from 'react'
import { Modal, Table, Collapse, Icon, Row, Col, Button, Cascader } from 'antd';
import {
	Command,
} from '@src';
import styles from './index.less';
import { withPropsAPI } from '@src';

const Panel = Collapse.Panel;

var echarts = require('echarts');

class DataPreview extends Component {
	state = {
		visible: false,
		compareVisible: false,
		sum: 1000,
		currentIndex: -1,
		data: [],
		list: [],
		newRandomkey: 0,
		groupNumbers: 3,
		visibleChartRadio: false,
		currentdata: [],
		currentChartType: 'bar'
	}

	Chart = (indexOfFeature, data) => {//选中数据
		this.setState({
			currentIndex: indexOfFeature,
			currentdata: data,
			compareVisible: true
		})
	}

	Datum = () => {	//	展示数据的表项
		const { propsAPI } = this.props;
		var item = propsAPI.getSelected()[0];
		const currentData = item.getModel().Dataset;
		if (currentData.length === 0) return;
		if (item.getModel().anchor[1] > 1) return;
		var columns = new Array()
		var sum = 0;
		for (let i = 0; i < currentData.length; i++) {
			let first = currentData[i].value[0]
			let len = 50;
			len = String(first).length > currentData[i].label.length ? (String(first).length + 2) * 13 : (currentData[i].label.length + 2) * 13;
			sum = sum + len
			columns.push({
				title: <Button
					onClick={() => { this.visibleChart(i, currentData[i]) }}
				>{currentData[i].label}
				</Button>,
				dataIndex: currentData[i].label,
				width: len,
				align: 'center',
			})
		}
		this.setState({ currentData: currentData, sum })
		this.setState({ col: columns, currentIndex: [], compareVisible: false })
		let la = new Array();
		for (let i in currentData) {
			la.push([currentData[i].label, 'false'])
		}
		la = la.map(a => a[0])
		this.setState({ labelArray: la })

		var datas = new Array()
		var ln;
		for (let i = 0; i < currentData.length; i++) {
			if (currentData[i].value.hasOwnProperty('length')) {
				ln = currentData[i].value.length;
				break;
			}
		}
		for (let i = 0; i < ln; i++) {
			var temp = new Array()
			for (let j = 0; j < currentData.length; j++) {
				temp[currentData[j].label] = currentData[j].value[i]
			}
			datas.push(temp)
		}

		var list = "";
		for (let i = 0; i < columns.length; i++) {
			list += columns[i].title;
			if (i + 1 != columns.length) list += ',';
			else list += ' \n ';
		}

		let N = -1;
		Object.getOwnPropertyNames(datas[0]).forEach(function (key) {
			N++;
		})
		for (let i = 0; i < datas.length; i++) {
			let j = 0;
			Object.getOwnPropertyNames(datas[i]).forEach(function (key) {
				if (key != "length") {
					j++;
					list += datas[i][key];
					if (j != N) list += ',';
					else list += ' \n ';
				}
			})
		}

		this.setState({ data: datas, list: list });
	}
	handleOk = (e) => {//处理调出页面的ok事件
		this.setState({
			visible: false,
			MlEvaluteVisible: false,
			visibleChartRadio: false,
			col: [],
			data: []
		});
	}

	handleCancel = (e) => {//处理调出页面的cancel事件
		this.setState({
			visible: false,
			MlEvaluteVisible: false,
			visibleChartRadio: false,
			col: [],
			data: []
		});
	}

	visibleChart = (indexOfFeature, data) => { //展示统计信息
		this.Chart(indexOfFeature, data);
		this.setState({ visibleChartRadio: true, currentChartType: 'bar' })
	}

	showModal = () => { //让数据预览页面显示的函数
		this.setState({
			visible: true,
			newRandomkey: (this.state.newRandomkey + 1) % 10
		});
		this.Datum();
	}

	compare = () => { //两个变量的散点图
		if (this.state.compareVisible) {
			var options = [{ value: "None", label: "None" }]

			let labelarray = this.state.labelArray
			for (let i = 0; i < labelarray.length; i++) {
				options.push({ value: labelarray[i], label: labelarray[i] })
			}
			return (
				<div>
					<span>compare to  </span>
					<Cascader defaultValue={["None"]} options={options} onChange={this.onChange} size="small" />
				</div>
			)
		}
	}
	onChange = (chosenName) => { //使数据可视化的函数

		let data = this.state.currentData

		if (chosenName[0] != "None") {

			var xName = data[this.state.currentIndex].label
			var xData = data[this.state.currentIndex].value
			var yData = []
			var yName = []
			for (let i = 0; i < data.length; i++) {
				if (data[i].label == chosenName[0]) {
					yData.push(data[i].value)
					yName.push(data[i].label)
				}
			}
			yData = yData[0]
			yName = yName[0]

			var linChartData = []
			for (let i = 0; i < xData.length; i++) {
				linChartData.push([xData[i], yData[i]])
			}

			document.getElementById('main').removeAttribute("_echarts_instance_")
			var myChart = echarts.init(document.getElementById('main'));

			myChart.setOption({
				xAxis: { name: xName },
				yAxis: { name: yName },
				series: [{
					symbolSize: 6,
					data: linChartData,
					type: 'scatter'
				}]
			})
		}
	}
	staticInformation = () => { //对选中的数据进行处理
		if (this.state.compareVisible) {
			console.log("--------------")
			console.log(this.state.currentData)

			let data = this.state.currentData
			var statics = data[this.state.currentIndex].stat
			if (statics.type == "number") {
				return (
					<div>
						<Col span={10}>
							<Row style={{ marginBottom: 10 }}>
								<span>平均值：</span>
								<span>{statics.average}</span>
							</Row>
							<Row style={{ marginBottom: 10 }}>
								<span>最大值：</span>
								<span>{statics.max}</span>
							</Row>
							<Row style={{ marginBottom: 10 }}>
								<span>方差：</span>
								<span>{statics.variance}</span>
							</Row>
							<Row style={{ marginBottom: 10 }}>
								<span>缺失值个数：</span>
								<span>{statics.numOfNull}</span>
							</Row>
						</Col>
						<Col span={12}>
							<Row style={{ marginBottom: 10 }}>
								<span>中位数：</span>
								<span>{statics.median}</span>
							</Row>
							<Row style={{ marginBottom: 10 }}>
								<span>最小值：</span>
								<span>{statics.min}</span>
							</Row>
							<Row style={{ marginBottom: 10 }}>
								<span>标准差：</span>
								<span>{statics.standardDeviation}</span>
							</Row>
						</Col>
					</div>
				)
			} else if (statics.type == "string") {
				let data = this.state.currentData
				var statics = data[this.state.currentIndex].stat
				let numOfNull = 0
				for (let i = 0; i < statics.value.length; i++) {
					if (statics.value[i].name == null) {
						numOfNull = statics.value[i].count
					}
				}

				let uniqueValue = statics.value.length
				return (
					<div>
						<Row style={{ marginBottom: 10 }}>
							<span>缺失值个数：</span>
							<span>{numOfNull}</span>
						</Row>

						<Row style={{ marginBottom: 10 }}>
							<span>不同值个数：</span>
							<span>{uniqueValue}</span>
						</Row>

					</div>
				)
			}
			return (<div></div>)
		}
	}

	createChart = () => {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		var myChart = echarts.init(document.getElementById('main'));

		var graph = {};
		var categories = [];
		var option;
		for (var i = 0; i < 9; i++) {
			categories[i] = {
				name: '类目' + i
			};
		}

		var nodesNum = 62;
		var edges = item.getModel().Dataset;

		graph.nodes = [];
		graph.links = [];
		for (let i = 0; i < 6; i++) {
			for (let node = 0; node < nodesNum; node++) {
				graph.nodes.push({
					id: node + i * nodesNum,
					itemStyle: null,
					symbolSize: 10,
					value: 10,
					category: i,
					x: null,
					y: null,
					draggable: true,
					name: node + i * nodesNum
				});
			}

			for (let edge = 0; edge < edges[0].value.length; edge++) {
				graph.links.push({
					id: edge,
					lineStyle: { normal: {} },
					name: null,
					source: edges[0].value[edge] + i * nodesNum,
					target: edges[1].value[edge] + i * nodesNum,
				})
			}
		}

		console.log(graph)

		option = {
			title: {
				text: 'Les Miserables',
				subtext: 'Default layout',
				top: 'bottom',
				left: 'right'
			},
			tooltip: {},
			legend: [{
				data: categories.map(function (a) {
					return a.name;
				})
			}],
			animation: false,
			series: [
				{
					name: 'Les Miserables',
					type: 'graph',
					layout: 'force',
					data: graph.nodes,
					links: graph.links,
					categories: categories,
					roam: true,
					label: {
						normal: {
							position: 'right'
						}
					},
					force: {
						repulsion: 100
					}
				}
			]
		};

		myChart.setOption(option);
	}

	render() {
		return (
			<div>
				<Command name="showpicture">
					<div className={styles.item} onClick={this.showModal}>
						<Icon type="form" />
						<span>数据预览</span>
					</div>
				</Command>
				<Modal
					key={this.state.newRandomkey}
					title="数据展示"
					visible={this.state.visible}
					style={{ top: 30 }}
					width={1200}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					{/* <Button onClick={this.createChart}>展示关系图</Button>
					<div id="main" style={{ maxWidth: 800, height: 600 }} /> */}

					<Row>
						<Col span={15} >
							<div >
								<Table
									columns={this.state.col}
									dataSource={this.state.data}
									pagination={{ pageSize: 70 }}
									scroll={{ x: `${this.state.sum}px`, y: 460 }}
									size="small" />
							</div>
						</Col>
						<Col span={1} >
						</Col>
						<Col span={8} >
							<Collapse bordered={false} defaultActiveKey={['1', '2']}>
								<Panel header="统计信息" key="1">
									<div data-step="5">
										{this.staticInformation()}
									</div>
								</Panel>

								<Panel header="可视化" key="2"  >
									<div >
										<div>{this.compare()}
										</div>
										<div id="main" style={{ maxWidth: 400, height: 280 }}> </div>
									</div>
								</Panel>
							</Collapse>
						</Col>
					</Row>
				
				</Modal>
			</div>

		);
	}
}
export default withPropsAPI(DataPreview);
