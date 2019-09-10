import React, { Component } from 'react'
import { withPropsAPI } from '@src';
import { Form, Select, Input, Radio } from 'antd'
import '../feature.less'
const { Item } = Form;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class DataFilter extends Component {
	changeCondition = (attr) => {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		var condition = '';
		const labelArray = item.model.labelArray;
		for (let i in labelArray) {
			if (labelArray[i][1]) {
				const con = attr[labelArray[i][0]];
				if (attr.hasOwnProperty(labelArray[i][0])) {
					if (condition === '') {
						condition = '(' + con.join(' ') + ')';
					}
					else {
						condition = condition + ' ' + attr.columnsRelation + ' (' + con.join(' ') + ')';
					}
				}
			}
		}
		return condition;
	}
	handleSubmitInput = (e) => {
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
			const tag = this.props.tag;
			// if(values[tag][1] !== undefined)
			values[tag][0] = tag;
			// if(values[tag][5] !== undefined)
			values[tag][4] = tag;
			attr[tag] = values[tag];
			attr.condition = this.changeCondition(attr);
			executeCommand(() => {
				update(item, { attr });
			});
		});
	}
	handleSubmitSelect(index, value) {
		const { propsAPI } = this.props;
		const { getSelected, executeCommand, update } = propsAPI;
		const item = getSelected()[0];
		if (!item) {
			return;
		}
		let attr = JSON.parse(JSON.stringify(item.model.attr));
		const tag = this.props.tag;
		attr[tag][index] = value;
		attr.condition = this.changeCondition(attr);
		executeCommand(() => {
			update(item, { attr });
		});
	}
	handleSubmitRadio = (e) => {
		const { propsAPI } = this.props;
		const { getSelected, executeCommand, update } = propsAPI;
		const item = getSelected()[0];
		let attr = JSON.parse(JSON.stringify(item.model.attr));
		const tag = this.props.tag;
		attr[tag][3] = e.target.value;
		attr.condition = this.changeCondition(attr);
		executeCommand(() => {
			update(item, { attr });
		});
	}
	render() {
		const { propsAPI } = this.props;
		const { getSelected, update, executeCommand } = propsAPI;
		const item = getSelected()[0];
		const tag = this.props.tag;
		var attr = item.model.attr[tag];
		if (attr) {

		}
		else {
			let attribute = JSON.parse(JSON.stringify(item.model.attr));
			attr = new Array();
			attribute[tag] = new Array();
			executeCommand(() => {
				update(item, { attr: attribute });
			});
		}
		const { getFieldDecorator } = this.props.form;
		const inlineFormItemLayout = {
			labelCol: {
				sm: { span: 6 },
			},
			wrapperCol: {
				sm: { span: 24 },
			},
		};
		return (
			<Form>
				<Item
					{...inlineFormItemLayout}
					style={{ margin: 0 }}
					required={false}
				>
					{getFieldDecorator(`${tag}[1]`, attr[1] ? {
						initialValue: attr[1]
					} : {}
					)(
						<Select placeholder='compare' style={{ width: '50%' }} onChange={this.handleSubmitSelect.bind(this, 1)}>
							<Option value=">=">大于等于</Option>
							<Option value="<=">小于等于</Option>
							<Option value=">">大于</Option>
							<Option value="<">小于</Option>
						</Select>
					)}
					{getFieldDecorator(`${tag}[2]`, attr[2] ? {
						initialValue: attr[2]
					} : {}
					)(
						<Input
							placeholder='value'
							onChange={this.handleSubmitInput}
							onBlur={this.handleSubmitInput}
							style={{ width: '50%' }} />
					)}
				</Item>
				<Item
					{...inlineFormItemLayout}
					style={{ margin: 0 }}
					required={false}
				>
					{getFieldDecorator(`${tag}[3]`, attr[3] ? {
						initialValue: attr[3]
					} : {}
					)(
						<RadioGroup onChange={this.handleSubmitRadio} style={{ width: '100%' }} >
							<Radio value="and">与</Radio>
							<Radio value="or">或</Radio>
						</RadioGroup>
					)}
				</Item>
				<Item
					{...inlineFormItemLayout}
					style={{ margin: 0 }}
					required={false}
				>
					{getFieldDecorator(`${tag}[5]`, attr[5] ? {
						initialValue: attr[5]
					} : {}
					)(
						<Select placeholder='compare' style={{ width: '50%' }} onChange={this.handleSubmitSelect.bind(this, 5)}>
							<Option value=">=">大于等于</Option>
							<Option value="<=">小于等于</Option>
							<Option value=">">大于</Option>
							<Option value="<">小于</Option>
						</Select>
					)}
					{getFieldDecorator(`${tag}[6]`, attr[6] ? {
						initialValue: attr[6]
					} : {}
					)(
						<Input
							placeholder='value'
							onChange={this.handleSubmitInput}
							onBlur={this.handleSubmitInput}
							style={{ width: '50%' }} />
					)}
				</Item>
			</Form>
		);
	}
}
export default Form.create()(withPropsAPI(DataFilter));