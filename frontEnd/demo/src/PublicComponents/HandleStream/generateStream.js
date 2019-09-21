/**
 * 根据画布上模块，进行拓扑排序，生成一维数组并返回此数组
 * @param {*} propsAPI 
 */

export function generateStream(propsAPI) {
	const inf = propsAPI.save();
	console.log(inf)
	var Sourc = 0;
	var tag = 'Input';
	var stream = new Array();
	var attribute = new Array();
	var labelarray = new Array();
	let group;

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
					group = inf.nodes[indexN].group;
					labelarray = inf.nodes[indexN].labelArray;

					let labelarr = {};
					if(group === 'ml'){
						labelarr.train_x = new Array();
						labelarr.train_y = new Array();
						for (let i in labelarray[0]) {
							if (labelarray[0][i][1] === true) {
								labelarr.train_x.push(labelarray[0][i][0]);
							}
							if (labelarray[1][i][1] === true) {
								labelarr.train_y.push(labelarray[1][i][0]);
							}
						}
						labelarr.predict_x = JSON.parse(JSON.stringify(labelarr.train_x));
						labelarr.predict_y = [attribute.predict_y];
					}
					else{
						labelarr.public = new Array();
						for (let i in labelarray) {
							if (labelarray[i][1] === true) {
								labelarr.public.push(labelarray[i][0]);
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