import React from "react";
import { Tabs, Table } from "antd";
const { TabPane } = Tabs;

//图列表清单
const panes = [
	{ title: '混淆矩阵表', key: 'Confusion Matrix' },

];

//右表数据
const dataSource = [
	{
		key: '1',
		name: 'hinge-loss',
		value: 0.7
	},
	{
		key: '2',
		name: 'RMSE',
		value: 0.556
	},
	{
		key: '3',
		name: 'Hamming Distanse',
		value: 0.8
	},
	{
		key: '4',
		name: '准确率',
		value: 0.8
	},
	{
		key: '7',
		name: 'hinge-loss',
		value: 0.7
	},
	{
		key: '8',
		name: 'RMSE',
		value: 0.556
	},
	{
		key: '55',
		name: 'Hamming Distanse',
		value: 0.8
	},
	{
		key: '33',
		name: '准确率',
		value: 0.8
	},
];
//右表表项
const columns = [
	{
		title: '评价指标',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '值',
		dataIndex: 'value',
		key: 'value',
	},
];
//混淆矩阵列名
const Class = ["类1", "类2", "类3", "类4", "类5", "类6", "类7", "类8", "类9"]
//列名固定值
const Title = [
	{
		title: '真实值/预测值',
		width: 110,
		dataIndex: 'name',
		key: 'name',
		fixed: 'left'
	},
]
const data = [];

//处理混淆矩阵列名
for (var i = 0; i < Class.length; i++) {
	Title.push({
		title: Class[i],
		width: 50,
		dataIndex: Class[i],
		key: 'i',
	})
}

//矩阵内数据
var rowdata = []
for (var i = 0; i < Class.length; i++) {
	var tmp = [];
	for (var j = 0; j < Class.length; j++) {

		tmp.push((i * Class.length + j) * 0.01);
	}
	rowdata.push(tmp);
}

//将矩阵数据赋予表格
for (var i = 0; i < Class.length; i++) {
	var tmp = {
		key: i,
		name: Class[i]
	}
	for (let j = 0; j < Class.length; j++)
		tmp[Class[j]] = rowdata[i][j].toFixed(2)
	console.log(tmp)
	data.push(tmp)
}
class MultiClassifyEvaluation extends React.Component {

	constructor(props) {
		super();
		this.state = {
			visible: props.visible,
			activeKey: panes[0].key
		}

	}

	render() {
		return (
			<div >
				<Tabs onChange={this.onChange}
					activeKey={this.state.activeKey} type="card" style={{ height: "100%", width: "100%" }}>
					{panes.map(pane => (
						<TabPane tab={pane.title} key={pane.key} >
							<div  >
								<div style={{ height: "300px", width: "60%", float: "left" }}>
									<Table bordered pagination={false} size="small" columns={Title} dataSource={data} scroll={{ x: true, y: 250 }} />
								</div>
								<div style={{ height: "100%", width: "40%", float: "left" }}>
									<Table bordered pagination={{ pageSize: 4 }} dataSource={dataSource} columns={columns} />
								</div>

							</div>
						</TabPane>))}
				</Tabs>
			</div>
		)
	}
}
export default MultiClassifyEvaluation;