import { Component } from 'react';
import { withPropsAPI } from '@src';
import { generateStream } from '../../PublicComponents/HandleStream/generateStream';
import { fetchTool } from '../../FetchTool';
import { isLegal } from '../../PublicComponents/HandleStream/IsLegal';

var current;
var sum;
class SparkRunning extends Component {
	//点击Run按钮后，执行此函数
	onClickButton = () => {

		if (this.props.running !== true) return;

		const { propsAPI } = this.props;

		if (propsAPI === undefined) return this.props.stopRunning();

		//制作工作流保存在stream中
		const stream = generateStream(propsAPI.save());

		if (stream.nodes === undefined) return this.props.stopRunning();

		sum = stream.nodes.length || 0;
		current = 0;

		this.uploadFlowChart(stream);
	}

	uploadFlowChart = async (stream) => {
		const init = {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({ nodes: stream.nodes }),
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			credentials: 'include'
		}

		const response = await fetchTool("/experiment-service/flow/run", init)
		console.log(response)
		if (response.status === 200) {
			const result = await response.json();

			//按照工作流进行轮询
			this.run(result);
		}
	}

	//改变对应此id标签框的运行状态标志，可改为运行完成或正在运行，取决于color
	changeStatusColor = (id, color) => {
		const { propsAPI } = this.props;
		const { find, update, executeCommand } = propsAPI;
		const item = find(id);
		var value = JSON.parse(JSON.stringify(item.model.keyConfig));
		value.state_icon_url = color;
		executeCommand(() => {
			update(item, {
				keyConfig: {
					...value
				}
			});
		});
	}

	//真正执行所用的函数，其中包括setTimeout，每1秒执行一个标签框
	run = (result) => {
		if (current < sum) {
			setTimeout(async () => {

				const init = {
					method: 'GET',
					mode: 'cors',
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					},
					credentials: 'include'
				}

				const url = `/experiment-service/flow/node/status?resultUrl=${result[current].resultUrl}`;

				const response = await fetchTool(url, init)

				if (response.status === 200) {
					const res = await response.text();
					if (res === "available") {
						this.changeStatusColor(result[current].id, 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg');
						current++;
					} else {
						this.changeStatusColor(result[current].id, 'https://loading.io/spinners/palette-ring/index.rotate-palette-loader.svg');
					}
				}
				this.run(result);
			}, 1000)
		} else {
			this.props.stopRunning();
		}
	}

	render() {
		return (
			<div > {this.onClickButton()} </div>
		);
	}
}

export default withPropsAPI(SparkRunning);