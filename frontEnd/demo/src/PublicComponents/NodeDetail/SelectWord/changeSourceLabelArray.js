/**
 * 根据提供labelArray的源头item中的label对labelArray进行修改
 * @param {*} item 
 * @param {*} sourceLabelArray 
 * @param {*} type 
 */
export function changeSourceLabelArray(item, sourceLabelArray, type) {
    let labelArray = [];
    if (item.model.group === 'ml') {
        sourceLabelArray = sourceLabelArray[0];
    }
    for (let i in sourceLabelArray) {
        labelArray.push([sourceLabelArray[i][0], false]);
    }
    if (type === 'cluster') {
        let labelarr = [];
        switch (item.model.label) {
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
    else {
        let labelarr = new Array();
        switch (item.model.label) {
            case '特征区间化':
                for (let i in sourceLabelArray) {
                    if (sourceLabelArray[i][1]) {
                        labelarr.push([sourceLabelArray[i][0] + '_Gaped', false])
                    }
                }
                return [...labelArray, ...labelarr];
            case '特征分组归类':
                for (let i in sourceLabelArray) {
                    if (sourceLabelArray[i][1]) {
                        labelarr.push([sourceLabelArray[i][0] + '_trans', false])
                    }
                }
                return [...labelArray, ...labelarr];
            case 'one-hot编码':
                var Dataset = item.model.Dataset;
                for (let i in sourceLabelArray) {
                    if (sourceLabelArray[i][1] === false) continue;
                    for (let j in Dataset) {
                        if (Dataset[j].label !== sourceLabelArray[i][0]) continue;
                        const Stat = Dataset[j].stat;
                        if (Stat.type === 'number')
                            break;
                        for (let k in Stat.value) {
                            const index = Number(k) + 1;
                            labelarr.push([sourceLabelArray[i][0] + '_' + index, false])
                        }
                    }
                }
                return [...labelArray, ...labelarr];
            default: return labelArray;
        }
    }
}