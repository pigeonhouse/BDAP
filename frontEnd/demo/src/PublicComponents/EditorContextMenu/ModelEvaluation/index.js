import React from 'react'
import { Modal, Icon } from 'antd';
import { withPropsAPI, Command } from '@src';

import { fetchTool } from '../../../FetchTool';
import styles from '../index.less';
import BinaryEvaluation from './EvaluationType/BinaryClassifyEvaluation';
import MultiClassifyEvaluation from './EvaluationType/MultiClassifyEvaluation';

class ModelEvaluation extends React.Component {

	state = {
		visible: false,
		mode: null,
		evaluationInfo: [],
		loading: true,
	}

	showModal = async () => {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const currentNode = item.getModel();

		// if (currentNode.keyConfig.state_icon_url == "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg") {
		// 	alert("该组件未执行，请执行后再进行模型评估！");
		// 	return;
		// }

		if (currentNode.groupName.elabel == "evaluation") {
			const url = `/experiment-service/flow/node/evaluation/${item.id}_0`;
			const init = {
				method: 'GET',
				mode: 'cors',
				headers: {
					"Content-Type": "application/json;charset=utf-8"
				},
				credentials: 'include'
			}
			const response = await fetchTool(url, init);
			if (response.status === 200) {
				const evaluationInfo = await response.json();
				
				this.setState({
					mode: currentNode.labelName.label,
					visible: true,
					evaluationInfo,
					loading: false,
				});
			}
		}
	}

	//处理调出页面的ok事件
	handleOk = (e) => {
		this.setState({
			visible: false,
			loading: true,
		});
	}

	//处理调出页面的cancel事件
	handleCancel = (e) => {
		this.setState({
			visible: false,
			loading: true,
		});
	}

	render() {
		const { visible, evaluationInfo, loading } = this.state;
		return (
			<div>
				<Command name="modelEvaluation">
					<div className={styles.item} onClick={this.showModal}>
						<Icon type="form" />
						<span>评估结果</span>
					</div>
				</Command>
				<Modal
					title="评估结果"
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					width={700}
				>
					{(() => {
						if (visible) {
							switch (this.state.mode) {
								case "二元评估":
									return <BinaryEvaluation
										evaluationInfo={evaluationInfo}
										loading={loading}
									/>
								case "多分类评估":
									return <MultiClassifyEvaluation evaluationInfo={evaluationInfo} />
							}
						}
					})()}
				</Modal>
			</div>
		);
	}
}
export default withPropsAPI(ModelEvaluation);
