import React, { Component } from 'react'
import { Modal, Icon } from 'antd';
import { Command, withPropsAPI } from '@src';

import VisualizedPanel from '../../../pages/VisualizedPanel';
import styles from '../index.less';

class DataPreview extends Component {
	state = {
		visible: false,
		path: null,
		fileName: null,
		newRandomkey: 0,
	}

	handleOk = (e) => {//处理调出页面的ok事件
		this.setState({
			visible: false,
		});
	}

	handleCancel = (e) => {//处理调出页面的cancel事件
		this.setState({
			visible: false,
		});
	}

	showModal = () => { //让数据预览页面显示的函数
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const { filePath, labelName } = item.getModel();
		const label = labelName.label;

		this.setState({
			path: filePath,
			fileName: label,
			visible: true,
			newRandomkey: (this.state.newRandomkey + 1) % 10,
		});
	}

	render() {
		const { newRandomkey, visible } = this.state;
		const { path, fileName } = this.state;

		var filePath = undefined;
		if (path !== null && fileName !== null) {
			if (path === '/') {
				filePath = `/${fileName}`;
			} else {
				filePath = `${path}/${fileName}`;
			}
		}

		return (
			<div>
				<Command name="showpicture">
					<div className={styles.item} onClick={this.showModal}>
						<Icon type="form" />
						<span>数据预览</span>
					</div>
				</Command>
				<Modal
					key={newRandomkey}
					title="数据展示"
					visible={visible}
					style={{ top: 30 }}
					width={1200}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<VisualizedPanel filePath={filePath} />
				</Modal>
			</div>
		);
	}
}

export default withPropsAPI(DataPreview);