import React, { Fragment } from 'react';
import { Form, Select, Tooltip, Icon, Row, Col } from 'antd';

const { Item } = Form;
const { Option } = Select;

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

class ChooseColStyle extends React.Component {

    render() {
        const { getFieldDecorator, index, id, attributes, getFieldValue } = this.props;

        if (attributes === undefined || attributes[index] === undefined || attributes[index].styleType === undefined) return <Fragment></Fragment>

        if (attributes[index].styleType === 'ChooseCol') {
            const anchor = getFieldValue('anchor');
            var children = [];
            if (anchor !== undefined && anchor[0] !== undefined) {
                for (let i = 0; i < Number(anchor[0]); i++) {
                    children.push(
                        <Option value={`${i}`}>{i}</Option>
                    )
                }
            }
            return (
                <Row >
                    <Col span={4}></Col>
                    <Col span={8}>
                        <Item
                            label={
                                <span>可多选&nbsp;
                                <Tooltip title="是否可以选择多列？">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                            {...formItemLayout}
                            key={`${id}_0`}
                        >
                            {getFieldDecorator(`attributes[${index}][style][multiCol]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "是否可以选择多列？",
                                    },
                                ],
                            })(<Select>
                                <Option value="true">true</Option>
                                <Option value="false">false</Option>
                            </Select>)}
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            label={
                                <span>锚点源头&nbsp;
                                <Tooltip title="这个选择字段是从上方第几个输出的锚点取值？该选项需要先填写上方的上锚点个数才能够选择">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                            {...formItemLayout}
                            key={`${id}_1`}
                        >
                            {getFieldDecorator(`attributes[${index}][style][sourceAnchor]`, {
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
                            })(<Select>
                                {children}
                            </Select>)}
                        </Item>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            );
        }
        else return <Fragment></Fragment>
    }
}

export default ChooseColStyle;