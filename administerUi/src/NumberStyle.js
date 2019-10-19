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

        if (attributes[index].styleType === 'Number')
            return (
                <Row key={`${index}_0`}>
                    <Col span={6} >
                        <Item
                            label="最小值"
                            {...formItemLayout}
                            key={`${id}_0`}
                        >
                            {getFieldDecorator(`attributes[${index}][style][min]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        type: 'string',
                                        pattern: /^[0-9]+.?[0-9]*/,
                                        message: '请输入合法的数字!',
                                    },
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "可接受的最小值",
                                    },
                                ],
                            })(<Input></Input>)}
                        </Item>
                    </Col>
                    <Col span={6} >
                        <Item
                            label="最大值"
                            {...formItemLayout}
                            key={`${id}_1`}
                        >
                            {getFieldDecorator(`attributes[${index}][style][max]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        type: 'string',
                                        pattern: /^[0-9]+.?[0-9]*/,
                                        message: '请输入合法的数字!',
                                    },
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "可接受的最大值",
                                    },
                                ],
                            })(<Input></Input>)}
                        </Item>
                    </Col>
                    <Col span={6} >
                        <Item
                            label={
                                <span>步长&nbsp;
                                <Tooltip title="使用时会以上下箭头来控制数字增长与减少，例如步长设为0.1则每次按上箭头数字增加0.1">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                            {...formItemLayout}
                            key={`${id}_2`}
                        >
                            {getFieldDecorator(`attributes[${index}][style][step]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        type: 'string',
                                        pattern: /^[0-9]+.?[0-9]*/,
                                        message: '请输入合法的数字!',
                                    },
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "数字类型的增加长度",
                                    },
                                ],
                            })(<Input></Input>)}
                        </Item>
                    </Col>
                    <Col span={6} >
                        <Item
                            label="默认值"
                            {...formItemLayout}
                            key={`${id}_3`}
                        >
                            {getFieldDecorator(`attributes[${index}][value]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        type: 'string',
                                        pattern: /^[0-9]+.?[0-9]*/,
                                        message: '请输入合法的数字!',
                                    },
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "数字类型的默认值",
                                    },
                                ],
                            })(<Input></Input>)}
                        </Item>
                    </Col>
                </Row>
            );
        else return <Fragment></Fragment>
    }
}

export default NumberStyle;