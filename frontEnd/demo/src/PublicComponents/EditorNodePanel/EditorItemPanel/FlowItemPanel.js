import React from 'react';
import { ItemPanel, Item } from '@src';
import { Menu, Icon } from 'antd';
import ItemDecoration from '../ItemDecoration';

import styles from './index.less';

/**
 * 左侧下拉菜单栏，包括可操作实现的组件
 * 整理为一个通用的组件，将具体信息放入对应版本EditorItemInfo/FlowItemInfo中，数据格式整理如下：
 * 
*/
const SubMenu = Menu.SubMenu;

class FlowItemModel extends React.Component {

	transformString = (number) => {
		switch (number) {
			case 0: return 'zero';
			case 1: return 'one';
			case 2: return 'two';
			case 3: return 'three';
			default: return 'zero';
		}
	}

	switchShape = (anchor) => {
		const head = this.transformString(anchor[0]);
		const tail = this.transformString(anchor[1]);
		return `${head}-${tail}`;
	}

	createItemPanel = (itemList, group) => {
		var result = new Array();
		if (itemList !== undefined) {
			itemList.map((item, index) => {
				if (item.groupName.elabel === group) {
					result.push(
						<Menu.Item key={index}><ItemPanel>
							<Item
								type="node"
								size="200*40"
								shape={this.switchShape(item.anchor)}
								model={{
									labelName: item.labelName,
									groupName: item.groupName,
									anchor: item.anchor,
									columnsInfo: item.columnsInfo,
									attributes: item.attributes,
									keyConfig: {
										color_type: '#1890FF',
										state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
									}
								}}
							/>
						</ItemPanel></Menu.Item>);
				}
			})
		}
		return result;
	}

	render() {
		const itemData = this.props.moduleNodesList;
		return (
			<Menu
				mode="inline"
				style={{ maxHeight: 'calc(100vh - 105px)', borderRight: 0 }}
				selectable={false}
				className={styles.menuArrows}
			>
				<ItemDecoration />
				<SubMenu
					key="preprocessing"
					title={<span><Icon type="code" /><span>数据预处理</span></span>}
				>
					{this.createItemPanel(itemData, "preprocessing")}
				</SubMenu>
				<SubMenu
					key="machinelearning"
					title={<span><Icon type="calculator" /><span>机器学习</span></span>}
				>
					{this.createItemPanel(itemData, "machinelearning")}
				</SubMenu>
			</Menu>
		);
	}
}

export default FlowItemModel;