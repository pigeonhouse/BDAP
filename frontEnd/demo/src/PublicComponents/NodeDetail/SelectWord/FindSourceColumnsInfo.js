/**
 * 找到sourceColumns，返回。根据labelName.label及attributes中选择value的不同来进行修改
 * @param {Object} item
 * @param {int} sourceAnchor
 * @param {Object} propsAPI
 */
export function findSourceColumnsInfo(item, sourceAnchor, propsAPI) {
    return findColumnsInfoFunction(item, Number(sourceAnchor), propsAPI);
}

//递归寻找目标Id的上方锚点所连接的非"数据随机划分"的item
function findColumnsInfoFunction(node, anchor, propsAPI) {

    const { find, save } = propsAPI;
    const { edges } = save();

    if (edges === undefined) return [];

    for (let i in edges) {

        const edge = edges[i];

        //找到源模块，则拿到其columnsInfo，并返回
        if (edge.target === node.id && edge.targetAnchor === anchor) {
            const sourceNode = find(edge.source);
            if (sourceNode.getModel().labelName.label === '数据划分') {
                return findColumnsInfoFunction(sourceNode, 0, propsAPI);
            }
            let { labelName, attributes, columnsInfo, newCols } = sourceNode.getModel();
            columnsInfo = columnsInfo || [];
            attributes = attributes || [];
            newCols = newCols || [];

            if (columnsInfo.length === 0) return [];

            // 通过newCols, 为下一个模块选择新的列
            newCols.map((newCol) => {
                const { mode, value } = newCol;
                if (mode === 'rename') {
                    columnsInfo.push({
                        colName: value,
                        dataType: null
                    })
                } else if (mode === 'prefix') {
                    attributes.map((attribute) => {
                        if (attribute.styleType !== "ChooseCol") return;

                        const labelArray = attribute.value || [];
                        labelArray.map((label) => {
                            columnsInfo.push({
                                colName: label,
                                dataType: null
                            })
                        })
                    })
                }
            })

            return columnsInfo;
        }
    }

    return [];
}