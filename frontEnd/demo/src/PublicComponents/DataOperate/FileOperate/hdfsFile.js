import React, { Component } from 'react';
import { Button, TreeSelect, Form, Modal } from 'antd'
import { withPropsAPI } from '@src';
import { Stat } from '../DataToolFunctions/Stat';
import { fetchTool } from '../../../FetchTool';
import DragM from "dragm";
/**
 * hdfs文件上传
 */


class BuildModalTitle extends React.Component {
	updateTransform = transformStr => {
		this.modalDom.style.transform = transformStr;
	};
	componentDidMount() {
		this.modalDom = document.getElementsByClassName(
			"ant-modal-wrap" //modal的class是ant-modal-wrap
		)[0];
	}
	render() {
		const { title } = this.props;
		return (
			<DragM updateTransform={this.updateTransform}>
				<div>{title}</div>
			</DragM>
		);
	}
}
class HdfsFile extends Component {
	state = {
		inpValue: '',
		oppositePath: '/',
		treeData: [],
		fileModalVisible: false
	}
	showModal = () => {
		this.setState({
			fileModalVisible: true
		});
	};
	handleOk = e => {
		this.setState({
			fileModalVisible: false
		});
	};
	handleCancel = e => {
		this.setState({
			fileModalVisible: false
		});
	};
	async componentWillMount() {
		const { propsAPI } = this.props;
		const { getSelected } = propsAPI;
		const item = getSelected()[0];
		const model = item.getModel();
		const inpValu = model.labelName.label || '';
		this.setState({ inpValu });

		let formData = new FormData();
		formData.append('oppositePath', this.state.oppositePath)
		const init = {
			method: 'POST',
			body: formData,
			mode: 'cors'
		}

		const res = await fetchTool("/hdfs/getfilelist", init);

		if (res.code === 201) {
			let treeData = res.data;
			let index = 0;
			for (let item in treeData) {
				let fileItem = treeData[item]
				if (!fileItem['isDir'] && fileItem['filename']) {
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
	}

	handleChange = (v, label, e) => {
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

	handleSearch = (e) => {
		console.log("搜索");
	}

	// handleSelect = (v,node,ex)=>{
	// 	let value = node.props.title
	// 	this.setState({value})
	// }

	submit = async () => {
		const init = {
			method: 'POST',
			body: this.state.inpValu,
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
		}
		const { propsAPI } = this.props;
		const { getSelected, update } = propsAPI;

		const respData = await fetchTool("/handleInput", init);

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
	}

	render() {
		const { treeData, inpValue } = this.state;
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const title = <BuildModalTitle title="查看HDFS文件" />;
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

					<Button onClick={() => this.showModal()}>查看HDFS文件</Button>
					<Modal title={title}
						visible={this.state.fileModalVisible}
						centered
						onOk={this.handleOk}
						onCancel={this.handleCancel}
						footer={[
							<Button >
								标注为常用文件
            				</Button>,
							<Button >
								确定
		  					</Button>,
							<Button>
								取消
		  					</Button>,
						]}
					>
						<p>{this.state.text}</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
				</Form.Item>
			</Form>
		)
	}
}
export default Form.create()(withPropsAPI(HdfsFile));