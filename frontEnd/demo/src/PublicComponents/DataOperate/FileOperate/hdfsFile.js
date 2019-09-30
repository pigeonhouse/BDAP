import React, { Component } from 'react';
import { Button, TreeSelect, Form } from 'antd'
import { withPropsAPI } from '@src';
import { Stat } from '../DataToolFunctions/Stat'

/**
 * hdfs文件上传
 */

class HdfsFile extends Component {
	state = {
		inpValu: '',
		oppositePath:'/',
		treeData: []
	}

	componentWillMount() {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const model = item.getModel();
		const inpValu = model.attr.fileName || '';
		this.setState({ inpValu });

		let formData = new FormData();
		formData.append('oppositePath', this.state.oppositePath)
		const init = {
			method: 'POST',
			body: formData,
			mode:'cors'
		}

		fetch('https://result.eolinker.com/MSwz6fu34b763a21e1f7efa84a86a16f767a756952d0f95?uri=localhost:8888/hdfs/getfilelist',init).then(res=>{
			if(res.status === 200){
				res.json().then(res=>{
					if(res.code === 201){
						let treeData = res.data;
						let index = 0;
						for(let item in treeData){
							let fileItem = treeData[item]
							if (!fileItem['isDir'] && fileItem['filename']){
								let file = {
									title: fileItem.filename,
									value: `0-${index}`,
									key: `0-${index}`
								}
								this.setState({
									treeData: [...this.state.treeData, file]
								});
								index++;
							}
						}
					}
				})
			}
		})
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

	handleSearch = (e) =>{
		console.log("搜索");
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
							labelArray: labelArray,

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
		const { treeData } = this.state;
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
					{getFieldDecorator('attr.fileName', {
						initialValue: this.state.inpValu
					})(
						<TreeSelect
							showSearch
							style={{ width: 150 }}
							value={this.state.value}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							treeData={treeData}
							placeholder="Please select"
							treeDefaultExpandAll
							onChange={this.handleChange}
							//  loadData={this.onLoadData}
							onSearch={this.handleSearch}
						/>
					)}
					<Button onClick={() => this.submit()}>confirm</Button>
				</Form.Item>
			</Form>
		)
	}
}
export default Form.create()(withPropsAPI(HdfsFile));