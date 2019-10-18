import React, { Fragment } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Button } from 'antd';

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
	state = {
		confirmDirty: false,
		autoCompleteResult: [],
	};

	removeAttribute = k => {
		const { form } = this.props;
		const attributes = form.getFieldValue('attributes');
		if (attributes.length === 1) {
			return;
		}

		form.setFieldsValue({
			attributes: attributes.filter(attribute => attribute !== k),
		});
	};

	addAttribute = () => {
		const { form } = this.props;
		const attributes = form.getFieldValue('attributes');
		const nextKeys = attributes.concat(id++);
		form.setFieldsValue({
			attributes: nextKeys,
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

		getFieldDecorator('attributes', { initialValue: [] });
		const attributes = getFieldValue('attributes');
		const formItems = attributes.map((attribute, index) => (
			<Fragment>

				<Item
					label={index === 0 ? 'Passengers' : ''}
					required={false}
					key={attribute}
				>
					{getFieldDecorator(`names[${attribute}]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [
							{
								required: true,
								whitespace: true,
								message: "Please input passenger's name or delete this field.",
							},
						],
					})(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
					
					{<Icon
						className="dynamic-delete-button"
						type="minus-circle-o"
						onClick={() => this.removeAttribute(attribute)}
					/>}
			
				</Item>

			</Fragment>

		));

		return (
			<Row>
				<Col span={7} ></Col>
				<Col span={10} >
					<Form {...formItemLayout} onSubmit={this.handleSubmit}>
						<Item label="模块中文名">
							{getFieldDecorator('label', {
								rules: [
									{
										required: true,
										message: '请输入算法中文名!',
									},
								],
							})(<Input />)}
						</Item>

						<Item label="模块英文名">
							{getFieldDecorator('elabel', {
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

						<Item label="所在分组">
							{getFieldDecorator('groupName', {
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
						}>
							{getFieldDecorator('anchor_top', {
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
						}>
							{getFieldDecorator('anchor_bottom', {
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

						<Item {...tailFormItemLayout} >
							<Button type="dashed" onClick={this.addAttribute} style={{ width: '100%' }}>
								<Icon type="plus" /> 增加属性
              				</Button>
						</Item>

						<Item {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit">
								确认无误，提交
           					</Button>
						</Item>
					</Form>
				</Col>
				<Col span={7} ></Col>
			</Row>

		);
	}
}

const ModuleAddingForm = Form.create({ name: 'register' })(ModuleForm);

export default ModuleAddingForm