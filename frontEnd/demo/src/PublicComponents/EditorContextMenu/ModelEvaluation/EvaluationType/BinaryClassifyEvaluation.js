import React, { Fragment } from "react";
import { Tabs } from "antd";
import { SingleLineSet } from "../EvaluatePicture/SingleLineSet";

const { TabPane } = Tabs;
var echarts = require("echarts");
var myChart = null;

class BinaryEvaluation extends React.Component {

	state = {
		activeKey: null,
		panes: [],
	}

	//标签页变换处理
	onChange = activeKey => {
		this.setState({ activeKey });
	};

	componentWillMount() {
		const evaluationInfo = this.props.evaluationInfo || {};
		const keys = Object.keys(evaluationInfo);
		const panes = new Array();

		keys.map(key => {
			if (Object.prototype.toString.call(evaluationInfo[key]) == '[object Array]') {
				panes.push({ title: `${key}曲线图`, key });
			}
		})

		this.setState({ panes, activeKey: panes[0].key });
	}

	//设置默认标签页图表
	componentDidMount() {
		const { evaluationInfo, loading } = this.props;
		const { panes } = this.state;

		console.log(document.getElementById(panes[0].key));

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
		const { panes } = this.state;
		return (
			<Fragment>
				{/* <div style={{ top: "40px", height: "300px", width: "40%", float: "left" }}>
					<Table bordered dataSource={dataSource} columns={columns} />
				</div> */}
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
									style={{ height: "300px", width: "60%", float: "left" }}
								/>
							</TabPane>))
					}
				</Tabs>
			</Fragment>
		)
	}
}
export default BinaryEvaluation;