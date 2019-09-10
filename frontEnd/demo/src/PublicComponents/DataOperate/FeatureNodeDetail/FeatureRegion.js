import React, { Component } from 'react'
import { withPropsAPI } from '@src';
import { Form, Icon, Button, Select, InputNumber, Input, Row, Col, Tooltip } from 'antd'
import './feature.less'
const { Item } = Form;
const Option = Select.Option;
class FeatureRegion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupingType: "normal",
			region: [[]]
		}
	}
	componentWillMount() {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const attr = item.model.attr;
		if (attr[this.props.tag]) {
			this.setState({
				groupingType: attr[this.props.tag][0]
			})
		}
	}
	componentDidMount() {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const attr = item.model.attr;
		if (attr[this.props.tag] && attr[this.props.tag][0] === 'user-defined') {
			this.setState({ region: attr[this.props.tag].slice(1) })
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.tag !== this.props.tag) {
			const { propsAPI } = this.props;
			const { getSelected } = propsAPI;
			const item = getSelected()[0];
			const attr = item.model.attr;

			if (attr[nextProps.tag]) {
				this.setState({
					groupingType: attr[nextProps.tag][0]
				})
				if (attr[nextProps.tag][0] === 'user-defined') {
					this.setState({ region: attr[nextProps.tag].slice(1) })
				}
				else {
					this.setState({ region: [[]] })
				}
			}
			else {
				this.setState({
					groupingType: "normal",
					region: [[]]
				})
			}
		}
	}
	handleSubmit1 = (value) => {
		const { propsAPI } = this.props;
		const { getSelected, executeCommand, update } = propsAPI;
		const item = getSelected()[0];
		if (!item) {
			return;
		}
		const attr = item.model.attr;
		attr[this.props.tag] = ['normal', value];
		executeCommand(() => {
			update(item, { attr });
		});
	}
	handleSubmit2 = (e) => {
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
			let attr = item.model.attr;
			const tag = this.props.tag;
			for (let i in values.value) {
				attr[tag][Number(i) + 1] = [
					values.value[i] ? Number(values.value[i]) : null,
					values.min[i] ? Number(values.min[i]) : null,
					values.max[i] ? Number(values.max[i]) : null];
			}
			executeCommand(() => {
				update(item, { attr });
			});
			this.setState({
				region: attr[tag].slice(1)
			})
		});
	}
	// handleSubmitInput=(e)=>{
	//   e.preventDefault();

	//   const { form, propsAPI } = this.props;
	//   const { getSelected, executeCommand, update } = propsAPI;

	//   form.validateFieldsAndScroll((err, values) => {
	//     if (err) {
	//       return;
	//     }
	//     const item = getSelected()[0];
	//     if (!item) {
	//       return;
	//     }
	//     let attr = item.model.attr;
	//     const tag = this.props.tag;
	//     attr[`${tag}Default`] = values.defaultName;
	//     executeCommand(() => {
	//       update(item,{attr});
	//     });
	//   });
	// }
	add = () => {
		const { propsAPI } = this.props;
		const { getSelected, executeCommand, update } = propsAPI;
		const item = getSelected()[0];
		let attr = item.model.attr;
		const tag = this.props.tag;
		attr[tag].push([]);
		executeCommand(() => {
			update(item, { attr: attr });
		});
		this.setState({
			region: attr[tag].slice(1)
		})
	}
	remove = (index) => {
		const { propsAPI, form } = this.props;
		const { getSelected, executeCommand, update } = propsAPI;
		const item = getSelected()[0];
		let attr = JSON.parse(JSON.stringify(item.model.attr));
		attr[this.props.tag].splice(index + 1, 1);
		executeCommand(() => {
			update(item, { attr: attr });
		});
		const region = attr[this.props.tag].slice(1);
		for (let i in region) {
			let value = `value[${i}]`;
			let max = `max[${i}]`;
			let min = `min[${i}]`;
			let values = {};
			values[value] = region[i][0];
			values[min] = region[i][1];
			values[max] = region[i][2];
			form.setFieldsValue({
				...values
			})
		}
		this.setState((prevState) => ({
			region: prevState.region.splice(index, 1)
		}))
	}
	isGroupingType = () => {
		const { propsAPI } = this.props;
		const { getSelected, executeCommand, update } = propsAPI;
		const item = getSelected()[0];
		let attr = JSON.parse(JSON.stringify(item.model.attr));
		const tag = this.props.tag;
		if (this.state.groupingType === 'normal') {
			let groupvalue = 3;
			if (attr[tag] && attr[tag][0] === 'normal') {
				groupvalue = attr[tag][1];
			}
			else {
				attr[tag] = ['normal', 3];
			}
			executeCommand(() => {
				update(item, { attr: attr });
			});
			return <div>
				组数：&nbsp;&nbsp;&nbsp;
        <InputNumber
					min={2}
					max={10}
					defaultValue={groupvalue}
					style={{ margin: 10, width: '65%', marginBottom: 0 }}
					onChange={this.handleSubmit1} />
			</div>
		}
		else if (this.state.groupingType === 'user-defined') {
			const { getFieldDecorator } = this.props.form;
			let region;
			if (attr[tag]) {
				if (attr[tag][0] === 'user-defined') {
					region = attr[tag].slice(1);
				}
				else {
					attr[tag] = ['user-defined', []];
					executeCommand(() => {
						update(item, { attr: attr });
					});
					region = attr[tag].slice(1);
				}
			}
			else {
				region = this.state.region;
			}
			return <Form>
				{region.map((item, index) => {
					return (
						<Row>

							<Col span={7}>
								<Tooltip title='转化后的值' mouseLeaveDelay="0.1"><div>
									<Item
										style={{ margin: 0 }}
										required={false}
										key={index * 4}
									>
										{getFieldDecorator(`value[${index}]`, item[0] !== null ? {
											// rules:[{
											//   required:false,
											//   pattern: new RegExp(/^[0-9]+.?[0-9]*/, "g"),
											//   message: '请输入数字'
											// }],
											initialValue: item[0]
										} : {
												// rules:[{
												//   required:false,
												//   pattern: new RegExp(/^[0-9]+.?[0-9]*/, "g"),
												//   message: '请输入数字'
												// }],
											})(
												// <Tooltip title='转化后的值' mouseLeaveDelay="0.1">
												<Input
													placeholder='value'
													onChange={this.handleSubmit2}
													onBlur={this.handleSubmit2}
												/>
												// {/* </Tooltip> */}
											)}
									</Item></div></Tooltip>

							</Col>
							<Col span={7}>
								<Tooltip title='转化下界' mouseLeaveDelay="0.1">
									<div>
										<Item
											style={{ margin: 0 }}
											required={false}
											key={index * 4 + 1}
										>
											{getFieldDecorator(`min[${index}]`, item[1] !== null ? {
												// rules:[{
												//   required:false,
												//   pattern: new RegExp(/^[0-9]+.?[0-9]*/, "g"),
												//   message: '请输入数字'
												// }],
												initialValue: item[1]
											} : {
													// rules:[{
													//   required:false,
													//   pattern: new RegExp(/^[0-9]+.?[0-9]*/, "g"),
													//   message: '请输入数字'
													// }],
												})(
													// 
													<Input
														placeholder='min'
														onChange={this.handleSubmit2}
														onBlur={this.handleSubmit2}
													/>
													// </Tooltip>
												)}
										</Item></div></Tooltip>
							</Col>
							<Col span={7}>
								<Tooltip title='转化上界' mouseLeaveDelay="0.1"><div>
									<Item
										style={{ margin: 0 }}
										required={false}
										key={index * 4 + 2}
									>
										{getFieldDecorator(`max[${index}]`, item[2] !== null ? {
											// rules:[{
											//   required:false,
											//   pattern: new RegExp(/^[0-9]+.?[0-9]*/, "g"),
											//   message: '请输入数字'
											// }],
											initialValue: item[2]
										} : {
												// rules:[{
												//   required:false,
												//   pattern: new RegExp(/^[0-9]+.?[0-9]*/, "g"),
												//   message: '请输入数字'
												// }],
											})(
												// <Tooltip title='转化上界' mouseLeaveDelay="0.1">
												<Input
													placeholder='max'
													onChange={this.handleSubmit2}
													onBlur={this.handleSubmit2}
												/>
												// </Tooltip>
											)}
									</Item></div></Tooltip>
							</Col>
							<Col span={3}>
								<Item
									style={{ margin: 0 }}
									required={false}
									key={index * 4 + 3}
								>
									<Tooltip title='删除此项' mouseLeaveDelay="0.1">
										<Icon
											className="dynamic-delete-button"
											type="minus-circle-o"
											onClick={() => this.remove(index)}
											style={{ cursor: 'pointer' }}
										/>
									</Tooltip>
								</Item>
							</Col>
						</Row>
					);
				})}
				<Item>
					<Tooltip title='增加项' mouseLeaveDelay="0.1">
						<Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
							<Icon type="plus" /> Add group
            </Button>
					</Tooltip>
				</Item>
			</Form>
		}
	}
	handleChange = (value) => {
		if (this.state.groupingType !== value) {
			this.setState({
				groupingType: value
			})
		}
	}
	render() {
		return (
			<div>
				分组方式:&nbsp;&nbsp;&nbsp;
        <Select value={this.state.groupingType} style={{ width: 140 }} onChange={this.handleChange}>
					<Option value="normal">顺序分组</Option>
					<Option value="user-defined">自定义分组</Option>
				</Select>
				{this.isGroupingType()}
			</div>
		);
	}
}
export default Form.create()(withPropsAPI(FeatureRegion));