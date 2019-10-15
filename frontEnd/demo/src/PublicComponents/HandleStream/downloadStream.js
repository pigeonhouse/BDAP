export function downloadStream(flowInfo) {
    if (flowInfo === undefined || flowInfo === null) return null;

    let nodes = new Array();
    flowInfo.nodes.map((item, index) => {
        const { anchor, attributes, columnsInfo, groupName, id, labelName, size, x, y, filePath } = item;
        let node = {
            anchor, attributes, columnsInfo, groupName, id, labelName, size, index,
            x:Number(x),
            y:Number(y),
            keyConfig: {
                color_type: "#1890FF",
                state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg"
            },
            type: "node",
            shape: getShapebyAnchor(anchor),
        }
        if (filePath !== undefined) {
            node["filePath"] = filePath;
        }
        nodes.push(node);
    })

    console.log(nodes)

    return { nodes, edges: flowInfo.edges };
}

function getShapebyAnchor(anchor) {
    const head = transformString(anchor[0]);
    const tail = transformString(anchor[1]);
    return `${head}-${tail}`;
}

function transformString(number) {
    switch (number) {
        case 0: return 'zero';
        case 1: return 'one';
        case 2: return 'two';
        case 3: return 'three';
        default: return 'zero';
    }
}
