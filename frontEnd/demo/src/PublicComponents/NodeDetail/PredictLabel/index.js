import React, { Fragment } from 'react';
import { Form, Input } from 'antd';
import { withPropsAPI } from '@src';

/**
 * 获取预测集名称输入
 * @param {string} group
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

class PredictLabel extends React.Component {
	//修改预测集名称为用户输入的项
	handleSubmitTest = (e) => {
		e.preventDefault();

		const { form, propsAPI } = this.props;
		const { getSelected, executeCommand, update } = propsAPI;

		form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return;
			}
			const item = getSelected()[0];
			if (!item) {
				return;
			}
			let attr = JSON.parse(JSON.stringify(item.model.attr));
			attr['predict_y'] = values['预测集名称'];
			executeCommand(() => {
				update(item, { attr });
			});
		});
	}

	//生成修改列名的表单项，并在Item.attr增加默认值
	testLabelInput = () => {
		const { propsAPI, form, group } = this.props;
		const { getSelected, update } = propsAPI;
		const { getFieldDecorator } = form;
		if (group === 'ml') {
			const item = getSelected()[0];

			//修改为默认值
			let attr = JSON.parse(JSON.stringify(item.model.attr));
			if (attr['predict_y'] === undefined) {
				attr['predict_y'] = 'predict';
				update(item, { attr });
			}

			return <Item style={{ margin: 0 }} label="预测集名称" {...inlineFormItemLayout}>
				{
					getFieldDecorator('预测集名称', {
						initialValue: attr['predict_y'],
					})(<Input onBlur={this.handleSubmitTest} />)
				}
			</Item>
		}
	}

	render() {
		return (
			<Fragment>
				{this.testLabelInput()}
			</Fragment>
		);
	}
}

export default Form.create()(withPropsAPI(PredictLabel));
