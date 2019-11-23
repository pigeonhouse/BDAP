import React from "react";
import { Tabs, Table, Row,Col,Collapse, Icon, Tooltip } from "antd";
const{Panel} =Collapse;
const { TabPane } = Tabs;
const panes = [{ title: '混淆矩阵表', key: 'Confusion Matrix' },];
class MultiClassifyEvaluation extends React.Component {

	constructor(props) {
		super();
		this.state = {
			visible: props.visible,
			activeKey: panes[0].key,
			totalEvaluationData:[],
			labelEvaluationData:[]
		}

	}

	render() {
		//图列表清单
	
		
	const sampledata={weightedFMeasure:0.8155980037859232,recallByLabel:[0.8924050632911392,0.6708860759493671],accuracy:0.8185654008438819,TPRByLabel:[0.8924050632911392,0.6708860759493671],weightedPrecision:0.8185654008438819,"labels":[0.0,1.0],weightedTPR:0.8185654008438819,precisionByLabel:[0.844311377245509,0.7571428571428571],fMeasureByLabel:[0.8676923076923077,0.7114093959731544],confusionMatrix:[141.0,26.0,17.0,53.0],weightedFPR:0.2552742616033755,weightedRecall:0.8185654008438819,FPRByLabel:[0.3291139240506329,0.10759493670886076]}


//总体性评估指标
 		 //标题
	const totalEvaluationTitle=[{
		title: '评价指标',
		dataIndex: 'name',
		key: 'name',
		width:130
		},
		{
		title: '值',
		dataIndex: 'value',
		key: 'value',
		}]
//数据
	const totalEvaluationData=[
	{
	 key:"1",
	 name:"F值",
	 value:sampledata.weightedFMeasure.toFixed(3)
	},
	{
		key:"2",
		name:"FPR",
		value:sampledata.weightedFPR.toFixed(3)
	   },
	   {
		key:"3",
		name:"准确率",
		value:sampledata.weightedPrecision.toFixed(3)
	   },
	   {
		key:"4",
		name:"召回率",
		value:sampledata.weightedRecall.toFixed(3)
	   },
	   {
		key:"5",
		name:"TPR",
		value:sampledata.weightedTPR.toFixed(3)
		}
	  ]

//分类别评价指标
	const Class = sampledata.labels.map(r=>(r.toString()))
 //标题
 	const labelEvaluationTitle=[{
		title: '评价指标',
		dataIndex: 'name',
		key: 'name',
		width:70,
		render:(text,name)=><span>{name}:&nbsp;&nbsp;<Tooltip text={text}><Icon type="question-circle"></Icon></Tooltip></span>
		},
		]
	for (var i = 0; i < Class.length; i++) {
	labelEvaluationTitle.push({
		title: Class[i].toString(),
		width: 50,
		dataIndex: Class[i].toString(),
		key: 'i',
	})
	}
	const labelEvaluationData=[
	{
		key:"1",
		name:"F值",
		text:"111"
	   },
	   {
		   key:"2",
		   name:"FPR",
		   text:"111"
		  },
		  {
		   key:"3",
		   name:"准确率",
		   text:"111"
		  },
		  {
		   key:"4",
		   name:"召回率",
		   text:"111"
		  },
		  {
		   key:"5",
		   name:"TPR",
		   text:"111"
		  }
	]
	for(var j=0;j<Class.length;j++)
	{
		labelEvaluationData[0][Class[j].toString()]=sampledata.fMeasureByLabel[j].toFixed(3)
		labelEvaluationData[1][Class[j].toString()]=sampledata.FPRByLabel[j].toFixed(3)
		labelEvaluationData[2][Class[j].toString()]=sampledata.precisionByLabel[j].toFixed(3)
		labelEvaluationData[3][Class[j].toString()]=sampledata.recallByLabel[j].toFixed(3)
		labelEvaluationData[4][Class[j].toString()]=sampledata.TPRByLabel[j].toFixed(3)
	}
//混淆矩阵表头

	const CMTitle=JSON.parse(JSON.stringify(labelEvaluationTitle));
	CMTitle[0]["title"]="真实值/预测值"
	CMTitle[0]["width"]=80;
	//混淆矩阵数据
	const CMData=[]
	for (var i = 0; i < Class.length; i++) {
	var tmp = {
		key: i,
		name: Class[i].toString()
	}
	for (var j = 0; j < Class.length; j++)
		tmp[Class[j].toString()] = sampledata.confusionMatrix[j*Class.length+i].toFixed(2);
		
	CMData.push(tmp)
	}



		return (
			<div >
				<Tabs onChange={this.onChange}
					activeKey={this.state.activeKey} type="card" style={{ height: "100%", width: "100%" }}>
					{panes.map(pane => (
						<TabPane tab={pane.title} key={pane.key} >
							<Row  >
								<Col span={10}>
								<Collapse defaultActiveKey={['1']} accordion>
    								<Panel header="总体性评估指标" key="1">
									<Table bordered pagination={false} size="small" columns={totalEvaluationTitle} dataSource={totalEvaluationData} scroll={{  y: 250 }} />
    								</Panel>
   									<Panel header="分类别评估指标" key="2">
									   <Table bordered pagination={false} size="small" columns={labelEvaluationTitle} dataSource={labelEvaluationData} scroll={{ x:true,y: 250 }} />
    								</Panel>
  								</Collapse>
									
								</Col>
								<Col span={1}/>
					
								<Col span={13}>
									<Table bordered pagination={false}  size="small" dataSource={CMData} columns={CMTitle} scroll={{ x: true, y: 250 }}/>
								</Col>

							</Row>
						</TabPane>))}
				</Tabs>
			</div>
		)
	}
}
export default MultiClassifyEvaluation;