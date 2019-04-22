import React from 'react';
import { ItemPanel, Item } from '@src';
import styles from './index.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import GGEditor,{ Flow, RegisterNode } from '@src';
class FlowItemPanel extends React.Component {
  state={
    isMouseEnter:false
  }
  mouseEnter=()=>{
    this.setState({isMouseEnter:true})
  }
  mouseLeave=()=>{
    this.setState({isMouseEnter:false})
  }
  render() {
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} 
      className={this.state.isMouseEnter?styles.scrollapp:styles.unscrollapp}
      style={{backgroundColor:'#fff'}}>
        <Menu
            defaultOpenKeys={['sub1','sub2','sub3']}
            mode="inline"
            style={{maxHeight:'calc(100vh - 105px)', width:'245px', borderRight:0}}
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
              <Menu.Item key="1" >
                <ItemPanel><Item
                type="node"
                size="200*40"
                shape='zero-one'
                model={{
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
                }}         
              /></ItemPanel></Menu.Item>
              <Menu.Item key="2" > 
              <ItemPanel><Item
                type="node"
                size="200*40"
                shape='zero-one'
                model={{
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
                }}         
              /></ItemPanel></Menu.Item>
              <Menu.Item key="3" > 
              <ItemPanel><Item
                type="node"
                size="200*40"
                shape='zero-one'
                model={{
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
                }}         
              /></ItemPanel></Menu.Item>
          </SubMenu>
            
          <SubMenu key="sub2" title={<span><Icon type="mail" /><span>数据预处理</span></span>}>
          <Menu.Item key="7">
              <ItemPanel><Item
                type="node"
                size="200*40"
                shape="one-one"
                model={{
                  label: '缺失值填充',
                  elabel:'Fillna',
                  anchor: [1, 1],
                  attr:{type:'average'},
                  // attrDetail:[{elabel:'type',label:'填充值', type:'Input', regexp:'^[0-9]+.?[0-9]*'}],
                  attrDetail:[{elabel:'type',label:'填充值', type:'Select', evalue:['average', 'median'], value:['平均值', '中位数']}],
                  Dataset: [],
                  labelArray: {}, 
                  length: 0,
                  group: 'feature',
                  keyConfig:{
                    color_type: '#1890FF',
                    state_icon_url: `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>Group 28</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="模型流程图-01" transform="translate(-723.000000, -395.000000)" fill="#FFBF00">
                            <g id="Group-9" transform="translate(426.000000, 216.000000)">
                                <g id="Group-8" transform="translate(137.000000, 167.000000)">
                                    <g id="Group-28" transform="translate(160.000000, 12.000000)">
                                        <path d="M8,14.875 C8.928125,14.875 9.828125,14.69375 10.675,14.3359375 C11.49375,13.9890625 12.228125,13.49375 12.8609375,12.8625 C13.4921875,12.23125 13.9890625,11.4953125 14.334375,10.6765625 C14.69375,9.828125 14.875,8.928125 14.875,8 C14.875,7.071875 14.69375,6.171875 14.3359375,5.325 C13.9890625,4.50625 13.49375,3.771875 12.8625,3.1390625 C12.23125,2.5078125 11.4953125,2.0109375 10.6765625,1.665625 C9.828125,1.30625 8.928125,1.125 8,1.125 C7.071875,1.125 6.171875,1.30625 5.325,1.6640625 C4.50625,2.0109375 3.771875,2.50625 3.1390625,3.1375 C2.5078125,3.76875 2.0109375,4.5046875 1.665625,5.3234375 C1.30625,6.171875 1.125,7.071875 1.125,8 C1.125,8.928125 1.30625,9.828125 1.6640625,10.675 C2.0109375,11.49375 2.50625,12.228125 3.1375,12.8609375 C3.76875,13.4921875 4.5046875,13.9890625 5.3234375,14.334375 C6.171875,14.69375 7.071875,14.875 8,14.875 L8,14.875 Z M8,16 C3.58125,16 0,12.41875 0,8 C0,3.58125 3.58125,0 8,0 C12.41875,0 16,3.58125 16,8 C16,12.41875 12.41875,16 8,16 L8,16 L8,16 Z M8,6 C7.6546875,6 7.375,6.2796875 7.375,6.625 L7.375,12.390625 C7.375,12.7359375 7.6546875,13.015625 8,13.015625 C8.3453125,13.015625 8.625,12.7359375 8.625,12.390625 L8.625,6.625 C8.625,6.2796875 8.3453125,6 8,6 L8,6 Z M7.296875,4.296875 C7.296875,4.68520021 7.61167479,5 8,5 C8.38832521,5 8.703125,4.68520021 8.703125,4.296875 C8.703125,3.90854979 8.38832521,3.59375 8,3.59375 C7.61167479,3.59375 7.296875,3.90854979 7.296875,4.296875 L7.296875,4.296875 Z" id="Shape-Copy-2" transform="translate(8.000000, 8.000000) scale(1, -1) translate(-8.000000, -8.000000) "></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>`,
                  }
                }}      
          /></ItemPanel></Menu.Item>

          <Menu.Item key="8">
            <ItemPanel><Item
                type="node"
                size="200*40"
                shape="one-one"
                model={{
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
                }}
              /></ItemPanel></Menu.Item>

              <Menu.Item key="9">
                <ItemPanel><Item
                type="node"
                size="200*40"
                shape="one-one"
                model={{
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
                }}
              /></ItemPanel></Menu.Item>

              <Menu.Item key="10">
                <ItemPanel><Item
                type="node"
                size="200*40"
                shape="one-one"
                model={{
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
                }}    
              /></ItemPanel></Menu.Item>

              <Menu.Item key="11">
                <ItemPanel><Item
                type="node"
                size="200*40"
                shape="one-one"
                model={{
                  label: '特征二进制化',
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
                }}           
              /></ItemPanel></Menu.Item>
              <Menu.Item key="12">
                <ItemPanel><Item
                type="node"
                size="200*40"
                shape="one-two"
                model={{
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
                }}           
              /></ItemPanel></Menu.Item>

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
                  }}
                  
                /></ItemPanel></Menu.Item>
              <Menu.Item key="14"><ItemPanel><Item
                  type="node"
                  size="200*40"
                  shape='two-one'
                  model={{
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
                  }}            
                /></ItemPanel></Menu.Item>

                <Menu.Item key="15"><ItemPanel><Item
                  type="node"
                  size="200*40"
                  shape='two-one'
                  model={{
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
                  }}           
                /></ItemPanel></Menu.Item>

                <Menu.Item key="16"><ItemPanel><Item
                  type="node"
                  size="200*40"
                  shape='two-one'
                  model={{
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
                }}    
              /></ItemPanel></Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
      
    );
  }
}

export default FlowItemPanel;
