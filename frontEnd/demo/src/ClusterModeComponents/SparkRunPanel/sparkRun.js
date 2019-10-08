import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { withPropsAPI } from '@src';

import { generateStream } from '../../PublicComponents/HandleStream/generateStream'
import { isLegal } from '../../PublicComponents/HandleStream/isLegal'

/**
 * Local版本的Run组件，点击Button后执行画布上组件对应的流程
 */

class SparkRun extends Component {
	//点击Run按钮后，执行此函数
	onClickButton = () => {
		const { propsAPI } = this.props;
		
		//制作工作流保存在stream中
		const stream = generateStream(propsAPI);

		//按照工作流进行执行
		this.run(stream);
	}

	//改变对应此id标签框的运行状态标志，可改为运行完成或正在运行，取决于color
	changeStatusColor = (id, color) => {
		const { propsAPI } = this.props;
		const { find, update, executeCommand } = propsAPI;
		const nextitem = find(id);
		var value = JSON.parse(JSON.stringify(nextitem.model.keyConfig));
		value.state_icon_url = color;
		executeCommand(() => {
			update(nextitem, { keyConfig: { ...value } });
		});
	}

	//真正执行所用的函数，其中包括setTimeout，每1秒执行一个标签框
	run = (stream) => {
		const { propsAPI } = this.props;
		if (isLegal(propsAPI)) return;
		setTimeout(() => {

		}, 1000)
	}
	render() {
		return (
			<Button onClick={() => this.onClickButton()} style={{ border: 0, backgroundColor: '#343941', color: "#ddd", fontSize: 25 }}>
				<Icon type="play-circle" style={{ fontSize: 25 }} />运行
        	</Button>
		);
	}
}

export default withPropsAPI(SparkRun);