import React from 'react';
import { ItemPanel, Item } from '@src';
import { Menu, Icon } from 'antd';
import ItemDecoration from '../ItemDecoration';

import styles from './index.less';

/**
 * 左侧下拉菜单栏，包括可操作实现的组件
 * 整理为一个通用的组件，将关于数据源的名字数组传入即可
*/
const SubMenu = Menu.SubMenu;

class FlowModelPanel extends React.Component {

	createModelPanel = (modelList) => {
		var modelListPanel = new Array();

		for (let i in modelList) {
			const model = JSON.parse(JSON.stringify(modelList[i]));
			const { name, elabel } = modelList[i];
			delete model.name;
			delete model.elabel;

			modelListPanel.push(
				<Menu.Item key={i}><ItemPanel>
					<Item
						type="node"
						size="200*40"
						shape='zero-one'
						model={{
							labelName:{
								label: name,
								elabel
							},
							groupName:{
								label: '已保存的模型',
								elabel: 'savedModel'
							},
							...model,
							anchor: [0, 1],
							keyConfig: {
								color_type: '#1890FF',
								state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
							}
						}}
					/>
				</ItemPanel></Menu.Item>);
		}

		return modelListPanel;
	}


	render() {
		const { modelList } = this.props;

		return (
			<Menu
				defaultOpenKeys={['modelList']}
				mode="inline"
				style={{ maxHeight: 'calc(100vh - 105px)', borderRight: 0 }}
				selectable={false}
				className={styles.menuArrows}
			>
				<ItemDecoration />
				<SubMenu key="modelList" title={<span><Icon type="mail" /><span>模型</span></span>}>
					{this.createModelPanel(modelList)}
				</SubMenu>
			</Menu>
		);
	}
}

export default FlowModelPanel;
