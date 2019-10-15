/**
 * 根据画布上模块，进行拓扑排序，生成可上传的数组
 * @param {*} flowInfo 
 */

export function generateStream(flowInfo) {

	const { nodes, edges } = flowInfo;

	// 无nodes则直接返回{}，无edges，直接返回flowInfo
	if (nodes === undefined) return {};
	if (edges === undefined) return JSON.parse(JSON.stringify(flowInfo));

	var stream = { nodes: [], edges: [] };

	// edges原封不动上传
	stream.edges = flowInfo.edges;

	// nodes改为拓扑图序列
	let deg = new Array(nodes.length).fill(0);
	var sourceId = new Array(nodes.length).fill(0);
	sourceId.map((item, index)=>{
		sourceId[index] = new Array();
	})

	// 生成入度数组
	edges.map((edge) => {
		const { target, targetAnchor, source, sourceAnchor } = edge;

		const anchor = findNodeBySource(source, nodes);

		nodes.map((node, index) => {
			if (target === node.id) {
				deg[index]++;

				// 锚点位置需要减去入度
				let uploadAnchor = sourceAnchor - anchor;
				
				// source与sourceAnchor合成字符串展示
				sourceId[index][targetAnchor] = source + '_' + uploadAnchor;
			}
		})
		
	})

	// 构造拓扑图
	let nodesNum = 0;
	while (nodesNum < nodes.length) {
		nodes.map((node, index) => {

			// 当入度为0时
			if (deg[index] === 0) {

				// 将节点push到拓扑图中
				nodesNum++;
				deg[index]--;

				const { id, labelName, groupName, anchor, attributes, size, x, y, columnsInfo } = node;

				if (groupName.label === "数据源") {
					stream.nodes.push({
						id, labelName, groupName, anchor, attributes, size, x, y, columnsInfo,
						filePath: node.filePath, sourceIdList: sourceId[index]
					});
				}
				else {
					stream.nodes.push({
						id, labelName, groupName, anchor, attributes, size, x, y, columnsInfo,
						sourceIdList: sourceId[index]
					});
				}

				edges.map((edge) => {
					if (id === edge.source) {
						nodes.map((node, index) => {
							if (node.id === edge.target) {
								deg[index]--;
							}
						})
					}
				})
			}
		})
	}

	console.log(stream);
	return JSON.parse(JSON.stringify(stream));
}

function findNodeBySource(source, nodes){
	for(let index in nodes){
		const node = nodes[index];

		if(node.id === source){
			return node.anchor[0];
		}
	}
}