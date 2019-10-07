/**
 * 根据提供labelArray的源头item中的label对labelArray进行修改
 * @param {*} item 
 * @param {Array} sourceLabelArray 
 */
export function changeSourceLabelArray(item, sourceLabelArray) {
    let labelArray = [];
    if (item.model.groupName.label === 'ml') {
        sourceLabelArray = sourceLabelArray[0];
    }
    for (let i in sourceLabelArray) {
        labelArray.push([sourceLabelArray[i][0], false]);
    }
    let labelarr = [];
    switch (item.model.labelName.label) {
        case '归一化':
            for (let i in sourceLabelArray) {
                if (sourceLabelArray[i][1]) {
                    labelarr.push(['MinMaxScaled' + sourceLabelArray[i][0], false])
                }
            }
            return [...labelArray, ...labelarr];
        case '标准化':
            for (let i in sourceLabelArray) {
                if (sourceLabelArray[i][1]) {
                    labelarr.push(['StandardScaled' + sourceLabelArray[i][0], false])
                }
            }
            return [...labelArray, ...labelarr];
        case 'one-hot编码':
            for (let i in sourceLabelArray) {
                if (sourceLabelArray[i][1]) {
                    labelarr.push([sourceLabelArray[i][0] + 'ClassVec', false])
                }
            }
            return [...labelArray, ...labelarr];
        case 'StringIndexer':
            for (let i in sourceLabelArray) {
                if (sourceLabelArray[i][1]) {
                    labelarr.push([sourceLabelArray[i][0] + 'Index', false])
                }
            }
            return [...labelArray, ...labelarr];
        case '特征分组归类':
            return [...labelArray, [item.model.attr['新生成列名'], false]];
        case '数据筛选':
            return [...labelArray, [item.model.attr['新生成列名'], false]];
        default: return labelArray;
    }
}