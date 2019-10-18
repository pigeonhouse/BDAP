import React, { Fragment } from 'react';
import { Form, Select, Tooltip, Icon } from 'antd';

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
                for (let i = 0; i <= Number(anchor[0]); i++) {
                    children.push(
                        <Option value={`${i}`}>{i}</Option>
                    )
                }
            }
            return (
                <Fragment>
                    <Item
                        label={
                            <span>可多选&nbsp;
                                <Tooltip title="选择字段是否选择多列？">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                        {...formItemLayout}
                        required={false}
                        key={id}
                    >
                        {getFieldDecorator(`attributes[${index}][style][multiCol]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "选择字段是否选择多列",
                                },
                            ],
                        })(<Select>
                            <Option value="true">true</Option>
                            <Option value="false">false</Option>
                        </Select>)}
                    </Item>
                    <Item
                        label={
                            <span>锚点源头&nbsp;
                                <Tooltip title="选择字段从上方第几个锚点取值？">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                        {...formItemLayout}
                        required={false}
                        key={id}
                    >
                        {getFieldDecorator(`attributes[${index}][style][sourceAnchor]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [
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
                </Fragment>
            );
        }
        else return <Fragment></Fragment>
    }
}

export default ChooseColStyle;