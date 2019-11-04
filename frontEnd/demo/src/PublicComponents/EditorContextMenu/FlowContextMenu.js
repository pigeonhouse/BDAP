import React from 'react'
import { Form } from 'antd';
import {
	Command,
	NodeMenu,
	CanvasMenu,
	ContextMenu,
} from '@src';
import styles from './index.less';
import iconfont from '../../theme/iconfont.less';
import GGEditor, { Flow, RegisterCommand, withPropsAPI } from '@src';
import Download from '../DataOperate/FileOperate/Download';
import DataPreview from './DataPreview';
import ModelEvaluation from './ModelEvaluation';

class FlowContextMenu extends React.Component {
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
			<ContextMenu className={styles.contextMenu}>
				<GGEditor style={{ width: 0, height: 0 }}>
					<Flow />
					<RegisterCommand
						name="showpicture"
						config={
							{
								queue: true,
								enable(editor) {
									return true;
								},
							}
						}
					/>
				</GGEditor>
				<NodeMenu>
				    
					<Command name="copy">
						<div className={styles.item}>
							<i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
							<span>复制</span>
						</div>
					</Command>
					<Command name="delete">
						<div className={styles.item}>
							<i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
							<span>删除</span>
						</div>
					</Command>
				·
					<DataPreview></DataPreview>
				    <ModelEvaluation></ModelEvaluation> 
					{/* <Download></Download> */}
				</NodeMenu>

				<CanvasMenu>
					<Command name="undo">
						<div className={styles.item}>
							<i className={`${iconfont.iconfont} ${iconfont.iconUndo}`} />
							<span>撤销</span>
						</div>
					</Command>
					<Command name="redo">
						<div className={styles.item}>
							<i className={`${iconfont.iconfont} ${iconfont.iconRedo}`} />
							<span>重做</span>
						</div>
					</Command>
					<Command name="pasteHere">
						<div className={styles.item}>
							<i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`} />
							<span>粘贴</span>
						</div>
					</Command>
				</CanvasMenu>

			</ContextMenu>
		);
	}
}
export default Form.create()(withPropsAPI(FlowContextMenu));
