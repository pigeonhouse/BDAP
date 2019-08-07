/**
 * 记录Python版本的数据格式
 */
export const pythonItem = {
  defaultOpenKeys:['sub1','sub2','sub3'], mode:"inline", selectable:false, subMenu:[{
    key:"sub1",type:"folder",name:"数据源",menu:[{
      type:"node",
      size:"200*40",
      shape:'zero-one',
      model:{
        label: '本地数据',
        elabel:'localFile',
        attr:{},
        attrDetail:[],
        Dataset: [],
        labelArray: {}, 
        length: 0,
        anchor: [0, 1],
        group:'input',
        keyConfig:{
          color_type: '#1890FF',
          state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
        }
      }  
    },{
      type:"node",
      size:"200*40",
      shape:'zero-one',
      model:{
        label: 'Titanic测试',
        elabel:'TitanicTestFile',
        attr:{},
        attrDetail:[],
        Dataset: [],
        labelArray: {}, 
        length: 0,
        anchor: [0, 1],
        group:'input',
        keyConfig:{
          color_type: '#1890FF',
          state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
        }
      }       
    },{
      type:"node",
      size:"200*40",
      shape:'zero-one',
      model:{
        label: 'Titanic训练',
        elabel:'TitanicTrainFile',
        attr:{},
        attrDetail:[],
        Dataset: [],
        labelArray: {}, 
        length: 0,
        anchor: [0, 1],
        group:'input',
        keyConfig:{
          color_type: '#1890FF',
          state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
        }
      }       
    }]
  },{
    key:"sub2",type:"tool",name:"数据预处理",menu:[{
      type:"node",
      size:"200*40",
      shape:"one-one",
      model:{
        label: '缺失值填充',
        elabel:'Fillna',
        anchor: [1, 1],
        attr:{type:'average'},
        attrDetail:[],
        Dataset: [],
        labelArray: {}, 
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
        labelArray: {}, 
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
        elabel:'OneHotEncoding',
        attr:{},
        attrDetail:[],
        Dataset: [],
        labelArray: {}, 
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
        labelArray: {}, 
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
        labelArray: {}, 
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
        label: '数据类型转换',
        elabel:'TransformType',
        attr:{},
        attrDetail:[],
        Dataset: [],
        labelArray: {}, 
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
        labelArray: {}, 
        length: 0,
        anchor: [1, 2],
        group: 'feature',
        keyConfig:{
          color_type: '#1890FF',
          state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
        }
      }
    }]
  },{
    key:"sub3",type:"filter",name:"机器学习",subMenu:[{
      key:"g3",title:"回归",menu:[{
        type:"node",
        size:"200*40",
        shape:'two-one',
        model:{
          label: '单变量线性回归',
          anchor: [2, 1],
          attr:{},
          attrDetail:[],
          Dataset: [],
          labelArray: {}, 
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
          attr:{'sourceFile':'people', '多项式最高幂': 0},
          attrDetail:[],
          anchor: [2, 1],
          Dataset: [],
          labelArray: {},
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
          attr:{'sourceFile':'people'},
          attrDetail:[],
          group:"ml",
          anchor: [2, 1],
          Dataset: [],
          labelArray: {}, 
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
          attr:{'sourceFile':'people'},
          attrDetail:[],
          anchor: [2, 1],
          Dataset: [],
          labelArray: {}, 
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
          attr:{'sourceFile':'people', 
                'seed': 3, 
                'maxFeatures': 2,
                'replacement': false,
                'nEstimators': 200
          },
          attrDetail:[],
          anchor: [2, 1],
          Dataset: [],
          labelArray: {}, 
          length: 0,
          group:"ml",
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      }]
    },{
      key:"g4",title:"分类",menu:[{
        type:"node",
        size:"200*40",
        shape:'two-one',
        model:{
          label: '朴素贝叶斯',
          attr:{'sourceFile':'people'},
          attrDetail:[],
          anchor: [2, 1],
          Dataset: [],
          labelArray: {}, 
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
          attr:{'sourceFile':'people',
                'C': 0.01,
                'tol': 10e-4,
                'maxPasses': 10,
                'maxIterations': 10000,
                'kernel': 'rbf',
                'kernelOptionsSigma': 0.5
          },
          attrDetail:[],
          anchor: [2, 1],
          Dataset: [],
          labelArray: {}, 
          length: 0,
          group:"ml",
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      }]
    }]
  },{
    key:"sub4",type:"global",name:"深度学习",subMenu:[{
      key:"a1",type:"folder",name:"经典数据集",menu:[{
        type:"node",
        size:"200*40",
        shape:'two-one',
        model:{
          label: 'mnist手写字符',
          attr:{},
          attrDetail:[],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
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
          label: 'cifar10',
          attr:{},
          attrDetail:[],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
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
          label: 'cifar100',
          attr:{},
          attrDetail:[],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      }]
    },{
      key:"a2",type:"edit",name:"训练与预测",menu:[{
        type:"node",
        size:"200*40",
        shape:'two-one',
        model:{
          label: '训练',
          attr:{optimizer:'Adam',initialLearningRate:0.0001 ,epoch:1,category:10,batch:100 },
          attrDetail:[{elabel:'optimizer',label:'优化器',type:'Select', evalue:['GradientDescent', 'Adam','Momentum'], value:['GradientDescent', 'Adam','Momentum']},
                      {elabel:'initialLearningRate',label:'初始学习率',type:'Input'},
                      {elabel:'epoch',label:'训练周期',type:'Select', evalue:['1', '3','5','10'], value:['1', '3','5','10']},
                      {elabel:'category',label:'分类数',type:'Input'},
                      {elabel:'batch',label:'batch大小',type:'Input'},
                      ],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
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
          label: '预测',
          attr:{},
          attrDetail:[],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      }]
    },{
      key:"a3",type:"link",name:"网络层",menu:[{
        type:"node",
        size:"200*40",
        shape:'one-one',
        model:{
          label: 'reshape',
          attr:{width:28,height:28,layer:1},
          attrDetail:[{elabel:'width',label:'width',type:'Input'},
          {elabel:'height',label:'height',type:'Input'},
          {elabel:'layer',label:'layer',type:'Input'},],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      },{
        type:"node",
        size:"200*40",
        shape:'one-one',
        model:{
          label: '卷积层',
          attr:{num:6,stride:1,padding:0,size:'3 x 3',activation:'relu'},
          attrDetail:[{elabel:'num',label:'卷积核个数',type:'Input'},
          {elabel:'stride',label:'卷积步长',type:'Input'},
          {elabel:'padding',label:'填充',type:'Input'},
          {elabel:'size',label:'卷积核大小',type:'Select', evalue:['1 x 1', '3 x 3','5 x 5'], value:['1 x 1', '3 x 3','5 x 5']},
          {elabel:'activation',label:'激活函数',type:'Select', evalue:['sigmoid', 'relu','tanh'], value:['sigmoid', 'relu','tanh']},
        ],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      },{
        type:"node",
        size:"200*40",
        shape:'one-one',
        model:{
          label: '池化层',
          attr:{type:'MaxPooling',size:'2 x 2'},
          attrDetail:[{elabel:'type',label:'池化类型',type:'Select', evalue:['MaxPooling','AveragePooling'], value:['最大池化','平均池化']},
          {elabel:'size',label:'池化核大小',type:'Select', evalue:['1 x 1', '2 x 2','3 x 3'], value:['1 x 1', '2 x 2','3 x 3']}],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      },{
        type:"node",
        size:"200*40",
        shape:'one-one',
        model:{
          label: '全连接层',
          attr:{num:100,activation:'relu'},
          attrDetail:[{elabel:'num',label:'神经元个数',type:'Input'},
          {elabel:'activation',label:'激活函数',type:'Select', evalue:['sigmoid', 'relu','tanh'], value:['sigmoid', 'relu','tanh']},],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      },{
        type:"node",
        size:"200*40",
        shape:'one-one',
        model:{
          label: '扁平化',
          attr:{},
          attrDetail:[],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      },{
        type:"node",
        size:"200*40",
        shape:'one-one',
        model:{
          label: 'Dropout',
          attr:{},
          attrDetail:[],
          anchor: [1, 1],
          Dataset: [],
          labelArray: {}, 
          group:'dl',
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      }]
    }]
  }]
}