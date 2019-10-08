import React from 'react';
import { ItemPanel, Item } from '@src';
import { Menu, Icon } from 'antd';
import ItemDecoration from '../ItemDecoration';

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
            labelArray: []，此标签框对应展示数据的标签
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
			itemList.map((item) => {
				if (item.groupName.elabel === group) {
					result.push(
						<Menu.Item key={item}><ItemPanel>
							<Item
								type="node"
								size="200*40"
								shape={this.switchShape(item.anchor)}
								model={{
									labelName: item.labelName,
									groupName: item.groupName,
									anchor: item.anchor,
									attributes: item.attributes,
									labelArray: [],
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
				style={{ maxHeight: 'calc(100vh - 105px)', width: '240px', borderRight: 0 }}
				selectable={false}
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
