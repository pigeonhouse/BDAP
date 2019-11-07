import React, { Fragment } from 'react'
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

	modelEvaluation = () => {//模型评估
		const { propsAPI } = this.props;
		const { getSelected, save } = propsAPI;
		console.log(getSelected, save());
		if (propsAPI === undefined) return <Fragment></Fragment>
		const item = getSelected()[0];
		const { groupName } = item.getModel();
		return groupName.elabel === 'evaluation' ? <ModelEvaluation></ModelEvaluation> : null;
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
					<DataPreview></DataPreview>
					<ModelEvaluation></ModelEvaluation>
					{/* {this.modelEvaluation()} */}
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
export default withPropsAPI(FlowContextMenu);
