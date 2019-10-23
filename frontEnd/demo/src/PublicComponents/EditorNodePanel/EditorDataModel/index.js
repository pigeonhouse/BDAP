import React from 'react';
import { ItemPanel, Item } from '@src';
import { Menu, Icon } from 'antd';
import ItemDecoration from '../ItemDecoration';

import styles from './index.less';

/**
 * 左侧下拉菜单栏，包括可操作实现的组件
 * 整理为一个通用的组件，将关于数据源的名字数组传入即可
 * 
*/
const SubMenu = Menu.SubMenu;

class FlowDataModel extends React.Component {
	
	createLabelArray = (fileColumnsInfo) => {
		var labelArray = new Array();
		fileColumnsInfo.map((item)=>{
			labelArray.push([item.colName, false]);
		})
		return labelArray;
	}

	createDataPanel = (item) => {
		var result = [];
		var menu;
		for (let i in item) {
			menu = item[i];
			result.push(
				<Menu.Item key={i}><ItemPanel>
					<Item
						type="node"
						size="200*40"
						shape='zero-one'
						model={{
							labelName: {
								label: menu.label,
								elabel: menu.elabel,
							},
							groupName: {
								label: "数据源",
								elabel: 'datasource',
							},
							attributes: [],
							filePath: menu.filePath,
							anchor: [0, 1],
							columnsInfo: menu.fileColumnsInfo,
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
			<Menu
				defaultOpenKeys={['sub1']}
				mode="inline"
				style={{ maxHeight: 'calc(100vh - 105px)', borderRight: 0 }}
				selectable={false}
				className={styles.menuArrows}
			>
				<ItemDecoration />
				<SubMenu key="sub1" title={<span><Icon type="mail" /><span>数据源</span></span>}>
					{this.createDataPanel(itemData)}
				</SubMenu>
			</Menu>
		);
	}
}

export default FlowDataModel;
