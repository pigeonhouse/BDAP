import React from 'react';
import { ItemPanel, Item } from '@src';
import { Menu, Icon } from 'antd';
import ItemDecoration from '../ItemDecoration/ItemDecoration';
import styles from './index.less';
import { localItem } from '../../LocalModeComponents/EditorItemInfo/FlowItemInfo';
import { pythonItem } from '../../PythonModeComponents/EditorItemInfo/FlowItemInfo';
import { clusterItem } from '../../ClusterModeComponents/EditorItemInfo/FlowItemInfo';

/**
 * 左侧下拉菜单栏，包括可操作实现的组件
 * 整理为一个通用的组件，将具体信息放入对应版本EditorItemInfo/FlowItemInfo中，数据格式整理如下：
 * 
Item 数据格式：
{
    defaultOpenKeys：默认打开的菜单栏,为字符串数组
    mode：下拉菜单的类型 "inline"
    selectable：是否可选择，若为true，则在选择时会有蓝色背景，类型为字符型
    subMenu：子菜单项，可展开，可嵌套新的subMenu及menu，可有可无,类型为对象数组
    [{
        key：对应defaultOpenKeys中的菜单
        
        若title存在，则type及name不存在；title不存在，则type及name存在
        title：子菜单项名字
        type：子菜单Icon类型
        name：子菜单项名字

        内部可嵌套subMenu或menu
    }]
    menu：子项，不可展开，最小选中单位，类型为对象数组
    [{
        type: Item类型，默认"node"
        size: 拖动到右侧标签框的大小，"200*40"
        shape: node的形状类型，第一个数表示上方锚点的个数，第二个数表示下方锚点的个数 "one-one"
        model:{
            label: '归一化'，标签名称
            elabel:'MinMaxScaler'，标签英文名称
            attr:{}，一些属性
            attrDetail:[]，属性的细节
            Dataset: []，此标签框对应的展示数据
            labelArray: {}，此标签框对应展示数据的标签
            length: 0，对应数据的长度个数
            anchor: [1, 1]，锚点个数【上，下】
            group: 'feature'，标签对应的分组
            keyConfig:{ 标签框的颜色及状态图案
                color_type: '#1890FF',
                state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
            }
        }
    }]
}
*/
const SubMenu = Menu.SubMenu;

class FlowItemModel extends React.Component {
	state = {
		isMouseEnter: false,
		itemNumber: 1,
		itemData: [],
	}
	componentWillMount() {
		var itemInfo;
		if (this.props.type === 'local') {
			itemInfo = localItem;
		}
		else if(this.props.type === 'python'){
			itemInfo = pythonItem;
		}
		else if(this.props.type === 'cluster'){
			itemInfo = clusterItem;
		}
		this.setState({
			itemData: itemInfo
		})
	}
	mouseEnter = () => {
		this.setState({ isMouseEnter: true })
	}
	mouseLeave = () => {
		this.setState({ isMouseEnter: false })
	}
	createItemPanel = (item) => {
		var result = [];
		// 判断是否有SubMenu，没有则跳过，有则加入并递归下一层SubMenu
		if (item.hasOwnProperty("subMenu")) {
			var subMenu;
			for (let i in item.subMenu) {
				subMenu = item.subMenu[i];
				// 判断两种SubMenu样式类型，即是否有Icon，有的话用type及name表示，没有的话用title表示。
				if (subMenu.title === undefined) {
					result.push(
						<SubMenu
							key={subMenu.key}
							title={<span><Icon type={subMenu.type} /><span>{subMenu.name}</span></span>}
						>
							{this.createItemPanel(subMenu)}
						</SubMenu>);
				}
				else {
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
		if (item.hasOwnProperty("menu")) {
			var menu;
			for (let i in item.menu) {
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
		var itemData = this.state.itemData;
		return (
			<div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
				className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
				style={{ backgroundColor: '#fff' }}>
				<Menu
					defaultOpenKeys={itemData.defaultOpenKeys}
					mode={itemData.mode}
					style={{ maxHeight: 'calc(100vh - 105px)', width: '245px', borderRight: 0 }}
					selectable={itemData.selectable}
				>
					<ItemDecoration />
					{this.createItemPanel(itemData)}
				</Menu>
			</div>
		);
	}
}

export default FlowItemModel;
