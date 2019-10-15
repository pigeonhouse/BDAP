import React from 'react';
import { Tooltip, Divider, Modal, Button, Icon, Input } from 'antd';
import GGEditor, { Toolbar, Command, Flow, RegisterCommand } from '@src';
import styles from './index.less';
import iconfont from '../../theme/iconfont.less';
import { generateStream } from '../HandleStream/generateStream';
import { withPropsAPI } from '@src';

class FlowToolbar extends React.Component {

	state = {
		visible: false,
		inp1: " ",
		inp2: " ",
	}

	ShowModal = () => {
		const { experiment } = this.props;
		if (experiment === null) {
			this.setState({ visible: true });
		} else {
			this.handleClick();
		}
	}

	handleOk = (e) => {
		this.setState({
			visible: false,
		});
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}

	handleClick = () => {
		const { propsAPI, experiment } = this.props;
		const inf = JSON.parse(JSON.stringify(propsAPI.save()));
		const stream = generateStream(inf);

		if (experiment !== null) {
			this.props.handleSaveStream(experiment, stream);
		} else {
			this.props.handleSaveStream({
				title: this.state.inp1,
				description: this.state.inp2,
			}, stream);
			this.setState({
				visible: false,
			});
		}
	}

	handleInput1(e) {
		this.setState({ inp1: e.target.value });
	}

	handleInput2(e) {
		this.setState({ inp2: e.target.value });
	}

	componentWillMount() {
		this.setState({
			inp1: "",
			inp2: ""
		});
	}

	render() {

		return (
			<div>
				<div>
					<Toolbar className={styles.toolbar}>
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
						<Command name="undo">
							<Tooltip title="撤销" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconUndo}`} />
							</Tooltip>
						</Command>
						<Command name="redo">
							<Tooltip title="重做" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconRedo}`} />
							</Tooltip>
						</Command>
						<Divider type="vertical" />
						<Command name="copy">
							<Tooltip title="复制" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
							</Tooltip>
						</Command>
						<Command name="paste">
							<Tooltip title="粘贴" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`} />
							</Tooltip>
						</Command>
						<Command name="delete">
							<Tooltip title="删除" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
							</Tooltip>
						</Command>
						<Divider type="vertical" />
						<Command name="zoomIn">
							<Tooltip title="放大" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconZoomInO}`} />
							</Tooltip>
						</Command>
						<Command name="zoomOut">
							<Tooltip title="缩小" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconZoomOutO}`} />
							</Tooltip>
						</Command>
						<Command name="autoZoom">
							<Tooltip title="适应画布" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconFit}`} />
							</Tooltip>
						</Command>
						<Command name="resetZoom">
							<Tooltip title="实际尺寸" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconActualSizeO}`} />
							</Tooltip>
						</Command>
						<Divider type="vertical" />
						<Command name="toBack">
							<Tooltip title="层级后置" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconToBack}`} />
							</Tooltip>
						</Command>
						<Command name="toFront">
							<Tooltip title="层级前置" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconToFront}`} />
							</Tooltip>
						</Command>
						{/* <Divider type="vertical" />
						<Command name="multiSelect">
							<Tooltip title="多选" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconSelect}`} />
							</Tooltip>
						</Command>
						<Command name="addGroup">
							<Tooltip title="成组" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconGroup}`} />
							</Tooltip>
						</Command>
						<Command name="unGroup">
							<Tooltip title="解组" placement="bottom" overlayClassName={styles.tooltip}>
								<i className={`${iconfont.iconfont} ${iconfont.iconUngroup}`} />
							</Tooltip>
						</Command>
						<Divider type="vertical" /> */}
						<Command name="showpicture">
							<Tooltip title="存储" placement="bottom" overlayClassName={styles.tooltip}>
								<Icon
									type="lock"
									onClick={() => this.ShowModal()}
									className={styles.commandIcon}
								/>
							</Tooltip>
						</Command>
					</Toolbar>
				</div>
				<div>
					<Modal
						title="模型定义"
						visible={this.state.visible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						bodyStyle={{ height: '250px' }}
						width={450}
					>
						<span>自定义模型名:</span>
						<br />
						<Input placeholder="我的模型"
							style={{ width: "300px", margin: "10px" }}
							defaultValue={this.state.inp1}
							onChange={(e) => this.handleInput1(e)}
						/>
						<br />
						<span>自定义描述:</span>
						<br />
						<Input placeholder="描述"
							style={{ width: "300px", margin: "10px" }}
							defaultValue={this.state.inp2}
							onChange={(e) => this.handleInput2(e)}
						/>
						<br />
						<Button
							type="primary"
							onClick={() => this.handleClick()}
							style={{ width: "250px", marginLeft: "20px" }}
						>
							提交
						</Button>
					</Modal>
				</div>
			</div>
		);
	}
}

export default withPropsAPI(FlowToolbar);