import React from 'react';
import { Card, Form, Input } from 'antd';
import { withPropsAPI } from '@src';

import AttrDetail from './AttrDetail';
import SelectWord from './SelectWord';
import PredictLabel from './PredictLabel';
import GetInputOutput from './GetInputOutput';

import styles from './index.less';

/**
 * 右侧属性细节组件
 * 包括选择字段，参数输入，输入文件，预处理参数选择，预测集列名
 */

const { Item } = Form;
const inlineFormItemLayout = {
	labelCol: {
		sm: { span: 10 },
	},
	wrapperCol: {
		sm: { span: 14 },
	},
};

class NodeDetail extends React.Component {
	render() {
		const { form, propsAPI } = this.props;
		const { getFieldDecorator } = form;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];

		if (!item) {
			return null;
		}
		const { labelName, attr, groupName, attrDetail } = item.getModel();
		const { label } = labelName;
		const { group } = groupName.label;

		return (
			<Card
				type="inner"
				title="参数"
				bordered={false}
				style={{ paddingRight: 0 }}
				className={styles.scrollapp}
			>
				<Form onSubmit={this.handleSubmit}>
					{/**显示label：{label}*/}
					<Item style={{ margin: 0 }} label="label" {...inlineFormItemLayout}>
						{
							getFieldDecorator('label', {
								initialValue: label,
							})(<Input disabled />)
						}
					</Item>

					{/* 显示attrDetail，即属性的细节，取决于标签框中的attrDetail属性*/}
					<AttrDetail attrDetail={attrDetail} attr={attr} />

					{/* 选择字段 */}
					<SelectWord item={item} />

					{/* 选择字段后，对于预测集列名的重命名 */}
					<PredictLabel group={group} />

					{/* 检测是否为输入输出Item，若是则进行相关处理 */}
					<GetInputOutput label={label} group={group} />
				</Form>
			</Card>
		);
	}
}

export default Form.create()(withPropsAPI(NodeDetail));
