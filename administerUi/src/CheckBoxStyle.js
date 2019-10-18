import React, { Fragment } from 'react';
import { Form, Select } from 'antd';

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

class CheckBoxStyle extends React.Component {

    render() {
        const { getFieldDecorator, index, id, attributes } = this.props;

        if (attributes === undefined || attributes[index] === undefined || attributes[index].styleType === undefined) return <Fragment></Fragment>

        if (attributes[index].styleType === 'CheckBox')
            return (
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
                                message: "数字类型的默认值",
                            },
                        ],
                    })(<Select>
                        <Option value="true">true</Option>
                        <Option value="false">false</Option>
                    </Select>)}
                </Item>
            );
        else return <Fragment></Fragment>
    }
}

export default CheckBoxStyle;