export function downloadStream(flowInfo) {
    if (flowInfo === undefined) {
        flowInfo = {
            "nodes": [{
                "id": "835ab143",
                "labelName": {
                    "label": "adult.csv", "elabel": "adult.csv"
                },
                "groupName": { "label": "数据源", "elabel": "datasource" },
                "anchor": [0, 1], "attributes": [], "size": "200*40", "x": 267.8999938964844,
                "y": 206, "columnsInfo": [{ "colName": "col4", "dataType": "dateTime" },
                { "colName": "col5", "dataType": "date" }, { "colName": "col2", "dataType": "float" },
                { "colName": "col3", "dataType": "string" }, { "colName": "col1", "dataType": "Int" }],
                "filePath": "/bdap/students/2017211511/adult.csv", "sourceIdList": []
            }
                , {
                "id": "6137a88c", "labelName": { "label": "归一化", "elabel": "Normalization" },
                "groupName": { "label": "数据预处理", "elabel": "preprocessing" }, "anchor": [1, 1],
                "attributes": [{
                    "labelName": { "label": "归一化类型", "elabel": "normalizationType" },
                    "valueType": "String", "style": {
                        "menu": [{ "label": "MinMax", "elabel": "MinMax" },
                        { "label": "Standard", "elabel": "Standard" }, { "label": "MaxAbs", "elabel": "MaxAbs" }]
                    },
                    "styleType": "Select", "value": "MinMax"
                }, {
                    "labelName": {
                        "label": "归一化字段",
                        "elabel": "targetCols"
                    }, "valueType": "Array[String]", "style": {
                        "multiCol": "true",
                        "sourceAnchor": "0"
                    }, "styleType": "ChooseCol", "value": ["col5"]
                }], "size": "200*40",
                "x": 360.8999938964844, "y": 305.5, "columnsInfo": [{
                    "colName": "col4",
                    "dataType": "dateTime"
                }, { "colName": "col5", "dataType": "date" }, {
                    "colName": "col2",
                    "dataType": "float"
                }, { "colName": "col3", "dataType": "string" }, {
                    "colName": "col1",
                    "dataType": "Int"
                }], "sourceIdList": ["835ab143_0"]
            }],
            "edges": [{
                "source": "835ab143",
                "sourceAnchor": 0, "target": "6137a88c", "targetAnchor": 0, "id": "cf3b40a6", "index": 1
            }]
        };
    }

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
