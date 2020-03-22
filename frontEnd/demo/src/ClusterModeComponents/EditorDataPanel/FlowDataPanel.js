import React from 'react';
import FlowDataModel from '../../PublicComponents/EditorNodePanel/EditorDataModel';

/**
 * 左侧菜单栏中，表示数据的组件
 * 将从后端拿到的commonFileList转化为FlowDataModel可以动态生成的数据格式
 * 返回FlowDataModel组件。
 */
class FlowDataPanel extends React.Component {
	render() {

		const { commonFileList } = this.props;

		// 构造fileModal即文件模板
		var fileModel = [{
			label: 'hdfs数据',
			elabel: 'hdfsFile',
			filePath: undefined,
			fileColumnsInfo: new Array(),
		}];

		/**
		 * 将commonFileList数组中的数据转化为FlowDataModel组件可以动态生成的格式
		 */
		if (commonFileList !== undefined) {
			for (let i in commonFileList) {
				const { fileName, path, headerAttributes } = commonFileList[i];

				fileModel.push({
					label: fileName,
					elabel: fileName,
					filePath: path,
					fileColumnsInfo: headerAttributes,
					operate: "delete"
				})
			}
		}

		return (
			<FlowDataModel fileModel={fileModel}></FlowDataModel>
		);
	}
}

export default FlowDataPanel;
