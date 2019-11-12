export function downloadStream(nodesList) {
    if (nodesList === undefined || nodesList === null) return null;

    let nodes = new Array();

    nodesList.map((node, index) => {
        var { x, y, anchor } = node;
        anchor = anchor || [0, 1];

        var addAttributes = {
            keyConfig: {
                color_type: "#1890FF",
                state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg"
            },
            x: Number(x),
            y: Number(y),
            type: 'node',
            size: "200*40",
            shape: getShapebyAnchor(anchor),
            index,
        }

        if (node.anchor === undefined) {
            addAttributes.anchor = anchor;
        }

        nodes.push({ ...node, ...addAttributes });
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
