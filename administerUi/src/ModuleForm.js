import React from 'react';
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
		sm: { span: 12 },
	},
};

let id = 0;

class ModuleForm extends React.Component {
	state = {
		json: ''
	}

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

	handleSelectChange = (index, value) => {
		const { setFieldsValue, getFieldValue } = this.props.form;
		let attributes = getFieldValue('attributes');
		attributes[index].value = undefined;
		setFieldsValue({
			attributes
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let model = {
					labelName: values.labelName,
					groupName: this.switchGroupName(values.groupName),
					anchor: values.anchor,
					attributes: this.switchAttributes(values.attributes),
				}
				this.setState({ json: JSON.stringify(model) })
			}
		});
	};

	switchAttributes = (attr) => {
		let attributes = new Array();
		if (attr === undefined) return attributes;
		attr.map((attribute) => {
			if (attribute.styleType === 'Select' || attribute.styleType === 'Number' || attribute.styleType === 'Input') {
				attributes.push({
					labelName: attribute.labelName,
					valueType: attribute.valueType,
					style: attribute.style,
					styleType: attribute.styleType,
					value: attribute.value,
				})
			}
			else if (attribute.styleType === 'CheckBox') {
				attributes.push({
					labelName: attribute.labelName,
					valueType: attribute.valueType,
					style: null,
					styleType: attribute.styleType,
					value: attribute.value,
				})
			}
			else if (attribute.styleType === 'ChooseCol') {
				attributes.push({
					labelName: attribute.labelName,
					valueType: attribute.valueType,
					style: attribute.style,
					styleType: attribute.styleType,
					value: null,
				})
			}
		})
		return attributes;
	}

	switchGroupName = (group) => {
		let groupName = {};
		groupName.elabel = group.elabel;
		switch (group.elabel) {
			case 'preprocessing': groupName.label = '数据预处理'; break;
			case 'machinelearning': groupName.label = '机器学习'; break;
			case 'prediction': groupName.label = '预测'; break;
			case 'evaluation': groupName.label = '模型评估'; break;
		}
		return groupName;
	}

	spacePlus = (space) => {
		let jsonFormat = '';
		for (let j = 0; j < space; j++) {
			jsonFormat += '&nbsp;&nbsp;';
		}
		return jsonFormat;
	}

	onSubmit = () =>{
		console.log(this.state.json);

		fetch('http://10.105.222.93:7777/module',{
			method:"PUT",
			headers: {
    		'Content-Type': 'application/json',
			},
			body:this.state.json
		}).then((res)=>{
			if (res.ok){
				console.log("ok")
				alert("提交成功")
			}else{
				alert("提交失败，请先生成json并确认后再次提交。\n如果还是不成功请联系薛啸岳。")
			}
  			})

	}


	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;

		getFieldDecorator('keys', { initialValue: [] });
		const keys = getFieldValue('keys');
		const attributes = getFieldValue('attributes');

		const formItems = keys.map((k, index) => {

			return <Row key={k} >
				<Divider></Divider>
				<Row type="flex" justify="space-around" align="middle">
				<Col span={5} >
					<Item
						label={
							<span>参数类型&nbsp;
								<Tooltip title="希望在前端展示成什么形式？">
									<Icon type="question-circle-o" />
								</Tooltip>
							</span>
						}
						{...formItemLayout}
						key={k + '_0'}
					>
						{getFieldDecorator(`attributes[${index}][styleType]`, {
							validateTrigger: ['onChange', 'onBlur'],
							rules: [
								{
									required: true,
									whitespace: true,
									message: "请选择参数类型",
								},
							],
						})(<Select onChange={this.handleSelectChange.bind(this, index)} >
							<Option value="Select">下拉菜单</Option>
							<Option value="Input">输入框</Option>
							<Option value="Number">数字范围</Option>
							<Option value="CheckBox">单选框</Option>
							<Option value="ChooseCol">选择字段</Option>
						</Select>)}
					</Item>
				</Col>
				<Col span={5} >
					<Item
						label="参数中文名"
						{...formItemLayout}
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
				</Col>
				<Col span={5} >
					<Item
						label="参数英文名"
						{...formItemLayout}
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
				</Col>
				<Col span={5} >
					<Item
						label={							
							<span>参数属性&nbsp;
								<Tooltip title="这个参数在你的scala代码中是什么类型的？(若为选择字段，该项必须选择Array[String])">
									<Icon type="question-circle-o" />
								</Tooltip>
							</span>
						}
						{...formItemLayout}
						key={`${k}_3`}
					>
						{getFieldDecorator(`attributes[${index}][valueType]`, {
							validateTrigger: ['onChange', 'onBlur'],
							rules: [
								{
									required: true,
									whitespace: true,
									message: "该参数的类型",
								},
							],
						})(
							<Select>
								<Option value="String">String</Option>
								<Option value="Boolean">Boolean</Option>
								<Option value="Int">Int</Option>
								<Option value="Double">Double</Option>
								<Option value="Array[String]">Array[String]</Option>
							</Select>
						)}
					</Item>
					
				</Col>

				<Col span={1}></Col>

				<Col>
					<Icon
						className="dynamic-delete-button"
						type="close"
						onClick={() => this.removeAttribute(k)}
					/>
				</Col>

				</Row>

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
			</Row>
		});

		const { json } = this.state;
		var jsonFormat = '';
		let space = 0;
		for (let i in json) {
			if (json[i] === '{' || json[i] === '[') {
				space += 2;
				jsonFormat += json[i] + '<br />' + this.spacePlus(space);
			}
			else if (json[i] === ',') {
				jsonFormat += json[i] + '<br />' + this.spacePlus(space);
			}
			else if (json[i] === '}' || json[i] === ']') {
				space -= 2;
				jsonFormat += '<br />' + this.spacePlus(space) + json[i];
			}
			else if (json[i] === ':') {
				jsonFormat += json[i] + this.spacePlus(1);
			} else {
				jsonFormat += json[i];
			}
		}

		return (
			<div style={{ paddingTop: '100px' }} >
				<Row >
					<Col span={1}></Col>
					<Col span={22}>
						<Form onSubmit={this.handleSubmit}>
							<Row>
								<Col span={8}>
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
								</Col>
								<Col span={8}>
									<Item label="模块英文名" {...formItemLayout} >
										{getFieldDecorator('labelName[elabel]', {
											rules: [
												{
													required: true,
													message: '请输入模块英文名!',
												},
											],
										})(<Input />)}
									</Item>
								</Col>
								<Col span={8}>
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
								</Col>
							</Row>
							<Row>
								<Col span={8}>
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
								</Col>
								<Col span={8}>
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
								</Col>
								<Col span={8}>
									<Button type="dashed" onClick={this.addAttribute} style={{ marginLeft: "50px", width: '80%' }}>
										<Icon type="plus" /> 增加属性
              						</Button>
								</Col>
							</Row>
							{formItems}
							
							<Divider></Divider>
							<div dangerouslySetInnerHTML={{ __html: jsonFormat }}></div>
							<Button type="primary" htmlType="submit">
								生成json预览
							</Button>

							<Divider></Divider>

							<Button type="danger" onClick={()=>this.onSubmit()}>
								确认无误，提交
							</Button>
						</Form>
						

					</Col>
					<Col span={1}></Col>
				</Row>
			</div >
		);
	}
}

const ModuleAddingForm = Form.create({ name: 'register' })(ModuleForm);

export default ModuleAddingForm