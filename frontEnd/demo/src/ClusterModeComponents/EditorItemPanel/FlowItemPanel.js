import React from 'react';
import { ItemPanel, Item } from '@src';
import styles from './index.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import GGEditor,{ Flow, RegisterNode } from '@src';
class FlowItemPanel extends React.Component {
  render() {
    return (
      <Menu
        defaultOpenKeys={['sub1','sub2','sub3']}
        mode="inline"
        className={styles.scrollapp}
        style={{maxHeight:'calc(100vh - 34px)'}}
        selectable={false}
    >
      <GGEditor style={{height:0, width:0}}>
          <Flow />
          <RegisterNode 
            name = {'model-all'}
            config =  {{
              draw(item) {
                const group = item.getGraphicGroup();
                const model = item.getModel();
                const width = 184;
                const height = 40;
                const x = -width / 2;
                const y = -height / 2;
                const borderRadius = 4;
                const keyShape = group.addShape('rect', {
                  attrs: {
                    x,
                    y,
                    width,
                    height,
                    radius: borderRadius,
                    fill: 'white',
                    stroke: '#CED4D9'
                  }
                });
                // 左侧色条
                group.addShape('path', {
                  attrs: {
                    path: [
                      [ 'M', x, y + borderRadius ],
                      [ 'L', x, y + height - borderRadius ],
                      [ 'A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height ],
                      [ 'L', x + borderRadius, y ],
                      [ 'A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius ]
                    ],
                    fill: model.keyConfig.color_type
                  }
                });
                // 类型 logo
                group.addShape('image', {
                  attrs: {
                    img: this.type_icon_url,
                    x: x + 16,
                    y: y + 12,
                    width: 20,
                    height: 16
                  }
                });
                // 名称文本
                const label = model.label;
                group.addShape('text', {
                  attrs: {
                    text: label,
                    x: x + 52,
                    y: y + 15,
                    textAlign: 'start',
                    textBaseline: 'top',
                    fill: 'rgba(0,0,0,0.65)'
                  }
                });
                // 状态 logo
                group.addShape('image', {
                  attrs: {
                    img: model.keyConfig.state_icon_url,
                    x: x + 158,
                    y: y + 12,
                    width: 16,
                    height: 16
                  }
                });
                return keyShape;
              },
              anchor: [
                [ 0.5, 0, {
                  type: 'input'
                }],
                [ 0.5, 1, {
                  type: 'output'
                }],
              ],
              type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
            }}
            extend = {'flow-rect'}
          />
          <RegisterNode 
            name = {'two-one'}
            config =  {{
              anchor: [
                [ 0.33, 0, {
                  type: 'input'
                }],
                [ 0.66, 0, {
                  type: 'input'
                }],
                [ 0.5, 1, {
                  type: 'output'
                }]
              ]
            }}
            extend = {'model-all'}
          />
          <RegisterNode 
            name = {'one-one'}
            config =  {{
              anchor: [
                [ 0.5, 0, {
                  type: 'input'
                }],
                [ 0.5, 1, {
                  type: 'output'
                }]
              ]
            }}
            extend = {'model-all'}
          />
          <RegisterNode 
            name = {'one-two'}
            config =  {{
              anchor: [
                [ 0.5, 0, {
                  type: 'input'
                }],
                [ 0.33, 1, {
                  type: 'output'
                }],
                [ 0.66, 1, {
                  type: 'output'
                }]
              ]
            }}
            extend = {'model-all'}
          />
          <RegisterNode 
            name = {'zero-one'}
            config =  {{
              anchor: [
                [ 0.5, 1, {
                  type: 'output'
                }]
              ]
            }}
            extend = {'model-all'}
          />
          <RegisterNode 
            name = {'one-zero'}
            config =  {{
              anchor: [
                [ 0.5, 0, {
                  type: 'input'
                }]
              ]
            }}
            extend = {'model-all'}
          />
        </GGEditor>
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>数据源</span></span>}>
          <Menu.Item key="2" > <ItemPanel><Item
            type="node"
            size="200*40"
            shape='zero-one'
            model={{
              label: 'hdfs数据',
              elabel:'hdfsFile',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [0, 1],
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}         
          /></ItemPanel></Menu.Item>
       </SubMenu>    
      <SubMenu key="sub2" title={<span><Icon type="mail" /><span>数据预处理</span></span>}>
      <Menu.Item key="1"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '缺失值填充',
              elabel:'Fillna',
              anchor: [1, 1],
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}      
      /></ItemPanel></Menu.Item>

      <Menu.Item key="2"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '归一化',
              elabel:'MinMaxScaler',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
           /></ItemPanel></Menu.Item>

<Menu.Item key="3"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '标准化',
              elabel:'StandardScaler',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
           /></ItemPanel></Menu.Item>

<Menu.Item key="4"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: 'one-hot编码',
              elabel:'OneHotEncoding',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
           /></ItemPanel></Menu.Item>

        <Menu.Item key="5"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '列排序',
              elabel:'SortBy',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
           /></ItemPanel></Menu.Item>

        <Menu.Item key="6"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: 'StringIndexer',
              elabel:'Stringindex',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
           /></ItemPanel></Menu.Item>

          <Menu.Item key="7"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '特征分组归类',
              elabel:'QuantileDiscretizer',
              attr:{'新生成列名':'','类别数':''},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              //group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
          /></ItemPanel></Menu.Item>


          <Menu.Item key="8"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '数据类型转换',
              elabel:'TransformType',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}           
          /></ItemPanel></Menu.Item>


          {/* <Menu.Item key="10"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '特征分组归类',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature'
            }}    
          /></ItemPanel></Menu.Item> */}

          {/* <Menu.Item key="11"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '特征二进制化',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature'
            }}           
          /></ItemPanel></Menu.Item>
          <Menu.Item key="12"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-two"
            model={{
              label: '数据随机划分',
              attr:{public:0.7},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 2],
              group: 'feature'
            }}           
          /></ItemPanel></Menu.Item> */}

         
      </SubMenu>

      <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>机器学习</span></span>}>
        <SubMenu key="g3" title="回归">
        
          <Menu.Item key="13"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '单变量线性回归',
                anchor: [2, 1],
                attr:{'预测集列名':'label'},
                Dataset: [],
                labelArray: {}, 
                length: 0,
                group:"ml",
                keyConfig:{
                  color_type: '#1890FF',
                  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                } 
              }}
              
            /></ItemPanel></Menu.Item>
          <Menu.Item key="14"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '单变量多项式回归',
                attr:{'sourceFile':'people', '多项式最高幂': 0},
                anchor: [2, 1],
                Dataset: [],
                labelArray: {},
                length: 0,
                group:"ml",
                keyConfig:{
                  color_type: '#1890FF',
                  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                }
              }}            
            /></ItemPanel></Menu.Item>

            <Menu.Item key="15"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '多变量线性回归',
                attr:{'sourceFile':'people'},
                group:"ml",
                anchor: [2, 1],
                Dataset: [],
                labelArray: {}, 
                length: 0,
                keyConfig:{
                  color_type: '#1890FF',
                  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                }
              }}           
            /></ItemPanel></Menu.Item>

            <Menu.Item key="16"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '决策树回归',
                attr:{'sourceFile':'people'},
                anchor: [2, 1],
                Dataset: [],
                labelArray: {}, 
                length: 0,
                group:"ml",
                keyConfig:{
                  color_type: '#1890FF',
                  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                }
              }}              
            /></ItemPanel></Menu.Item>
            <Menu.Item key="17"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '随机森林回归',
                attr:{'sourceFile':'people', 
                      'seed': 3, 
                      'maxFeatures': 2,
                      'replacement': false,
                      'nEstimators': 200
                    },
                anchor: [2, 1],
                Dataset: [],
                labelArray: {}, 
                length: 0,
                group:"ml",
                keyConfig:{
                  color_type: '#1890FF',
                  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                }
              }}           
            /></ItemPanel></Menu.Item>
                      
        </SubMenu>

        <SubMenu key="g4" title="分类">
          <Menu.Item key="18"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='two-one'
            model={{
              label: '朴素贝叶斯',
              attr:{'sourceFile':'people'},
              anchor: [2, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
              group:"ml",
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}   
          /></ItemPanel></Menu.Item>

          <Menu.Item key="19"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='two-one'
            model={{
              label: '支持向量机',
              attr:{'sourceFile':'people',
                    'C': 0.01,
                    'tol': 10e-4,
                    'maxPasses': 10,
                    'maxIterations': 10000,
                    'kernel': 'rbf',
                    'kernelOptionsSigma': 0.5
                  },
              anchor: [2, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
              group:"ml",
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}    
          /></ItemPanel></Menu.Item>
          <Menu.Item key='23'><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '逻辑回归',
                elabel: 'LogisticRegression',
                attr:{},
                anchor: [2, 1],
                Dataset: [],
                labelArray: {}, 
                length: 0,
                group:"ml",
                keyConfig:{
                  color_type: '#1890FF',
                  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                }
              }}           
            /></ItemPanel></Menu.Item> 
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title={<span><Icon type="setting" /><span>深度学习</span></span>}>
      <Menu.Item key="20"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='one-one'
            model={{
              label: '卷积神经网络',
              elabel:'Lenet5_train',
              attr:{'激活函数':'relu','卷积步长':2,'优化器':'rmsprop','batchSize':50,'遍历次数':1},
              anchor: [1, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
          /></ItemPanel></Menu.Item>
      <Menu.Item key="24"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='one-one'
            model={{
              label: 'Reshape',
              elabel:'Reshape',
              attr:{'图片x像素': 28,'图片y像素': 28, 'inputShape' : 28},
              anchor: [1, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
          /></ItemPanel></Menu.Item>
      <Menu.Item key="25"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='one-one'
            model={{
              label: 'Convolution',
              elabel:'Convolution',
              attr:{'x': 28,'y': 28, 'z': 28, 'activation': "tanh"},
              anchor: [1, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
          /></ItemPanel></Menu.Item>
      <Menu.Item key="26"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='one-one'
            model={{
              label: 'MaxPooling',
              elabel:'MaxPooling',
              attr:{},
              anchor: [1, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
          /></ItemPanel></Menu.Item>
      <Menu.Item key="27"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='one-one'
            model={{
              label: 'Flatten',
              elabel:'Flatten',
              attr:{},
              anchor: [1, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
          /></ItemPanel></Menu.Item>
      <Menu.Item key="28"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='one-one'
            model={{
              label: 'Dense',
              elabel: 'Dense',
              attr:{'输出维度': 28, 'activation': 'tanh'},
              anchor: [1, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}
          /></ItemPanel></Menu.Item>
      </SubMenu>
    </Menu>
    );
  }
}

export default FlowItemPanel;
