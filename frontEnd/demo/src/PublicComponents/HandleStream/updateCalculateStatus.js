/**
 * 当有某块的参数改变时，调用此函数，将包括参数改变模块在内的所有向下相连的模块全部
 * 设置为未运行。
 * @param { String } nodeId 
 * @param { Object } propsAPI
 */
export function updateCalculateStatus(nodeId, propsAPI) {
    const { find, update, executeCommand } = propsAPI;
    const item = find(nodeId);
    const { alreadyRun } = item.getModel();

    // 若找到一个未运行的，则停止修改。
    if (alreadyRun === false) return;

    executeCommand(() => {
        update(item, {
            keyConfig: {
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
            },
            alreadyRun: false,
        });
    });

    const { edges } = propsAPI.save();

    edges.map((edge) => {
        if(edge.source !== nodeId) return;
        updateCalculateStatus(edge.target, propsAPI);
    })
}