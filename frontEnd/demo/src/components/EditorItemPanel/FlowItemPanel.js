import React from 'react';
import { Card } from 'antd';
import { ItemPanel, Item } from '@src';
import styles from './index.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class FlowItemPanel extends React.Component {

  render() {
    return (
      <Menu
      span={4}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      className={styles.scrollapp}
    >
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Mnist</span></span>}>
        <MenuItemGroup key="g1" title="Data">
        
          <Menu.Item key="1"><ItemPanel><Item
            type="node"
            size="200*40"
            shape="flow-rect"
            model={{
              // color: '#FA8C16',
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
              attr:{'learningRate':0.1}
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
      <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Iris</span></span>}>
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
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
