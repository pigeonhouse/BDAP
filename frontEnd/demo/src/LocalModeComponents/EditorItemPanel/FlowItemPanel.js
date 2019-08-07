import React from 'react';
import { ItemPanel, Item } from '@src';
import { Menu, Icon } from 'antd';
import ItemDecoration from '../../PublicComponents/ItemDecoration/ItemDecoration';
import styles from './index.less';
import { localItem } from './FlowItemModel';

/**
 * 左侧下拉菜单栏，包括可操作实现的组件
 */
const SubMenu = Menu.SubMenu;

class FlowItemPanel extends React.Component {
  state={
    isMouseEnter:false,
    itemNumber:1
  }
  mouseEnter=()=>{
    this.setState({isMouseEnter:true})
  }
  mouseLeave=()=>{
    this.setState({isMouseEnter:false})
  }
  createItemPanel=(item)=>{
    var result = [];
    // 判断是否有SubMenu，没有则跳过，有则加入并递归下一层SubMenu
    if(item.hasOwnProperty("subMenu")){
      var subMenu;
      for(let i in item.subMenu){
        subMenu = item.subMenu[i];
        // 判断两种SubMenu样式类型，即是否有Icon，有的话用type及name表示，没有的话用title表示。
        if(subMenu.title === undefined){
          result.push(
            <SubMenu 
              key={subMenu.key}
              title={<span><Icon type={subMenu.type} /><span>{subMenu.name}</span></span>}
            >
              {this.createItemPanel(subMenu)}
            </SubMenu>);
        }
        else{
          result.push(
            <SubMenu 
              key={subMenu.key}
              title={subMenu.title}
            >
              {this.createItemPanel(subMenu)}
            </SubMenu>);
        }
      }
    }

    // 判断是否有MenuItem，有则加入，没有则跳过
    if(item.hasOwnProperty("menu")){
      var menu;
      for(let i in item.menu){
        menu = item.menu[i];
        result.push(<Menu.Item key={i}><ItemPanel>
          <Item
            type={menu.type}
            size={menu.size}
            shape={menu.shape}
            model={menu.model}
          />
        </ItemPanel></Menu.Item>);
      }
    }
    return result;
  }
  render() {
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} 
        className={this.state.isMouseEnter?styles.scrollapp:styles.unscrollapp}
        style={{backgroundColor:'#fff'}}>
        <Menu
            defaultOpenKeys={localItem.defaultOpenKeys}
            mode={localItem.mode}
            style={{maxHeight:'calc(100vh - 105px)', width:'245px', borderRight:0}}
            selectable={localItem.selectable}
          >
          <ItemDecoration/>
          {this.createItemPanel(localItem)}
        </Menu>    
      </div>
    );
  }
}

export default FlowItemPanel;
