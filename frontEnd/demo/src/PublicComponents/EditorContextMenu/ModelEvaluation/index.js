import React from 'react'
import { Modal,  Icon, Collapse } from 'antd';
import { withPropsAPI } from '@src';
import {
	Command,
} from '@src';
import styles from '../index.less';
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
		if (currentNode.group == "ml" && currentNode.evaluation) {
			var ev = currentNode.evaluation;
			this.setState({ evaluation: ev })
			this.setState({ MlEvaluteVisible: true })
		}
		else alert("NOT A ML MODEL")
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
					<Collapse bordered={false} >
						{this.state.evaluation.map((pair, index) => {
							return (<Panel
								header={pair[0] + " : " + pair[1]}
								key={index}
								style={{ fontSize: 25, marginBottom: 24, border: 0 }}>
								<p style={{ fontSize: 15, lineHeight: 2 }}>{pair[2]}</p>
							</Panel>)
						})}
					</Collapse>
				</Modal>

			</div>
		);
	}
}
export default withPropsAPI(ModelEvaluation);
