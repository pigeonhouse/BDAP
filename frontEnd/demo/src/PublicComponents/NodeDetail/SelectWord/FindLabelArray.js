/**
 * 拿到attribute中的value，通过sourceColumnsInfo来比较，是否更改，删除已经选中但却无效的label
 * @param {Object} attribute
 * @param {Array} sourceColumnsInfo
 */

export function findLabelArray(attribute, sourceColumnsInfo) {
    const { value } = attribute;
    let labelArray = new Array();

    if(value === null) return new Array();
    
    value.map((label) => {
        for(let column in sourceColumnsInfo){
            if(column.colName === label){
                labelArray.push(label);
                return;
            }
        }
    })

    return labelArray;
}