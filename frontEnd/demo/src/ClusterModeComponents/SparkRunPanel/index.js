import React, { Component } from 'react'
import { Button, Icon } from 'antd'

/**
 * Local版本的Run组件，点击Button后执行画布上组件对应的流程
 */

class SparkRun extends Component {

	render() {
		return (
			<Button onClick={this.props.onClickButtonRunning} style={{ border: 0, backgroundColor: '#343941', color: "#ddd", fontSize: 25 }}>
				<Icon type="play-circle" style={{ fontSize: 25 }} />运行
        	</Button>
		);
	}
}

export default SparkRun;