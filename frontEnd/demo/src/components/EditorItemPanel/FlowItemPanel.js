import React from 'react';
import { Card } from 'antd';
import { ItemPanel, Item } from '@src';
import styles from './index.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import GGEditor,{ Flow, RegisterNode } from '@src';
class FlowItemPanel extends React.Component {

  render() {
    return (
      <div>
        <GGEditor>
          <Flow />
          <RegisterNode 
            name={'model-card'} 
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
                    fill: this.color_type
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
                const label = model.label ? model.label : this.label;
                group.addShape('text', {
                  attrs: {
                    text: label,
                    x: x + 52,
                    y: y + 13,
                    textAlign: 'start',
                    textBaseline: 'top',
                    fill: 'rgba(0,0,0,0.65)'
                  }
                });
                // 状态 logo
                group.addShape('image', {
                  attrs: {
                    img: this.state_icon_url,
                    x: x + 158,
                    y: y + 12,
                    width: 16,
                    height: 16
                  }
                });
                return keyShape;
              },
              // 设置锚点
              anchor: [
                [ 0.5, 0 ], // 上面边的中点
                [ 0.5, 1 ] // 下边边的中点
              ]
            }} 
          />
          <RegisterNode
            name = {'flow-test'}
            config =  {{
              color_type: '#9254DE',
              type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
              state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
              // 设置锚点
              anchor: [
                [ 0.5, 0, {
                  type: 'input'
                }],
                [ 0.5, 1, {
                  type: 'output'
                }]
              ]
            }}
            extend = {'model-card'}
          />
        </GGEditor>
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

      </div>
    );
  }
}

export default FlowItemPanel;
