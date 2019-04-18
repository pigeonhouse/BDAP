export const data = {
    edges:[
    {id: "2681e15d",
    index: 2,
    source: "33a6d2ec",
    sourceAnchor: 0,
    target: "69d6a6b2",
    targetAnchor: 0},
    {id: "371bd968",
    index: 4,
    source: "69d6a6b2",
    sourceAnchor: 1,
    target: "57874edd",
    targetAnchor: 0}],
    nodes:[
        {Dataset:[{label: "id",stat:{type: "string",value:[{name: "t", count: 1},{name: "l", count: 1},{name: "s", count: 1},{name: "o", count: 1},{name: "c", count: 1}]},value:["t","l","s","o","c",]},
                {label: "time",stat:{average: 12.6,max: 23,median: 10,min: 1,numOfNull: 0,standardDeviation: 8.9,type: "number",variance: 79.3,},value:[10,20,9,1,23]},
                {label: "sex",stat:{type: "string", value:[{count: 2,name: "male"},{count: 3,name: "female"}]},value:["male","female","female","male","female"]}],
        anchor:[0,1],attr: {},elabel: "localFile",group: "input",id: "33a6d2ec",index: 0,keyConfig:{color_type: "#1890FF",state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg"},
        label: "本地数据",labelArray:{public:[["id", false],["time",false],["sex", false]]},
        shape: "zero-one",size: "200*40",type: "node",x: 339,y: 96,},
        {Dataset: [],anchor:[1, 1],attr: {type: "average"},elabel: "Fillna",group: "feature",id: "69d6a6b2",
        index: 1,keyConfig: {color_type: "#1890FF", state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg"},
        label: "缺失值填充",labelArray:{public: [["id", false],["time",true],["sex", false]]},
        shape: "one-one",size: "200*40",type: "node",x: 351.1750030517578,y: 210},
        {Dataset: [],anchor:[1, 2],attr: {public: 0.7},group: "feature",id: "57874edd",index: 3,
        keyConfig: {color_type: "#1890FF", state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg"},
        label: "数据随机划分",labelArray: {},shape: "one-two",size: "200*40",type: "node",
        x: 358.1750030517578,y: 313,}
    ]
}