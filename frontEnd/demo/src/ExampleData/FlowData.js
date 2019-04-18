export const data = {
    edges:[{
        id:"3f47307b",
        index: 2,
        source: "33a6d2ec",
        sourceAnchor: 0,
        target: "fb529020",
        targetAnchor:0
        }],
    nodes:[
        {Dataset:[{label: "id",stat:{type: "string",value:[{name: "t", count: 1},{name: "l", count: 1},{name: "s", count: 1},{name: "o", count: 1},{name: "c", count: 1}]},value:["t","l","s","o","c",]},
                {label: "time",stat:{average: 12.6,max: 23,median: 10,min: 1,numOfNull: 0,standardDeviation: 8.9,type: "number",variance: 79.3,},value:[10,20,9,1,23]},
                {label: "sex",stat:{type: "string", value:[{count: 2,name: "male"},{count: 3,name: "female"}]},value:["male","female","female","male","female"]}],
        anchor:[0,1],attr: {},elabel: "localFile",group: "input",id: "33a6d2ec",index: 0,keyConfig:{color_type: "#1890FF",state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg"},
        label: "本地数据",labelArray:{public:[["id", false],["time",false],["sex", false]]},
        shape: "zero-one",size: "200*40",type: "node",x: 339,y: 96,},
        {Dataset:[],
        anchor:[1,1],attr:{type: "median"},elabel: "Fillna",group: "feature",id: "fb529020",index: 1,keyConfig:{color_type: "#1890FF",state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg"},
        label: "缺失值填充",labelArray:{public:[["id", false],["time",true],["sex", false]]},
        shape: "one-one",size: "200*40",type: "node",x: 333,y: 214,}]
    }