import React from 'react';
import { ItemPanel, Item } from '@src';
import { Menu, Icon } from 'antd';
import ItemDecoration from '../ItemDecoration/ItemDecoration';
import styles from './index.less';

/**
 * 左侧下拉菜单栏，包括可操作实现的组件
 * 整理为一个通用的组件，将关于数据源的名字数组传入即可
 * 
*/
const SubMenu = Menu.SubMenu;

class FlowDataModel extends React.Component {
	state = {
		isMouseEnter: false,
	}
	mouseEnter = () => {
		this.setState({ isMouseEnter: true })
	}
	mouseLeave = () => {
		this.setState({ isMouseEnter: false })
	}
	createDataPanel = (item) => {
		var result = [];
		var menu;
		for (let i in item) {
			menu = item[i];
			result.push(<Menu.Item key={i}><ItemPanel>
				<Item
					type="node"
					size="200*40"
					shape='zero-one'
					model={{
						label: menu.label,
						elabel: menu.elabel,
						attr: {},
						attrDetail: [],
						Dataset: [],
						labelArray: {},
						length: 0,
						anchor: [0, 1],
						group: 'input',
						keyConfig: {
							color_type: '#1890FF',
							state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
						}
					}}
				/>
			</ItemPanel></Menu.Item>);
		}
		return result;
	}
	render() {
		var itemData = this.props.itemData;
		return (
			<div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
				className={this.state.isMouseEnter ? styles.scrollapp : styles.unscrollapp}
				style={{ backgroundColor: '#fff' }}>
				<Menu
					defaultOpenKeys={['sub1']}
					mode="inline"
					className={styles.scrollapp}
					style={{ maxHeight: 'calc(100vh - 105px)' }}
					selectable={false}
				>
					<ItemDecoration />
					<SubMenu key="sub1" title={<span><Icon type="mail" /><span>数据源</span></span>}>					
						{this.createDataPanel(itemData)}
					</SubMenu>
				</Menu>
			</div>
		);
	}
}

export default FlowDataModel;