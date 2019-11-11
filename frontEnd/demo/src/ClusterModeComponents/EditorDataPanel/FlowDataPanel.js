import React from 'react';
import FlowDataModel from '../../PublicComponents/EditorNodePanel/EditorDataModel';

/**
 * 左侧菜单栏，表示数据的组件
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
