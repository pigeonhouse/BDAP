import React, { Component } from 'react'
import { Button } from 'antd'

/**
 * Local版本的Run组件，点击Button后执行画布上组件对应的流程
 */

class SparkRun extends Component {

	enterLoading = () => {
		this.props.onClickButtonRunning();
	}

	render() {
		const { currentTab, clickTab } = this.props;
		if (currentTab === '1' && clickTab === '0') {
			return (
				<Button
					loading={this.props.running}
					icon="play-circle"
					onClick={this.enterLoading}
					style={{ border: 0, backgroundColor: '#343941', color: "#ddd", fontSize: 25, height: "65px" }}
				>
					运行
				</Button>
			);
		}

		return <div></div>;
	}
}

export default SparkRun;