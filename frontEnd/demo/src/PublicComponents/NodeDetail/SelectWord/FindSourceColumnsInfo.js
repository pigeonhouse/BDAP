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
            let { labelName, attributes, columnsInfo } = sourceNode.getModel();
            columnsInfo = columnsInfo || [];
            attributes = attributes || [];

            if (columnsInfo.length === 0) return [];

            var columns = columnsInfo.map((column) => {
                return {
                    colName: column.colName,
                    dataType: column.dataType
                }
            })

            attributes.map((attribute) => {
                if (attribute.styleType === 'NewColumn') {
                    columns.push({
                        colName: attribute.value,
                        dataType: attribute.style.newColType
                    })
                }
            })

            return columns;
        }
    }

    return [];
}