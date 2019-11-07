import React from 'react'
import { Modal,  Icon, Collapse } from 'antd';
import { withPropsAPI } from '@src';
import {
	Command,
} from '@src';
import styles from '../index.less';
import BinaryEvaluation from './EvaluationType/BinaryClassifyEvaluation';
import MultiClassifyEvaluation from './EvaluationType/MultiClassifyEvaluation'



class ModelEvaluation extends React.Component {
	state = {
		visible: false,
		MlEvaluteVisible: false,
		evaluation: [[]],
		col: [],
		data: [],
		
	}
//处理调出页面的ok事件
	handleOk = (e) => {
		this.setState({
			visible: false,
			MlEvaluteVisible: false,
			mode:"",
			col: [],
			data: []
		});
	}
//处理调出页面的cancel事件
	handleCancel = (e) => {
		this.setState({
			visible: false,
			MlEvaluteVisible: false,
			col: [],
			data: []
		});
	}
	modelEvaluation = () => {//模型评估
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const currentNode = item.getModel();
		/*if(currentNode.keyConfig.state_icon_url=="https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg")
		{	
			alert("该组件未执行，请执行后再进行模型评估！")
		}
		else*/ if (currentNode.groupName.label == "模型评估"|| currentNode.groupName.label == "评估") {		
			
			//获取数据
			const data= {"auPRC":1.0,"PRC":[{"Precision":1.0,"Recall":0.0},{"Precision":1.0,"Recall":0.06666666666666667},{"Precision":1.0,"Recall":0.13333333333333333},{"Precision":1.0,"Recall":0.2},{"Precision":1.0,"Recall":0.26666666666666666},{"Precision":1.0,"Recall":0.3333333333333333},{"Precision":1.0,"Recall":0.4},{"Precision":1.0,"Recall":0.4666666666666667},{"Precision":1.0,"Recall":0.5333333333333333},{"Precision":1.0,"Recall":0.6},{"Precision":1.0,"Recall":0.6666666666666666},{"Precision":1.0,"Recall":0.7333333333333333},{"Precision":1.0,"Recall":0.8},{"Precision":1.0,"Recall":0.8666666666666667},{"Precision":1.0,"Recall":0.9333333333333333},{"Precision":1.0,"Recall":1.0},{"Precision":0.9375,"Recall":1.0},{"Precision":0.8823529411764706,"Recall":1.0},{"Precision":0.8333333333333334,"Recall":1.0},{"Precision":0.7894736842105263,"Recall":1.0},{"Precision":0.75,"Recall":1.0},{"Precision":0.7142857142857143,"Recall":1.0},{"Precision":0.6818181818181818,"Recall":1.0},{"Precision":0.6521739130434783,"Recall":1.0},{"Precision":0.625,"Recall":1.0},{"Precision":0.6,"Recall":1.0},{"Precision":0.5769230769230769,"Recall":1.0},{"Precision":0.5555555555555556,"Recall":1.0},{"Precision":0.5357142857142857,"Recall":1.0},{"Precision":0.5172413793103449,"Recall":1.0},{"Precision":0.5,"Recall":1.0},{"Precision":0.4838709677419355,"Recall":1.0},{"Precision":0.46875,"Recall":1.0},{"Precision":0.45454545454545453,"Recall":1.0}],"method":"BinaryClassifyEvaluator","ROC":[{"TPR":0.0,"FPR":0.0},{"TPR":0.06666666666666667,"FPR":0.0},{"TPR":0.13333333333333333,"FPR":0.0},{"TPR":0.2,"FPR":0.0},{"TPR":0.26666666666666666,"FPR":0.0},{"TPR":0.3333333333333333,"FPR":0.0},{"TPR":0.4,"FPR":0.0},{"TPR":0.4666666666666667,"FPR":0.0},{"TPR":0.5333333333333333,"FPR":0.0},{"TPR":0.6,"FPR":0.0},{"TPR":0.6666666666666666,"FPR":0.0},{"TPR":0.7333333333333333,"FPR":0.0},{"TPR":0.8,"FPR":0.0},{"TPR":0.8666666666666667,"FPR":0.0},{"TPR":0.9333333333333333,"FPR":0.0},{"TPR":1.0,"FPR":0.0},{"TPR":1.0,"FPR":0.05555555555555555},{"TPR":1.0,"FPR":0.1111111111111111},{"TPR":1.0,"FPR":0.16666666666666666},{"TPR":1.0,"FPR":0.2222222222222222},{"TPR":1.0,"FPR":0.2777777777777778},{"TPR":1.0,"FPR":0.3333333333333333},{"TPR":1.0,"FPR":0.3888888888888889},{"TPR":1.0,"FPR":0.4444444444444444},{"TPR":1.0,"FPR":0.5},{"TPR":1.0,"FPR":0.5555555555555556},{"TPR":1.0,"FPR":0.6111111111111112},{"TPR":1.0,"FPR":0.6666666666666666},{"TPR":1.0,"FPR":0.7222222222222222},{"TPR":1.0,"FPR":0.7777777777777778},{"TPR":1.0,"FPR":0.8333333333333334},{"TPR":1.0,"FPR":0.8888888888888888},{"TPR":1.0,"FPR":0.9444444444444444},{"TPR":1.0,"FPR":1.0},{"TPR":1.0,"FPR":1.0}],"f1Score":[{"F_score":0.125,"Threshold":1.0},{"F_score":0.23529411764705882,"Threshold":0.9999999999999998},{"F_score":0.33333333333333337,"Threshold":0.9999999999999947},{"F_score":0.4210526315789474,"Threshold":0.9999999999999591},{"F_score":0.5,"Threshold":0.9999999999999549},{"F_score":0.5714285714285715,"Threshold":0.9999999999997986},{"F_score":0.6363636363636364,"Threshold":0.9999999999995244},{"F_score":0.6956521739130436,"Threshold":0.999999999998372},{"F_score":0.7499999999999999,"Threshold":0.999999999998179},{"F_score":0.8,"Threshold":0.9999999999961142},{"F_score":0.846153846153846,"Threshold":0.9999999999898295},{"F_score":0.888888888888889,"Threshold":0.999999999986414},{"F_score":0.9285714285714286,"Threshold":0.9999999999669444},{"F_score":0.9655172413793104,"Threshold":0.9999999998102302},{"F_score":1.0,"Threshold":0.9999999977884224},{"F_score":0.967741935483871,"Threshold":0.001047355087643655},{"F_score":0.9375,"Threshold":9.434880785435338E-9},{"F_score":0.9090909090909091,"Threshold":8.845473251901567E-10},{"F_score":0.8823529411764706,"Threshold":8.004410072668801E-10},{"F_score":0.8571428571428571,"Threshold":2.941206545782736E-10},{"F_score":0.8333333333333333,"Threshold":1.331097476989553E-10},{"F_score":0.8108108108108109,"Threshold":9.033530715696381E-11},{"F_score":0.7894736842105263,"Threshold":9.846010439483117E-12},{"F_score":0.7692307692307693,"Threshold":5.950023946438749E-12},{"F_score":0.7499999999999999,"Threshold":5.6040847224589314E-12},{"F_score":0.7317073170731707,"Threshold":2.551927777114227E-12},{"F_score":0.7142857142857143,"Threshold":1.4329701492622021E-12},{"F_score":0.6976744186046512,"Threshold":4.3084330828012867E-13},{"F_score":0.6818181818181819,"Threshold":1.7432103789416201E-13},{"F_score":0.6666666666666666,"Threshold":3.3123331548675726E-14},{"F_score":0.6521739130434783,"Threshold":1.3979324216228747E-14},{"F_score":0.6382978723404256,"Threshold":3.651679944002394E-18},{"F_score":0.625,"Threshold":1.6059460956508538E-18}],"auROC":1.0}
			if(data.method!=currentNode.labelName.elabel)
			{
				alert(`此评估方法不能支持该类型返回数据，请使用${data.method}评估方法`)
			}
			else
			this.setState({mode:currentNode.labelName.label,MlEvaluteVisible:true,data:data});
		}

		else alert("该组件非模型评估组件，无法进行模型评估！")
	}
   
  
	render() {
		return (

            <div>
                 <Command name="showpicture">

						<div className={styles.item} onClick={this.modelEvaluation}>
							<Icon type="solution" />
							<span>模型评估</span>
						</div>
				</Command>
				<Modal title="模型评估" visible={this.state.MlEvaluteVisible}
					onOk={this.handleOk} onCancel={this.handleCancel} width={700}
				>
					
					{( ()=>{
                   switch(this.state.mode)
	   				{
		  				 case "二元评估":
	 					 return <BinaryEvaluation visible={this.state.MlEvaluteVisible} data={this.state.data}/>
						 
						 case "多分类评估":
						 return <MultiClassifyEvaluation visible={this.state.MlEvaluteVisible}/>
					
		  
	 
	   				}
                    }
				)()}
			
				</Modal>

			</div>
		);
	}
}
export default withPropsAPI(ModelEvaluation);
