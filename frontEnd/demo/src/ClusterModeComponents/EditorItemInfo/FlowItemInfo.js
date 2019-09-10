/**
 * 记录Cluster版本的数据格式
 */
export const clusterItem = {
  defaultOpenKeys:['sub1','sub2','sub3'], mode:"inline", selectable:false, subMenu:[{
    key:"sub1",type:"mail",name:"数据源",menu:[{
      type:"node",
      size:"200*40",
      shape:'zero-one',
      model:{
        label: 'hdfs数据',
        elabel:'hdfsFile',
        attr:{},
        attrDetail:[],
        Dataset: [],
        labelArray: [], 
        length: 0,
        anchor: [0, 1],
        keyConfig:{
          color_type: '#1890FF',
          state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
        }
      }       
    }]
  },{
      key:"sub2",type:"mail",name:"数据预处理",menu:[{
        type:"node",
        size:"200*40",
        shape:"one-one",
        model:{
          label: '缺失值填充',
          elabel:'Fillna',
          anchor: [1, 1],
          attr:{type: 'average'},
          attrDetail:[{elabel:'type',label:'填充值', type:'Select', evalue:['average', 'median', 'mode', 'max', 'min'], value:['平均值', '中位数', '众数', '最大值', '最小值']}],
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
          label: '标准化',
          elabel:'StandardScaler',
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
          elabel:'OneHotEncoding',
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
          label: '列排序',
          elabel:'SortBy',
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
          label: 'StringIndexer',
          elabel:'Stringindex',
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
          elabel:'QuantileDiscretizer',
          attr:{'新生成列名':'','类别数':''},
          attrDetail:[],
          Dataset: [],
          labelArray: [], 
          length: 0,
          anchor: [1, 1],
          // group: 'feature',
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
          label: '数据筛选',
          elabel:'DataFilter',
          attr:{'新生成列名':''},
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
      }]
  },{
    key:"sub3", type:"appstore", name:"机器学习",subMenu:[{
      key:"g3",title:"回归",menu:[{
        type:"node",
        size:"200*40",
        shape:'two-one',
        model:{
          label: '单变量线性回归',
          anchor: [2, 1],
          attr:{'预测集列名':'label'},
          attrDetail:[],
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
          label: '单变量多项式回归',
          attr:{'sourceFile':'people', '多项式最高幂': 0},
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
          label: '多变量线性回归',
          attr:{'sourceFile':'people'},
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
          attr:{'sourceFile':'people'},
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
          attr:{'sourceFile':'people', 
                'seed': 3, 
                'maxFeatures': 2,
                'replacement': false,
                'nEstimators': 200
          },
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
          label: '随机森林分类器',
          elabel: 'RandomForestModel',
          attr:{NumTree: '10'},
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
          label: '逻辑回归',
          elabel: 'LogisticRegression',
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
  },{
    key:"sub4", type:"setting", name:"深度学习",subMenu:[{
      key:"g6",title:"BigDL",menu:[{
        type:"node",
        size:"200*40",
        shape:'one-one',
        model:{
          label: '二进制图片集',
          elabel:'InputPicture',
          attr:{'训练集数据': "train-images.idx3-ubyte", '训练集标签': "train-labels.idx1-ubyte", '验证集数据': "t10k-images.idx3-ubyte", '验证集标签': "t10k-labels.idx1-ubyte", 'batchSize': 256},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: '新建神经网络',
          elabel:'NewNetwork',
          attr:{},
          anchor: [1, 1],
          attrDetail:[],
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
        shape:'one-one',
        model:{
          label: 'Reshape',
          elabel:'Reshape',
          attr:{'维度': 3, '图片x像素': 28,'图片y像素': 28, '图片z像素': 1},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: 'Convolution',
          elabel:'Convolution',
          attr:{'x': 28,'y': 28, '输入平面数量': 6, '输出平面数量': 1, 'activation': "Tanh"},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: 'MaxPooling',
          elabel:'MaxPooling',
          attr:{'过滤器横向大小': 2, '过滤器纵向大小': 2, '横向步长': 2, '纵向步长': 2},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: 'Linear',
          elabel: 'Linear',
          attr:{'输入维度': 192, '输出维度': 100, 'activation': 'Tanh'},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: '训练',
          elabel:'Train',
          attr:{'学习率': 0.002, '学习率衰减': 0.01, '训练次数': 15},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: '评估',
          elabel:'Evaluation',
          attr:{},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: '预测',
          elabel: 'Predict',
          attr:{'预测数据集': "adfe"},
          attrDetail:[],
          anchor: [1, 1],
          Dataset: [],
          labelArray: [], 
          length: 0,
          keyConfig:{
            color_type: '#1890FF',
            state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          }
        }
      }]
    },{
      key:"g5",title:"Keras",menu:[{
        type:"node",
        size:"200*40",
        shape:'one-one',
        model:{
          label: 'Imdb数据集',
          elabel:'Imdb',
          attr:{},
          anchor: [1, 1],
          attrDetail:[],
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
        shape:'one-one',
        model:{
          label: '新建神经网络',
          elabel:'NewNetwork_',
          attr:{},
          anchor: [1, 1],
          attrDetail:[],
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
        shape:'one-one',
        model:{
          label: 'Dense',
          elabel: 'Dense',
          attr:{'输出维度': 1, 'activation': 'sigmoid'},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: 'Flatten',
          elabel:'Flatten',
          attr:{},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: 'LSTM',
          elabel:'LSTM',
          attr:{输出维度: 128, Dropout: 0.2},
          attrDetail:[],
          anchor: [1, 1],
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
        shape:'one-one',
        model:{
          label: 'Embedding',
          elabel:'Embedding',
          attr:{输入维度: 2000, 输出维度: 256, input_length: 800},
          attrDetail:[],
          anchor: [1, 1],
          Dataset: [],
          labelArray: [], 
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
