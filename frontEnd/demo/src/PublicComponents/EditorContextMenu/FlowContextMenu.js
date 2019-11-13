import React, { Fragment } from 'react'
import GGEditor, {
	Flow,
	RegisterCommand,
	withPropsAPI,
	Command,
	NodeMenu,
	CanvasMenu,
	ContextMenu,
} from '@src';
import styles from './index.less';
import iconfont from '../../theme/iconfont.less';
import Download from './Download';
import DataPreview from './DataPreview';
import ModelEvaluation from './ModelEvaluation';
import ModelSaving from './ModelSaving';

class FlowContextMenu extends React.Component {

	modelEvaluation = () => {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		if (item === undefined) return false;
		const { groupName } = item.getModel();
		return groupName.elabel === 'evaluation' ? true : false;
	}

	render() {
		const self = this;

		return (
			<ContextMenu className={styles.contextMenu}>
				<GGEditor style={{ width: 0, height: 0 }}>
					<Flow />
					<RegisterCommand
						name="dataPreview"
						config={
							{
								queue: true,
								enable(editor) {
									return true;
								},
							}
						}
					/>
					<RegisterCommand
						name="modelEvaluation"
						config={
							{
								queue: true,
								enable(editor) {
									return self.modelEvaluation();
								},
							}
						}
					/>
					<RegisterCommand
						name="saveModel"
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
					<ModelSaving addModel={this.props.addModel} ></ModelSaving>
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
