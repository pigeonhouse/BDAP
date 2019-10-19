import React, { Fragment } from 'react';
import { Form, Input, Icon, Select, Button } from 'antd';

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
let selectKeys = [];

class SelectStyle extends React.Component {
    state = {
        selectKeys: [],
    }

    removeSelect = k => {
        selectKeys = selectKeys.filter(selectKeys => selectKeys !== k);
        this.setState({ selectKeys })
    };

    addSelect = () => {
        selectKeys = selectKeys.concat(id++);
        this.setState({ selectKeys })
    };


    render() {
        const { getFieldDecorator, index, attributes, id } = this.props;

        if (attributes === undefined || attributes[index] === undefined || attributes[index].styleType === undefined) return <Fragment></Fragment>

        if (attributes[index].styleType === 'Select') {
            console.log(selectKeys)

            const children = selectKeys.map((k, kIndex) => (
                <Fragment key={k}>
                    <Item
                        label="可选值英文名"
                        {...formItemLayout}
                        key={`${k}_0`}
                    >
                        {getFieldDecorator(`attributes[${index}][style][menu][${kIndex}][elabel]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "请输入可选值英文名",
                                },
                            ],
                        })(<Input></Input>)}
                    </Item>
                    <Item
                        label="可选值中文名"
                        {...formItemLayout}
                        key={`${k}_1`}
                    >
                        {getFieldDecorator(`attributes[${index}][style][menu][${kIndex}][label]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "请输入可选值中文名",
                                },
                            ],
                        })(<Input></Input>)}
                    </Item>
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.removeSelect(k)}
                    />
                </Fragment>
            ))

            return (
                <Fragment>
                    {children}
                    <Item {...tailFormItemLayout} >
                        <Button type="dashed" onClick={this.addSelect} style={{ width: '100%' }}>
                            <Icon type="plus" /> 增加可选择值
              			</Button>
                    </Item>
                    <Item
                        label="默认值"
                        {...formItemLayout}
                        required={false}
                        key={id}
                    >
                        {getFieldDecorator(`attributes[${index}][value]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "请选择属性默认值",
                                },
                            ],
                        })(<Input></Input>)}
                    </Item>
                </Fragment>
            );
        } else {
            selectKeys = [];
            return <Fragment></Fragment>
        }
    }
}

export default SelectStyle;