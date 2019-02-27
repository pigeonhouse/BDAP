import React from 'react';
import { Card } from 'antd';
import { ItemPanel, Item } from '@src';
import styles from './index.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import GGEditor,{ Flow, RegisterNode } from '@src';
class FlowItemPanel extends React.Component {
  componentWillMount(){
  }
  render() {
    return (
      <Menu
      span={5}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      className={styles.scrollapp}
    >
      <GGEditor>
        <Flow />
        <RegisterNode
          name = {'flow-test'}
          config =  {{
            anchor: [
              [ 0.5, 0],
              [ 0.5, 1]
            ]
          }}
          extend = {'flow-rect'}
        />
      </GGEditor>
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Mnist</span></span>}>
        <MenuItemGroup key="g1" title="Data">
        
          <Menu.Item key="1"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='flow-test'
            model={{
              label: 'Input',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
          <Menu.Item key="2"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="flow-rect"
            model={{
              // color: '#FA8C16',
              label: 'Output',
              attr:{'targetFile':'new_people'}
            }}
            
            
          /></ItemPanel></Menu.Item>
        
        </MenuItemGroup>
        <MenuItemGroup key="g2" title="Model">
       
          <Menu.Item key="3"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="flow-rect"
            model={{
              // color: '#13C2C2',
              label: 'ConvNet',
              attr:{'learningRate':0.1, poolSize: 2, strides: 2}
            }}
            
          /></ItemPanel></Menu.Item>
          <Menu.Item key="4"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="flow-rect"
            model={{
              // color: '#722ED1',
              label: 'DenseNet',
              attr:{'learningRate':0.1}
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
          
        </MenuItemGroup>
      </SubMenu>

      <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>机器学习</span></span>}>
      <SubMenu key="sub3" title="回归">
      <MenuItemGroup>
        <Menu.Item key="5"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='flow-test'
            model={{
              label: '单变量线性回归',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
        <Menu.Item key="6"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='flow-test'
            model={{
              label: '单变量多项式回归',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
          <Menu.Item key="6"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='flow-test'
            model={{
              label: '多变量线性回归',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
          <Menu.Item key="6"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='flow-test'
            model={{
              label: '决策树回归',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
          <Menu.Item key="6"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='flow-test'
            model={{
              label: '随机森林回归',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
          </MenuItemGroup>
      </SubMenu>
        <SubMenu key="sub3" title="分类">
          <Menu.Item key="7"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='flow-test'
            model={{
              label: '朴素贝叶斯',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
          <Menu.Item key="8"><ItemPanel><Item
            type="node"
            size="200*40"
            shape='flow-test'
            model={{
              label: '支持向量机',
              attr:{'sourceFile':'people'}
            }}
            
          /></ItemPanel></Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Titanic</span></span>}>
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
    );
  }
}

export default FlowItemPanel;
