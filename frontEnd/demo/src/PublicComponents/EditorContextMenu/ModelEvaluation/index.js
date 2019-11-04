import React from 'react'
import { Modal,  Icon, Collapse } from 'antd';
import { withPropsAPI } from '@src';
import {
	Command,
} from '@src';
import styles from '../index.less';
import EvaluatePicture from "./EvaluatePicture"
const Panel = Collapse.Panel;


class ModelEvaluation extends React.Component {
	state = {
		visible: false,
		MlEvaluteVisible: false,
		evaluation: [[]],
		col: [],
		data: [],
		visibleChartRadio: false,
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
	modelEvaluation = () => {//模型评估
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const currentNode = item.getModel();
		if (currentNode.groupName.label == "模型评估"|| currentNode.groupName.label == "评估") {			
			this.setState({ MlEvaluteVisible: true })	
			
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
					onOk={this.handleOk} onCancel={this.handleCancel} width={500}
				>
					<EvaluatePicture visible={this.state.MlEvaluteVisible}>
						
					</EvaluatePicture>
					
				</Modal>

			</div>
		);
	}
}
export default withPropsAPI(ModelEvaluation);
