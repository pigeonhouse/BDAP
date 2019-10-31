import React from 'react';
import FlowDataModel from '../../PublicComponents/EditorNodePanel/EditorDataModel'//用来处理展示数据源的部分

/**
 * 左侧菜单栏，表示数据的组件
 */
class FlowDataPanel extends React.Component {
	render() {
		var itemData = [{
			label: 'hdfs数据',
			elabel: 'hdfsFile',
			filePath: undefined,
			fileColumnsInfo: [],
		}];
		var activeFileList = [];
		if (this.props.activeFileList !== undefined) {
			var info = this.props.activeFileList;
			for (let i in info) {
				activeFileList.push({
					label: info[i].fileName,
					elabel: info[i].fileName,
					filePath: info[i].path,
					fileColumnsInfo: info[i].headerAttributes,
					operate:"delete"
				})
			}
		}
		itemData = itemData.concat(activeFileList);
		return (
			<FlowDataModel itemData={itemData}></FlowDataModel>
		);
	}
}

export default FlowDataPanel;
