import React, { Fragment } from 'react';
import { withPropsAPI } from '@src';
import { Form, Input } from 'antd';

const { Item } = Form;
const inlineFormItemLayout = {
    labelCol: {
        sm: { span: 11 },
    },
    wrapperCol: {
        sm: { span: 13 },
    },
};

class NewCols extends React.Component {

    handleInputSubmit = (index, e) => {
        e.preventDefault();

        const { form, propsAPI } = this.props;
        const { getSelected, executeCommand, update } = propsAPI;
        form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            const item = getSelected()[0];
            if (!item) {
                return;
            }
            const newCols = JSON.parse(JSON.stringify(item.model.newCols));
            
            newCols[index].value = values.newCols[index];
            executeCommand(() => {
                update(item, { newCols });
            });
        });
    }

    generateNewCols = (item, index) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, value } = item;

        return (
            <Item style={{ margin: 0 }} label={name} {...inlineFormItemLayout}>
                {
                    getFieldDecorator(`newCols[${index}]`, {
                        rules: [{
                            required: true,
                            message: '请输入正确格式'
                        }],
                        initialValue: value,
                    })(<Input style={{ margin: 0 }} onBlur={this.handleInputSubmit.bind(this, index)} />)
                }
            </Item>
        );
    }

    render() {
        const newCols = this.props.newCols || [];

        return (
            <Fragment>
                {newCols.map((item, index) => {
                    return this.generateNewCols(item, index);
                })}
            </Fragment>
        );
    }
}

export default Form.create()(withPropsAPI(NewCols));