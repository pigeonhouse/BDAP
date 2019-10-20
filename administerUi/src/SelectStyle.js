import React, { Fragment } from 'react';
import { Form, Input, Icon, Select, Button, Tooltip, Row, Col } from 'antd';

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

class SelectStyle extends React.Component {
    state = {
        selectKeys: [],
    }

    removeSelect = k => {
        var { selectKeys } = this.state;
        selectKeys = selectKeys.filter(selectKeys => selectKeys !== k);
        this.setState({ selectKeys })
    };

    addSelect = () => {
        var { selectKeys } = this.state;
        selectKeys = selectKeys.concat(id++);
        this.setState({ selectKeys })
    };


    render() {
        const { selectKeys } = this.state;
        const { getFieldDecorator, index, attributes, id } = this.props;

        if (attributes === undefined || attributes[index] === undefined || attributes[index].styleType === undefined) return <Fragment></Fragment>

        if (attributes[index].styleType === 'Select') {

            const children = selectKeys.map((k, kIndex) => (
                <Row key={k}>
                    <Col span={8} >
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
                    </Col>
                    <Col span={8} >
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
                    </Col>
                    <Col span={1}></Col>
                    <Col span={7}>
                        <Icon
                            className="dynamic-delete-button"
                            type="close"
                            onClick={() => this.removeSelect(k)}
                        />
                    </Col>
                </Row>
            ))
            return (
                <Row >
                    {children}
                    <Col span={10} >
                        <Item
                            label={
                                <span>默认值(英文)&nbsp;
                                <Tooltip title="必须填可选择值中的某一个">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                            {...formItemLayout}
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
                    </Col>
                    <Col span={10} >
                        <Item {...tailFormItemLayout} >
                            <Button type="dashed" onClick={this.addSelect} style={{ width: '100%' }}>
                                <Icon type="plus" /> 增加可选择值
              			    </Button>
                        </Item>
                    </Col>

                </Row>
            );
        } else {
            return <Fragment></Fragment>
        }
    }
}

export default SelectStyle;