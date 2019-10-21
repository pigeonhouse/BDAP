import React, { Fragment } from 'react';
import { Form, Input, Tooltip, Icon, Row, Col } from 'antd';

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

        if (attributes[index].styleType === 'Input')
            return (
                <Row key={id} >
                    <Col span={4} ></Col>
                    <Col span={8} >
                        <Item
                            label={
                                <span>正则式&nbsp;
						            <Tooltip title="输入值所满足的正则式">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                            {...formItemLayout}
                            key={`${id}_0`}
                        >
                            {getFieldDecorator(`attributes[${index}][style][regexp]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "输入值所满足的正则式",
                                    },
                                ],
                            })(<Input></Input>)}
                        </Item>

                    </Col>
                    <Col span={8} >
                        <Item
                            label="默认值"
                            {...formItemLayout}
                            key={`${id}_1`}
                        >
                            {getFieldDecorator(`attributes[${index}][value]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "默认值",
                                    },
                                ],
                            })(<Input></Input>)}
                        </Item>
                    </Col>
                    <Col span={4} ></Col>
            </Row>
            );
        else return <Fragment></Fragment>
    }
}

export default NumberStyle;