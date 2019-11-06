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
		if(currentNode.keyConfig.state_icon_url=="https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg")
		{
			alert("该组件未执行，请执行后再进行模型评估！")
		}
		else if (currentNode.groupName.label == "模型评估"|| currentNode.groupName.label == "评估") {		
			this.setState({mode:currentNode.labelName.label,MlEvaluteVisible:true});
			
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
	 					 return <BinaryEvaluation visible={this.state.MlEvaluteVisible}/>
						 
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
