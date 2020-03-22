import { Component } from 'react';
import { withPropsAPI } from '@src';
import { generateStream } from '../../PublicComponents/HandleStream/generateStream';
import { fetchTool } from '../../FetchTool';

/**
 * 实验开始执行时，真正的执行组件，父组件为ExperimentPanel
 * 将整个工作流发送给后端，之后不断轮询接口，根据状态值修改界面中
 * 工作流各个节点的状态标志。直到全部完成，停止运行。
 */

/**
 * current 当前完成的节点个数
 * sum 节点总数
 * 用于轮询时判断是否结束
 */
var current;
var sum;
class SparkRunning extends Component {

	//点击Run按钮后，由父组件的running参数判断是否将要开始运行实验
	onClickButton = () => {

		if (this.props.running !== true) return;

		const { propsAPI } = this.props;
		if (propsAPI === undefined) return this.props.stopRunning();

		// 制作工作流保存在stream中
		const stream = generateStream(propsAPI.save());

		// stream中不存在节点，说明无工作流，则停止运行
		if (stream.nodes === undefined) return this.props.stopRunning();

		sum = stream.nodes.length || 0;
		current = 0;

		// 将工作流上传，并轮询
		this.uploadFlowChart(stream);
	}

	// 将工作流上传，并轮询的函数
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

		// 上传工作流，若相应状态码为200，说明已开始试验，则进行节点状态轮询
		const response = await fetchTool("/experiment-service/flow/run", init)
		console.log(response)
		if (response.status === 200) {
			const result = await response.json();

			//按照工作流进行轮询
			this.run(result);
		}
	}

	//真正执行所用的函数，其中包括setTimeout，每1秒执行一次
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

				/**
				 * 返回状态码为200，表示正常执行，查看响应的结果
				 * 若为available，则说明当前节点已执行完毕，
				 * 那么将该节点的颜色状态进行修改，并轮询下一个节点
				 */
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

	render() {
		return (
			<div> {this.onClickButton()} </div>
		);
	}
}

export default withPropsAPI(SparkRunning);