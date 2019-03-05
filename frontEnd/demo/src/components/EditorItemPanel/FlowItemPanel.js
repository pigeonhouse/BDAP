import React from 'react';
import { Card ,Upload} from 'antd';
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
    >
      <GGEditor style={{height:0}}>
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
              attr:{},
              Dataset: [],
              labelArray: [], 
              length: 0,
              //select_status: 3
            }}         
          /></ItemPanel></Menu.Item>
          <Menu.Item key="2" > <ItemPanel><Item
            type="node"
            size="200*40"
            shape='zero-one'
            model={{
              label: 'hdfs数据',
              attr:{},
              Dataset: [],
              labelArray: [], 
              length: 0,
              //select_status: 3
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
              // color: '#722ED1',
              label: '缺失值填充',
              select_status: 1,
              attr:{ type:'mean' },
              Dataset: [],
              labelArray: [], 
              length: 0,
              
            }}
           
          /></ItemPanel></Menu.Item>
      <Menu.Item key="8"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              // color: '#722ED1',
              label: '归一化',
              attr:{},
              Dataset: [],
              labelArray: [], 
              length: 0,
              select_status: 1
            }}
           
          /></ItemPanel></Menu.Item>

          <Menu.Item key="9"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              // color: '#722ED1',
              label: '特征区间化',
              attr:{},
              Dataset: [],
              labelArray: [], 
              length: 0,
              select_status: 1
            }}
          /></ItemPanel></Menu.Item>

            <Menu.Item key="10"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              // color: '#722ED1',
              label: '特征分组归类',
              attr:{},
              Dataset: [],
              labelArray: [], 
              length: 0,
              select_status: 1
            }}
           
          /></ItemPanel></Menu.Item>

          <Menu.Item key="11"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="one-one"
            model={{
              // color: '#722ED1',
              label: '特征二进制化',
              attr:{},
              Dataset: [],
              labelArray: [], 
              length: 0,
              select_status: 1
            }}
           
          /></ItemPanel></Menu.Item>
      </SubMenu>

      <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>机器学习</span></span>}>
        <SubMenu key="g3" title="回归">
        
          <Menu.Item key="9"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '单变量线性回归',
                select_status: 2,
                attr:{},
                Dataset: [],
                labelArray: [[],[],[]], 
                length: 0,
              }}
              
            /></ItemPanel></Menu.Item>
          <Menu.Item key="10"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '单变量多项式回归',
                attr:{'sourceFile':'people'}
              }}
              
            /></ItemPanel></Menu.Item>
            <Menu.Item key="11"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '多变量线性回归',
                attr:{'sourceFile':'people'}
              }}
              
            /></ItemPanel></Menu.Item>
            <Menu.Item key="12"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '决策树回归',
                attr:{'sourceFile':'people'}
              }}
              
            /></ItemPanel></Menu.Item>
            <Menu.Item key="13"><ItemPanel><Item
              type="node"
              size="200*40"
              shape='two-one'
              model={{
                label: '随机森林回归',
                attr:{'sourceFile':'people'}
              }}
              
            /></ItemPanel></Menu.Item>         
        </SubMenu>

        <SubMenu key="g4" title="分类">
          <Menu.Item key="14"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='two-one'
            model={{
              label: '朴素贝叶斯',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
          <Menu.Item key="15"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='two-one'
            model={{
              label: '支持向量机',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title={<span><Icon type="setting" /><span>深度学习</span></span>}>
        <Menu.Item key="14">Option 9</Menu.Item>
        <Menu.Item key="15">Option 10</Menu.Item>
        <Menu.Item key="16">Option 11</Menu.Item>
        <Menu.Item key="17">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
    );
  }
}

export default FlowItemPanel;
