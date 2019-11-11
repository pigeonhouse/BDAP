export function downloadStream(nodesList) {
    if (nodesList === undefined || nodesList === null) return null;

    let nodes = new Array();

    nodesList.map((node, index) => {
        const { x, y, anchor, filePath } = node;

        delete node.sourceIdList;

        var addAttributes = {
            keyConfig: {
                color_type: "#1890FF",
                state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg"
            },
            x: Number(x),
            y: Number(y),
            type: 'node',
            shape: getShapebyAnchor(anchor),
            index,
        }

        if (filePath !== undefined) {
            addAttributes.filePath = filePath;
        }

        nodes.push({...node, ...addAttributes});
    })

    console.log(nodes)

    return nodes;
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
