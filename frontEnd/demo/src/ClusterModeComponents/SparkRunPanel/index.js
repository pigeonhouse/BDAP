import React, { Component } from 'react';
import { Button, notification } from 'antd';

/**
 * Run组件，界面显示为运行按钮，点击Button后通知父组件已点击运行按钮
 */

class SparkRun extends Component {

	/**
	 * 点击运行按钮后执行的函数，在session创建完毕后
	 * 通知父组件已点击运行按钮
	 */
	enterLoading = () => {

		/**
		 * 若sessionFinish为false，即未完成创建session，
		 * 则在右上角显示正在创建session的通知框
		 */
		if (this.props.sessionFinish === false) {
			const args = {
				message: 'Session',
				description: '正在创建session，请稍候',
				key: "session"
			};
			notification['info'](args);
			return;
		}

		// 运行从LocalMode父组件传入的onClickButtonRunning函数，通知父组件实验已开始运行
		this.props.onClickButtonRunning();
	}

	render() {
		const { currentTab, clickTab } = this.props;
		if (currentTab === '1' && clickTab === '0') {
			return (
				<div>
					<Button
						loading={this.props.running}
						icon="play-circle"
						onClick={this.enterLoading}
						style={{
							border: 0,
							backgroundColor: '#343941',
							color: "#ddd",
							fontSize: 25,
							height: "65px"
						}}
					>
						运行
					</Button>
				</div>
			);
		}

		return <div></div>;
	}
}

export default SparkRun;