import React, { Component } from 'react'
import { Modal, Icon, Input, Form } from 'antd';
import { Command, withPropsAPI } from '@src';

import styles from '../index.less';

import { fetchTool } from '../../../FetchTool';

const { Item } = Form;
const inlineFormItemLayout = {
    labelCol: {
        sm: { span: 5 },
    },
    wrapperCol: {
        sm: { span: 19 },
    },
};

class ModelSaving extends Component {
    state = {
        visible: false,
        value: null
    }

    generateUUID = () => {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    handleOk = async (e) => {
        const { value } = this.state;
        const { propsAPI } = this.props;
        const { getSelected } = propsAPI;
        const item = getSelected()[0];

        const init = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                modelId: this.generateUUID(),
                name: value,
                elabel: item.getModel().labelName.elabel,
                algorithmType: item.getModel().algorithmType.elabel
            }),
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        }
        const url = `/experiment-service/flow/node/model/${item.id}`;
        const response = await fetchTool(url, init);

        if (response.status === 200) {
            this.props.addModel();
            
            this.setState({
                visible: false,
                value: null
            });
        }
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            value: null
        });
    }

    showModal = (e) => {
        this.setState({
            visible: true,
        });
    }

    changeValue = (e) => {
        e.preventDefault();
        const { form } = this.props;

        form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            this.setState({ value: values.value });
        });
    }

    render() {
        const { visible, value } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Command name="saveModel">
                    <div className={styles.item} onClick={this.showModal}>
                        <Icon type="form" />
                        <span>模型保存</span>
                    </div>
                </Command>
                <Modal
                    title="模型保存"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <Form>
                        <Item style={{ margin: 0 }} label='模型名称' {...inlineFormItemLayout}>
                            {
                                getFieldDecorator(`value`, {
                                    rules: [{
                                        required: true,
                                        message: '请输入名称'
                                    }],
                                    initialValue: value,
                                })(<Input
                                    placeholder="请输入保存的模型名称"
                                    style={{ margin: 0 }}
                                    onBlur={this.changeValue}
                                />)
                            }
                        </Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(withPropsAPI(ModelSaving));