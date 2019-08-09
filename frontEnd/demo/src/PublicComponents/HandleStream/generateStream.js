/**
 * 根据画布上模块，进行拓扑排序，生成一维数组并返回此数组
 * @param {*} propsAPI 
 */

export function generateStream(propsAPI) {
	const inf = propsAPI.save();
	var Sourc = 0;
	var tag = 'Input';
	var stream = new Array();
	var attribute = new Array();
	var labelarray = new Array();

	if (inf.hasOwnProperty('edges')) {
		let Deg = new Array(inf.nodes.length).fill(0);
		var sourceId = new Array(inf.nodes.length).fill(0);
		for (let i in sourceId) {
			sourceId[i] = new Array();
		}
		for (let indexE of inf.edges.keys()) {
			Sourc = inf.edges[indexE].target;
			let targetanchor = inf.edges[indexE].targetAnchor;
			let source = inf.edges[indexE].source;
			let sourceanchor = inf.edges[indexE].sourceAnchor;
			for (let indexN of inf.nodes.keys()) {
				if (Sourc === inf.nodes[indexN].id) {
					Deg[indexN]++;
					sourceId[indexN][targetanchor] = {
						source: source,
						sourceAnchor: sourceanchor
					};
				}
			}
		}
		for (var k = 0; k < inf.nodes.length;) {
			for (let indexN of inf.nodes.keys()) {
				if (Deg[indexN] === 0) {
					k++;
					Deg[indexN]--;
					Sourc = inf.nodes[indexN].id;
					tag = inf.nodes[indexN].label;
					attribute = inf.nodes[indexN].attr;
					labelarray = inf.nodes[indexN].labelArray;
					if (inf.nodes[indexN].group === 'ml') {
						const { find, update } = propsAPI;
						const item = find(Sourc);
						var temp = new Object();
						//error
						if (!labelarray.hasOwnProperty("predict_x")) labelarray['predict_x'] = [];
						if (!labelarray.hasOwnProperty("train_x")) labelarray['train_x'] = [];
						if (!labelarray.hasOwnProperty("train_y")) labelarray['train_y'] = [];
						temp = JSON.parse(JSON.stringify(labelarray));
						temp['public'] = [...temp.predict_x, ...temp.predict_y];
						update(item, { labelArray: temp });
					}
					let labelarr = {};
					for (let i in labelarray) {
						labelarr[i] = new Array();
						for (let j in labelarray[i]) {
							if (labelarray[i][j][1] === true) {
								labelarr[i].push(labelarray[i][j][0]);
							}
						}
					}
					labelarray = JSON.parse(JSON.stringify(labelarr));
					stream.push({
						'id': Sourc,
						"label": tag,
						"attribute": attribute,
						"labelArray": labelarray,
						"sourceId": sourceId[indexN]
					});
					for (var i = 0; i < inf.edges.length; i++) {
						if (Sourc === inf.edges[i].source) {
							for (var m = 0; m < inf.nodes.length; m++) {
								if (inf.nodes[m].id === inf.edges[i].target) {
									Deg[m]--;
								}
							}
						}
					}
				}
			}
		}
	}
	console.log('stream:')
	console.log(stream);
	return JSON.parse(JSON.stringify(stream));
}