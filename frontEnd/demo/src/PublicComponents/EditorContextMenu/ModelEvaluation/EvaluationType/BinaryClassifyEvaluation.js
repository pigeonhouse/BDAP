import React from "react";
import { Tabs, Row, Col } from "antd";
import { SingleLineSet } from "../EvaluatePicture/SingleLineSet";

import CollapseTable from '../EvaluatePicture/CollapseTable';

const { TabPane } = Tabs;
var echarts = require("echarts");
var myChart = null;

class BinaryEvaluation extends React.Component {

	state = {
		activeKey: null,
		panes: [],
		statistic: [],
	}

	//标签页变换处理
	onChange = activeKey => {
		this.setState({ activeKey });
	};

	componentWillMount() {
		const evaluationInfo = this.props.evaluationInfo || {};
		const keys = Object.keys(evaluationInfo);
		const panes = new Array();
		const statistic = new Array();

		keys.map(key => {
			if (Object.prototype.toString.call(evaluationInfo[key]) === '[object Object]') {
				panes.push({ title: `${key}曲线图`, key });
			} else {
				statistic.push(<div>{key}:&nbsp;&nbsp;{evaluationInfo[key]}</div>);
			}
		})

		if (panes.length === 0) {
			this.setState({ panes, statistic });
		} else this.setState({ panes, activeKey: panes[0].key, statistic });
	}

	//设置默认标签页图表
	componentDidMount() {
		const { evaluationInfo, loading } = this.props;
		const { panes } = this.state;

		myChart = echarts.init(document.getElementById(panes[0].key));
		SingleLineSet(myChart, evaluationInfo[panes[0].key], loading);
	}

	//切换标签页更换图
	componentDidUpdate() {
		const { activeKey } = this.state;
		const { evaluationInfo, loading } = this.props;

		myChart = echarts.init(document.getElementById(activeKey));
		myChart.clear();
		SingleLineSet(myChart, evaluationInfo[activeKey], loading);
	}

	render() {
		const { panes, statistic } = this.state;
		return (
			<Row>
				<Col span={10} >
					<CollapseTable statistic={statistic} />
				</Col>
				<Col span={1}></Col>
				<Col span={13}>
					<Tabs
						onChange={this.onChange}
						activeKey={this.state.activeKey}
						type="card"
						style={{ height: "100%", width: "100%" }}
					>
						{
							panes.map(pane => (
								<TabPane tab={pane.title} key={pane.key} >
									<div
										id={pane.key}
										style={{ height: "300px", width: "100%", float: "left" }}
									/>
								</TabPane>))
						}
					</Tabs>
				</Col>
			</Row>
		)
	}
}
export default BinaryEvaluation;