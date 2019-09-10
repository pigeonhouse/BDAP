/**
 * 记录local版本的数据格式，格式在PublicComponents/EditorItemPanal/FlowItemPanel中介绍
 */
export const localItem = {
    defaultOpenKeys:['sub2','sub3'], mode:"inline", selectable:false, subMenu:[{
        key:"sub2",type:"mail",name:"数据预处理",menu:[{
            type:"node",
            size:"200*40",
            shape:"one-one",
            model:{
                label: '缺失值填充',
                elabel:'Fillna',
                anchor: [1, 1],
                attr:{type:'average'},
                attrDetail:[],
                // attrDetail:[{elabel:'type',label:'填充值', type:'Input', regexp:'^[0-9]+.?[0-9]*'}],
                // attrDetail:[{elabel:'type',label:'填充值', type:'Select', evalue:['average', 'median', 'max', 'min'], value:['平均值', '中位数', '最大值', '最小值']}],
                Dataset: [],
                labelArray: [], 
                length: 0,
                group: 'feature',
                keyConfig:{
                    color_type: '#1890FF',
                    state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                }
            }
        },{
            type:"node",
            size:"200*40",
            shape:"one-one",
            model:{
              label: '归一化',
              elabel:'MinMaxScaler',
              attr:{},
              attrDetail:[],
              Dataset: [],
              labelArray: [], 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }
        },{
            type:"node",
            size:"200*40",
            shape:"one-one",
            model:{
              label: '特征区间化',
              attr:{},
              attrDetail:[],
              Dataset: [],
              labelArray: [], 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }
        },{
            type:"node",
            size:"200*40",
            shape:"one-one",
            model:{
                label: '特征分组归类',
                attr:{},
                attrDetail:[],
                Dataset: [],
                labelArray: [], 
                length: 0,
                anchor: [1, 1],
                group: 'feature',
                keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                }
            }
        },{
            type:"node",
            size:"200*40",
            shape:"one-one",
            model:{
              label: 'one-hot编码',
              attr:{},
              attrDetail:[],
              Dataset: [],
              labelArray: [], 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }
        },{
            type:"node",
            size:"200*40",
            shape:"one-two",
            model:{
              label: '数据随机划分',
              attr:{public:0.7},
              attrDetail:[],
              Dataset: [],
              labelArray: [], 
              length: 0,
              anchor: [1, 2],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }
        }]
    }
    , {
        key:"sub3", type:"appstore", name:"机器学习", subMenu:[{
            key:"g3", title:"回归",menu:[{
                type:"node",
                size:"200*40",
                shape:'two-one',
                model:{
                    label: '单变量线性回归',
                    anchor: [2, 1],
                    attr:{},
                    attrDetail:[],
                    Dataset: [],
                    labelArray: [], 
                    length: 0,
                    group:"ml",
                    evaluation:[],
                    keyConfig:{
                        color_type: '#1890FF',
                        state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                    }
                }
            },{
                type:"node",
                size:"200*40",
                shape:'two-one',
                model:{
                    label: '单变量多项式回归',
                    attr:{'多项式最高幂': 5},
                    attrDetail:[{elabel:'多项式最高幂',label:'多项式最高幂', type:'Input', regexp:'^[1-9][0-9]*$'}],
                    anchor: [2, 1],
                    Dataset: [],
                    labelArray: [],
                    length: 0,
                    group:"ml",
                    keyConfig:{
                        color_type: '#1890FF',
                        state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                    }
                }    
            },{
                type:"node",
                size:"200*40",
                shape:'two-one',
                model:{
                  label: '多变量线性回归',
                  attr:{},
                  attrDetail:[],
                  group:"ml",
                  anchor: [2, 1],
                  Dataset: [],
                  labelArray: [], 
                  length: 0,
                  keyConfig:{
                    color_type: '#1890FF',
                    state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                  }
                }
            },{
                type:"node",
                size:"200*40",
                shape:'two-one',
                model:{
                    label: '决策树回归',
                    attr:{},
                    attrDetail:[],
                    anchor: [2, 1],
                    Dataset: [],
                    labelArray: [], 
                    length: 0,
                    group:"ml",
                    keyConfig:{
                        color_type: '#1890FF',
                        state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                    }
                }
            },{
                type:"node",
                size:"200*40",
                shape:'two-one',
                model:{
                  label: '随机森林回归',
                  attr:{},
                  attrDetail:[],
                  anchor: [2, 1],
                  Dataset: [],
                  labelArray: [], 
                  length: 0,
                  group:"ml",
                  keyConfig:{
                    color_type: '#1890FF',
                    state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                  }
                }
            }]
        }, {
            key:"g4", title:"分类", menu:[{
                type:"node",
                size:"200*40",
                shape:'two-one',
                model:{
                    label: '朴素贝叶斯',
                    attr:{},
                    attrDetail:[],
                    anchor: [2, 1],
                    Dataset: [],
                    labelArray: [], 
                    length: 0,
                    group:"ml",
                    keyConfig:{
                    color_type: '#1890FF',
                    state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                  }
                }   
            },{
                type:"node",
                size:"200*40",
                shape:'two-one',
                model:{
                  label: '支持向量机',
                  attr:{},
                  attrDetail:[],
                  anchor: [2, 1],
                  Dataset: [],
                  labelArray: [], 
                  length: 0,
                  group:"ml",
                  keyConfig:{
                    color_type: '#1890FF',
                    state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                  }
                }
            }]
        }]
    }
]
} 