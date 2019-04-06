import React from 'react';
import { ItemPanel, Item } from '@src';
import styles from './index.less';
import { Menu, Icon ,Tooltip} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import GGEditor,{ Flow, RegisterNode } from '@src';
class FlowDataPanel extends React.Component {
  state={
    children:[]
  }
  componentWillMount(){
    var children = new Array();
    const dataTable = ['data.txt','data.txt','data.txt','data.txt']
    for(let i in dataTable){
      children.push(
        <Menu.Item key={i+4} > 
          <Tooltip title="左键单击拖拽至右面" placement="rightTop">
            <div><ItemPanel><Item
              type="node"
              size="200*40"
              shape='zero-one'
              model={{
                label: dataTable[i],
                elabel: dataTable[i],
                attr:{},
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
            /></ItemPanel></div>
          </Tooltip>
        </Menu.Item>
      )
    }
    this.setState({children})
  }
  render() {
    return (
      <Menu
        defaultOpenKeys={['sub1','sub2','sub3']}
        mode="inline"
        className={styles.scrollapp}
        style={{maxHeight:'calc(100vh - 105px)'}}
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
        </GGEditor>
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>数据源</span></span>}>
          <Menu.Item key="1" ><Tooltip title="左键单击拖拽至右面" placement="rightTop" ><div> <ItemPanel><Item
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
              anchor: [0, 1],
              group:'input',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}         
          /></ItemPanel></div></Tooltip></Menu.Item>
          <Menu.Item key="2" > 
          <Tooltip title="左键单击拖拽至右面" placement="rightTop">
          <div><ItemPanel><Item
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
              group:'input',
              keyConfig:{
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
              }
            }}         
          /></ItemPanel></div></Tooltip></Menu.Item>
          <Menu.Item key="3" > 
          <Tooltip title="左键单击拖拽至右面" placement="rightTop">
          <div><ItemPanel><Item
            type="node"
            size="200*40"
            shape='zero-one'
            model={{
              label: 'Titanic测试',
              elabel:'TitanicTestFile',
              attr:{},
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
          /></ItemPanel></div></Tooltip></Menu.Item>
          <Menu.Item key="4" > 
          <Tooltip title="左键单击拖拽至右面" placement="rightTop">
          <div><ItemPanel><Item
            type="node"
            size="200*40"
            shape='zero-one'
            model={{
              label: 'Titanic训练',
              elabel:'TitanicTrainFile',
              attr:{},
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
          /></ItemPanel></div></Tooltip></Menu.Item>
          {this.state.children}
      </SubMenu>
    </Menu>
    );
  }
}

export default FlowDataPanel;
