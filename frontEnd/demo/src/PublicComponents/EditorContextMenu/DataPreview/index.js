import React, { Component } from 'react'
import { Modal, Icon } from 'antd';
import { Command, withPropsAPI } from '@src';

import VisualizedPanel from '../../../pages/VisualizedPanel';
import styles from '../index.less';

class DataPreview extends Component {
	state = {
		visible: false,
		fileName: null,
		newRandomkey: 0,
		url: null,
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
		const { labelName } = item.getModel();
		const label = labelName.label;

		this.setState({
			url: `/experiment-service/flow/node/data/${item.id}_0`,
			fileName: label,
			visible: true,
			newRandomkey: (this.state.newRandomkey + 1) % 10,
		});
	}

	render() {
		const { newRandomkey, visible, url } = this.state;

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
					<div style={{ height: 'calc(100vh - 225px)', }} >
						<VisualizedPanel url={url} height={225} />
					</div>
				</Modal>
			</div>
		);
	}
}

export default withPropsAPI(DataPreview);