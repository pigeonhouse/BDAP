import React, { Fragment } from 'react';
import { Form, Input, Tooltip, Icon } from 'antd';

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

class NumberStyle extends React.Component {

    render() {
        const { getFieldDecorator, index, id, attributes } = this.props;

        if (attributes === undefined || attributes[index] === undefined || attributes[index].styleType === undefined) return <Fragment></Fragment>

        if (attributes[index].styleType === 'Number')
            return (
                <Fragment>
                    <Item
                        label="范围最小值"
                        {...formItemLayout}
                        required={false}
                        key={`${id}_0`}
                    >
                        {getFieldDecorator(`attributes[${index}][style][min]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "数字类型可选的最小值",
                                },
                            ],
                        })(<Input></Input>)}
                    </Item>
                    <Item
                        label="范围最大值"
                        {...formItemLayout}
                        required={false}
                        key={`${id}_1`}
                    >
                        {getFieldDecorator(`attributes[${index}][style][max]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "数字类型可选的最大值",
                                },
                            ],
                        })(<Input></Input>)}
                    </Item>
                    <Item
                        label={
                            <span>步长&nbsp;
                                <Tooltip title="数字类型的增加长度，步长为1，则每次增加1">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                        {...formItemLayout}
                        required={false}
                        key={`${id}_2`}
                    >
                        {getFieldDecorator(`attributes[${index}][style][step]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "数字类型的增加长度",
                                },
                            ],
                        })(<Input></Input>)}
                    </Item>
                    <Item
                        label="默认值"
                        {...formItemLayout}
                        required={false}
                        key={`${id}_3`}
                    >
                        {getFieldDecorator(`attributes[${index}][value]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "数字类型的默认值",
                                },
                            ],
                        })(<Input></Input>)}
                    </Item>
                </Fragment>
            );
        else return <Fragment></Fragment>
    }
}

export default NumberStyle;