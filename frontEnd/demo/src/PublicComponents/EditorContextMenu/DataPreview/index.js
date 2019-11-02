import React, { Component } from 'react'
import { Modal, Icon } from 'antd';
import { Command, withPropsAPI } from '@src';
import TablePreview from './TablePreview';
import { fetchTool } from '../../../FetchTool';
import ChartPreview from './ChartPreview';

import VisualizedPanel from '../../../pages/VisualizedPanel';
import styles from '../index.less';
import Papa from 'papaparse';

var echarts = require('echarts');

class DataPreview extends Component {

	state = {
		newRandomkey: 0,
		visible: false,
		labelArray: [],
		dataSet: [],
		labelType: {},
		fileName: null,
		path: null,
	}

	getData = async () => {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const init = {
			method: 'GET',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
			credentials: 'include'
		}

		const res = await fetchTool(`/flow/node/data/${item.id}_0`, init);

		if (res.code === 200) {

			console.log(res);

			// 通过papa转化
			const results = Papa.parse(res.data, { header: true, dynamicTyping: true });
			let labelType = {};
			const fieldNameArray = results.meta.fields;

			const result = results.data[0];
			for (let i in result) {
				if (typeof (result[i]) === "number") {
					labelType[i] = "int";
				} else {
					labelType[i] = "string";
				}
			}

			this.setState({
				labelArray: fieldNameArray,
				dataSet: results.data,
				labelType
			})
		}
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

	showModal = () => { //让数据预览页面显示的函数
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const { path, fileName } = item.getModel();
		this.setState({ path, fileName })

		this.setState({
			visible: true,
			newRandomkey: (this.state.newRandomkey + 1) % 10
		});

		// this.getData();
	}

	render() {
		const { dataSet, labelArray, newRandomkey, visible } = this.state;
		const { path, fileName } = this.state;
		return (
			<div>
				<Command name="showpicture">
					<div className={styles.item} onClick={this.showModal}>
						<Icon type="form" />
						<span>数据预览</span>
					</div>
				</Command>
				<Modal
					key={newRandomkey}
					title="数据展示"
					visible={visible}
					style={{ top: 30 }}
					width={1200}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<VisualizedPanel filePath={`${path}/${fileName}`} />
					{/* <TablePreview labelArray={labelArray} dataSet={dataSet} ></TablePreview> */}
				</Modal>
			</div>
		);
	}
}

export default withPropsAPI(DataPreview);