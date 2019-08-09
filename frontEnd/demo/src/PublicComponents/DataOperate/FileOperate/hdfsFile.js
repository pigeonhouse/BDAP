import React, { Component } from 'react';
import { Button, Input, Form } from 'antd'
import { withPropsAPI } from '@src';
import { Stat } from '../DataToolFunctions/stat'

class HdfsFile extends Component {
	state = {
		inpValu: ''
	}
	componentWillMount() {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const model = item.getModel();
		const inpValu = model.attr.fileName || '';
		this.setState({ inpValu });
	}
	handleChange = (e) => {
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
			executeCommand(() => {
				update(item, {
					...values
				});
			});
			this.setState({ inpValu: values.attr.fileName })
		});
	}

	submit = () => {
		const init = {
			method: 'POST',
			body: this.state.inpValu,
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
		}
		const { propsAPI } = this.props;
		const { getSelected, update } = propsAPI;

		fetch(
			'http://localhost:5000/handleInput', init
		)
			.then(response => {
				if (response.status === 200) {
					response.json().then((respData) => {
						let label = respData[0].colName;
						const data = respData.slice(1);
						var Dataset = new Array();
						for (let i in label) {
							var oneData = {};
							oneData['label'] = label[i];
							oneData['value'] = new Array();
							for (let j in data) {
								if (data[j].hasOwnProperty(label[i])) {
									oneData.value.push(data[j][label[i]])
								}
								else oneData.value.push(null)
							}
							Dataset.push(oneData);
						}
						var length = data.length;
						var labelArray = new Array();
						for (let i in label) {
							labelArray.push([label[i], false]);
						}
						const item = getSelected()[0];
						var values = {
							Dataset: Stat(Dataset),
							length,
							labelArray: { public: labelArray },

						}
						console.log('values')
						console.log(values)
						values['keyConfig'] = JSON.parse(JSON.stringify(item.model.keyConfig));
						values.keyConfig.state_icon_url = 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg';
						update(item, { ...values });
					})
				}
			})
			.catch(e => console.log('错误:', e))
	}

	render() {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const inlineFormItemLayout = {
			labelCol: {
				sm: { span: 8 },
			},
			wrapperCol: {
				sm: { span: 16 },
			},
		};
		return (
			<Form onSubmit={this.handleChange}>
				<Form.Item label="location" {...inlineFormItemLayout}>
					{
						getFieldDecorator('attr.fileName', {
							initialValue: this.state.inpValu
						})(
							<Input onBlur={this.handleChange} />
						)}
					<Button onClick={() => this.submit()}>confirm</Button>
				</Form.Item>
			</Form>
		)
	}
}
export default Form.create()(withPropsAPI(HdfsFile));
