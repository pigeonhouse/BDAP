import React from 'react';
import { Card, Form, Input } from 'antd';
import { withPropsAPI } from '@src';

import AttrDetail from './AttrDetail';
import SelectWord from './SelectWord';
import PredictLabel from './PredictLabel';
import GetInputOutput from './GetInputOutput';
import Feature from '../DataOperate/FeatureNodeDetail/Feature';

import styles from './index.less';

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
		const { label, attr, group, Dataset, attrDetail, type } = item.getModel();

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
					<SelectWord item={item} type={type} />

					{/* 选择字段后，对于预测集列名的重命名 */}
					<PredictLabel group={group} />

					{/* 有关预处理的函数 */}
					<Feature item={item}/>

					{/* 检测是否为输入输出Item，若是则进行相关处理 */}
					<GetInputOutput label={label} group={group} Dataset={Dataset} />
				</Form>
			</Card>
		);
	}
}

export default Form.create()(withPropsAPI(NodeDetail));
