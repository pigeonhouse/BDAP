/**
 * 找到sourceColumns，返回。根据labelName.label及attributes中选择value的不同来进行修改
 * @param {Object} item
 * @param {int} sourceAnchor
 * @param {Object} propsAPI
 */
export function findSourceColumnsInfo(item, sourceAnchor, propsAPI) {
    return findColumnsInfoFunction(item, sourceAnchor, propsAPI);
}

//递归寻找目标Id的上方锚点所连接的非"数据随机划分"的item
function findColumnsInfoFunction(node, anchor, propsAPI) {

    const { find, save } = propsAPI;
    const { edges } = save();

    if(edges === undefined) return [];

    edges.map((edge) => {
        
        //找到源模块，则拿到其columnsInfo，并返回
        if (edge.target === node.id && edge.targetAnchor === anchor) {
            const sourceNode = find(edge.source);
            const { labelName, attributes } = sourceNode.getModel();
            const { columnsInfo } = sourceNode.getModel();

            return changeSourceColumnsInfo(labelName, attributes, columnsInfo) || [];
        }
    })

    return [];
}

// 根据sourceNode中labelName.label及attributes中选择value的不同来进行修改应该返回的columnsInfo
// columnsInfo类型为[{colName:'', dataType:""},……]
function changeSourceColumnsInfo(labelName, attributes, columnsInfo) {
    let newColunmsInfo = [];

    // 暂时返回原值
    switch (labelName.label) {
        // case '归一化':
        //     for (let i in sourceLabelArray) {
        //         if (sourceLabelArray[i][1]) {
        //             labelarr.push(['MinMaxScaled' + sourceLabelArray[i][0], false])
        //         }
        //     }
        //     return [...labelArray, ...labelarr];
        // case '标准化':
        //     for (let i in sourceLabelArray) {
        //         if (sourceLabelArray[i][1]) {
        //             labelarr.push(['StandardScaled' + sourceLabelArray[i][0], false])
        //         }
        //     }
        //     return [...labelArray, ...labelarr];
        // case 'one-hot编码':
        //     for (let i in sourceLabelArray) {
        //         if (sourceLabelArray[i][1]) {
        //             labelarr.push([sourceLabelArray[i][0] + 'ClassVec', false])
        //         }
        //     }
        //     return [...labelArray, ...labelarr];
        // case 'StringIndexer':
        //     for (let i in sourceLabelArray) {
        //         if (sourceLabelArray[i][1]) {
        //             labelarr.push([sourceLabelArray[i][0] + 'Index', false])
        //         }
        //     }
        //     return [...labelArray, ...labelarr];
        // case '特征分组归类':
        //     return [...labelArray, [item.model.attr['新生成列名'], false]];
        // case '数据筛选':
        //     return [...labelArray, [item.model.attr['新生成列名'], false]];
        default: return columnsInfo;
    }
}