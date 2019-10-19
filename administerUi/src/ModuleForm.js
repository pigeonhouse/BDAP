import React, { Fragment } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Button, Divider } from 'antd';
import NumberStyle from './NumberStyle';
import SelectStyle from './SelectStyle';
import CheckBoxStyle from './CheckBoxStyle';
import ChooseColStyle from './ChooseColStyle';
import InputStyle from './InputStyle';

const { Option } = Select;
const { Item } = Form;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

let id = 0;

class ModuleForm extends React.Component {

	removeAttribute = k => {
		const { getFieldValue, setFieldsValue } = this.props.form;
		const keys = getFieldValue('keys');
		setFieldsValue({
			keys: keys.filter(key => key !== k),
		});
	};

	addAttribute = () => {
		const { getFieldValue, setFieldsValue } = this.props.form;
		const keys = getFieldValue('keys');
		const nextKeys = keys.concat(id++);

		setFieldsValue({
			keys: nextKeys,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.setState({ values })
			}
		});
	};

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;

		getFieldDecorator('keys', { initialValue: [] });
		// getFieldDecorator('attributes', { initialValue: [] });

		const keys = getFieldValue('keys');
		const attributes = getFieldValue('attributes');

		const formItems = keys.map((k, index) => {
			// getFieldDecorator(`attributes[${index}]`, { initialValue: {} });
			// getFieldDecorator(`attributes[${index}][styleType]`, { initialValue: '' });
			// getFieldDecorator(`attributes[${index}][labelName][label]`, { initialValue: '' });
			// getFieldDecorator(`attributes[${index}][labelName][elabel]`, { initialValue: '' });
			// getFieldDecorator(`attributes[${index}][valueType]`, { initialValue: '' });

			return <Fragment key={k} >
				<Divider></Divider>
				<Item
					label={
						<span>参数属性&nbsp;
							<Tooltip title="模块参数设置">
								<Icon type="question-circle-o" />
							</Tooltip>
						</span>
					}
					{...formItemLayout}
					required={false}
					key={k + '_0'}
				>
					{getFieldDecorator(`attributes[${index}][styleType]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [
							{
								required: true,
								whitespace: true,
								message: "请选择属性类型",
							},
						],
					})(<Select>
						<Option value="Select">下拉菜单</Option>
						<Option value="Input">输入框</Option>
						<Option value="Number">数字范围</Option>
						<Option value="CheckBox">单选框</Option>
						<Option value="ChooseCol">选择字段</Option>
					</Select>)}
				</Item>
				<Item
					label="属性中文名"
					{...formItemLayout}
					required={false}
					key={k + '_1'}
				>
					{getFieldDecorator(`attributes[${index}][labelName][label]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [
							{
								required: true,
								whitespace: true,
								message: "该属性的中文名",
							},
						],
					})(<Input></Input>)}
				</Item>
				<Item
					label="属性英文名"
					{...formItemLayout}
					required={false}
					key={`${k}_2`}
				>
					{getFieldDecorator(`attributes[${index}][labelName][elabel]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [
							{
								required: true,
								whitespace: true,
								message: "该属性的英文名",
							},
						],
					})(<Input></Input>)}
				</Item>
				<Item
					label="属性类型"
					{...formItemLayout}
					required={false}
					key={`${k}_3`}
				>
					{getFieldDecorator(`attributes[${index}][valueType]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [
							{
								required: true,
								whitespace: true,
								message: "该属性的类型",
							},
						],
					})(<Select>
						<Option value="String">String</Option>
						<Option value="Boolean">Boolean</Option>
						<Option value="Int">Int</Option>
						<Option value="Double">Double</Option>
						<Option value="Array[String]">Array[String]</Option>
					</Select>)}
				</Item>

				<NumberStyle
					id={`${k}_4`}
					index={index}
					attributes={attributes}
					getFieldDecorator={getFieldDecorator}
				/>

				<SelectStyle
					id={`${k}_4`}
					index={index}
					attributes={attributes}
					getFieldDecorator={getFieldDecorator}
					getFieldValue={getFieldValue}
					form={this.props.form}
				/>

				<CheckBoxStyle
					id={`${k}_4`}
					index={index}
					attributes={attributes}
					getFieldDecorator={getFieldDecorator}
				/>

				<ChooseColStyle
					id={`${k}_4`}
					index={index}
					attributes={attributes}
					getFieldDecorator={getFieldDecorator}
					getFieldValue={getFieldValue}
				/>

				<InputStyle
					id={`${k}_4`}
					index={index}
					attributes={attributes}
					getFieldDecorator={getFieldDecorator}
				/>

				<Icon
					className="dynamic-delete-button"
					type="minus-circle-o"
					onClick={() => this.removeAttribute(k)}
				/>
			</Fragment>
		});

		return (
			<Row>
				<Col span={7} ></Col>
				<Col span={10} >
					<Form {...formItemLayout} onSubmit={this.handleSubmit}>
						<Item label="模块中文名" {...formItemLayout} >
							{getFieldDecorator('labelName[label]', {
								rules: [
									{
										required: true,
										message: '请输入算法中文名!',
									},
								],
							})(<Input />)}
						</Item>

						<Item label="模块英文名" {...formItemLayout} >
							{getFieldDecorator('labelName[elabel]', {
								rules: [
									{
										type: 'string',
										pattern: /^[a-z,A-Z]+$/,
										message: '请输入合法的英文名!',
									},
									{
										required: true,
										message: '请输入模块英文名!',
									},
								],
							})(<Input />)}
						</Item>

						<Item label="所在分组" {...formItemLayout} >
							{getFieldDecorator('groupName[elabel]', {
								rules: [
									{ required: true, message: '请选择分组!' },
								],
							})(<Select>
								<Option value="preprocessing">数据预处理</Option>
								<Option value="machinelearning">机器学习</Option>
								<Option value="prediction">预测</Option>
								<Option value="evaluation">模型评估</Option>
							</Select>)}
						</Item>

						<Item label={
							<span>上锚点个数&nbsp;
                				<Tooltip title="模块有几个输入？">
									<Icon type="question-circle-o" />
								</Tooltip>
							</span>
						}
							{...formItemLayout}
						>
							{getFieldDecorator('anchor[0]', {
								rules: [
									{ required: true, message: '请选择上锚点个数!' },
								],
							})(<Select>
								<Option value="0">0</Option>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
							</Select>)}
						</Item>

						<Item label={
							<span>下锚点个数&nbsp;
                				<Tooltip title="模块有几个输出？">
									<Icon type="question-circle-o" />
								</Tooltip>
							</span>
						} {...formItemLayout}
						>
							{getFieldDecorator('anchor[1]', {
								rules: [
									{ required: true, message: '请选择下锚点个数!' },
								],
							})(<Select>
								<Option value="0">0</Option>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
							</Select>)}
						</Item>

						{formItems}

						<Button type="dashed" onClick={this.addAttribute} style={{ width: '100%' }}>
							<Icon type="plus" /> 增加属性
              			</Button>

						<Button type="primary" htmlType="submit">
							确认无误，提交
           				</Button>
					</Form>
				</Col>
				<Col span={7} ></Col>
			</Row>

		);
	}
}

const ModuleAddingForm = Form.create({ name: 'register' })(ModuleForm);

export default ModuleAddingForm