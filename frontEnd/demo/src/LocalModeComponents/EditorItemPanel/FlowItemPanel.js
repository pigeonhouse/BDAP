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
      style={{maxHeight:676}}
      selectable={false}
    >
      <GGEditor style={{height:0, width:0}}>
          <Flow />
          <RegisterNode 
            name = {'two-one'}
            config =  {{
              anchor: [
                [ 0.33, 0],
                [ 0.66, 0],
                [ 0.5, 1]
              ]
            }}
            extend = {'flow-rect'}
          />
          <RegisterNode 
            name = {'one-two'}
            config =  {{
              anchor: [
                [ 0.5, 0],
                [ 0.33, 1],
                [ 0.66, 1]
              ]
            }}
            extend = {'flow-rect'}
          />
          <RegisterNode 
            name = {'one-one'}
            config =  {{
              anchor: [
                [ 0.5, 0],
                [ 0.5, 1]
              ]
            }}
            extend = {'flow-rect'}
          />
          <RegisterNode 
            name = {'zero-one'}
            config =  {{
              anchor: [
                [ 0.5, 1]
              ]
            }}
            extend = {'flow-rect'}
          />
          <RegisterNode 
            name = {'one-zero'}
            config =  {{
              anchor: [
                [ 0.5, 0]
              ]
            }}
            extend = {'flow-rect'}
          />
        </GGEditor>
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>数据源</span></span>}>
          <Menu.Item key="1" > <ItemPanel><Item
            type="node"
            size="200*40"
            shape='zero-one'
            model={{
              label: '本地数据',
              elabel:'localFile',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [0, 1]
            }}         
          /></ItemPanel></Menu.Item>
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
              anchor: [0, 1]
            }}         
          /></ItemPanel></Menu.Item>
          {/* <Menu.Item key="2"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-zero"
            model={{
              // color: '#FA8C16',
              label: 'Output',
              attr:{'targetFile':'new_people'}
              anchor: [1, 0]
            }}           
          /></ItemPanel></Menu.Item>        */}
       </SubMenu>
         {/* <SubMenu key="g2" title="Model">      
          <Menu.Item key="3"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="flow-rect"
            model={{
              label: 'ConvNet',
              attr:{'learningRate':0.1, poolSize: 2, strides: 2}
            }}         
          /></ItemPanel></Menu.Item>
          <Menu.Item key="4"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="two-one"
            model={{
              label: 'DenseNet',
              attr: {'learningRate':0.1},
              Dataset: [],
              labelArray: [], 
              length: 0,
              select_status: 3
            }}          
          /></ItemPanel></Menu.Item>
          <Menu.Item key="5"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="flow-rect"
            model={{
              // color: '#722ED1',
              label: 'FillNa',
              attr:{'range':'unknown','originNumber':null,'fillingNumber':100}
            }}
           
          /></ItemPanel></Menu.Item>

          <Menu.Item key="6"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="flow-rect"
            model={{
              // color: '#722ED1',
              label: 'MaxMinScaler',
              attr:{'rows':'unknown'}
              
            }}
           
          /></ItemPanel></Menu.Item>
           
        </SubMenu> */}
        
      <SubMenu key="sub2" title={<span><Icon type="mail" /><span>数据预处理</span></span>}>
      <Menu.Item key="7"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '缺失值填充',
              elabel:'Fillna',
              anchor: [1, 1],
              attr:{type:'average'},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              group: 'feature'
            }}      
      /></ItemPanel></Menu.Item>

      <Menu.Item key="8"><ItemPanel><Item
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
              group: 'feature'
            }}
           /></ItemPanel></Menu.Item>

          <Menu.Item key="9"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '特征区间化',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature'
            }}
          /></ItemPanel></Menu.Item>

          <Menu.Item key="10"><ItemPanel><Item
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
          /></ItemPanel></Menu.Item>

          <Menu.Item key="11"><ItemPanel><Item
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
          /></ItemPanel></Menu.Item>

          <Menu.Item key="21"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              label: '数据类型转换',
              attr:{},
              Dataset: [],
              labelArray: {}, 
              length: 0,
              anchor: [1, 1],
              group: 'feature'
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
                attr:{'预测集列名':'label'},
                Dataset: [],
                labelArray: {}, 
                length: 0,
                group:"ml"     
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
                group:"ml"
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
                length: 0
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
                group:"ml"
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
                group:"ml"
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
              group:"ml"
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
              group:"ml"
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
              attr:{'激活函数':'relu','卷积步长':2,'优化器':'rmsprop','batchSize':50,'遍历次数':1},
              anchor: [1, 1],
              Dataset: [],
              labelArray: {}, 
              length: 0,
            }}
          /></ItemPanel></Menu.Item>
      </SubMenu>
    </Menu>
    );
  }
}

export default FlowItemPanel;
