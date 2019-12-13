import React, { Component } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;
const { Item } = Form;

const inlineFormItemLayout = {
    labelCol: {
        sm: { span: 11 },
    },
    wrapperCol: {
        sm: { span: 13 },
    },
};

class SelectJoinType extends Component {

    handleSelectChange = () => {

    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form>
                <Item style={{ margin: 0 }} label='连接方式' {...inlineFormItemLayout}>
                    {
                        getFieldDecorator(item.labelName.elabel, {
                            initialValue: item.value,
                        })(
                            <Select onChange={this.handleSelectChange.bind(this, index)}>
                                <Select>
                                    <Option value="inner join">内连接</Option>
                                    <Option value="left outer join">左外连接</Option>
                                    <Option value="right outer join">右外连接</Option>
                                    <Option value="full outer join">全外连接</Option>
                                </Select>
                            </Select>
                        )
                    }
                </Item>
            </Form>
        );
    }
}

export default Form.create(SelectJoinType);