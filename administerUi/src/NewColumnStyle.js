import React, { Fragment } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';

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

class NewColumnStyle extends React.Component {

    render() {
        const { getFieldDecorator, index, id, attributes } = this.props;

        if (attributes === undefined || attributes[index] === undefined || attributes[index].styleType === undefined) return <Fragment></Fragment>

        if (attributes[index].styleType === 'NewColumn')
            return (
                <Row key={id} >
                    <Col span={4} ></Col>
                    <Col span={8} >
                        <Item
                            label="新增列类型"
                            {...formItemLayout}
                            key={`${id}_0`}
                        >
                            {getFieldDecorator(`attributes[${index}][style][newColType]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: "请选择新增类的类型",
                                    },
                                ],
                            })(<Select>
                                <Option value="String">String</Option>
                                <Option value="Boolean">Boolean</Option>
                                <Option value="Int">Int</Option>
                                <Option value="Double">Double</Option>
                                <Option value="Array[String]">Array[String]</Option>
                                <Option value="Vector">Vector</Option>
                            </Select>)}
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

export default NewColumnStyle;