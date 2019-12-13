import React, { Fragment } from 'react';
import { withPropsAPI } from '@src';
import { Form, Input, Select, InputNumber, Checkbox } from 'antd';
/**
 * @param {class} attributes
 */

const { Item } = Form;
const { Option } = Select;
const inlineFormItemLayout = {
    labelCol: {
        sm: { span: 11 },
    },
    wrapperCol: {
        sm: { span: 13 },
    },
};

class Attributes extends React.Component {

    //Select模式的修改函数
    handleSelectChange = (index, elabel) => {
        const { propsAPI } = this.props;
        const { getSelected, executeCommand, update } = propsAPI;
        const item = getSelected()[0];
        const attributes = JSON.parse(JSON.stringify(item.model.attributes));
        attributes[index].value = elabel;
        executeCommand(() => {
            update(item, { attributes });
        });
    }

    //Input模式的修改函数
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
            const attributes = JSON.parse(JSON.stringify(item.model.attributes));
            attributes[index].value = values.attributes[index];
            executeCommand(() => {
                update(item, { attributes });
            });
        });
    }

    //Number模式的修改函数
    handleChangeNumber = (index, value) => {
        const { propsAPI } = this.props;
        const { getSelected, executeCommand, update } = propsAPI;

        const item = getSelected()[0];
        if (!item) {
            return;
        }

        var attributes = JSON.parse(JSON.stringify(item.model.attributes));
        attributes[index].value = value;
        executeCommand(() => {
            update(item, { attributes });
        });
    }

    handleChangeCheckBox = (index, e) => {
        const { propsAPI } = this.props;
        const { getSelected, executeCommand, update } = propsAPI;

        const item = getSelected()[0];
        if (!item) {
            return;
        }
        const attributes = JSON.parse(JSON.stringify(item.model.attributes));
        attributes[index].value = e.target.checked;
        executeCommand(() => {
            update(item, { attributes });
        });
    }

    //根据item的类型某一种属性表单，并设置修改函数
    generateAttributes = (item, index) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        if (item.styleType === 'Select') {
            const menu = item.style.menu;
            return (
                <Item style={{ margin: 0 }} label={item.labelName.label} {...inlineFormItemLayout}>
                    {
                        getFieldDecorator(item.labelName.elabel, {
                            initialValue: item.value,
                        })(
                            <Select onChange={this.handleSelectChange.bind(this, index)}>
                                {menu.map((value) => {
                                    return <Option value={value.elabel}>{value.label}</Option>
                                })}
                            </Select>
                        )
                    }
                </Item>);
        }
        else if (item.styleType === 'Input') {
            return (
                <Item style={{ margin: 0 }} label={item.labelName.label} {...inlineFormItemLayout}>
                    {
                        getFieldDecorator(`attributes[${index}]`, {
                            rules: [{
                                required: true,
                                // pattern: new RegExp('^[a-z]+.?[a-z]*', "g"),
                                pattern: new RegExp(item.style.regexp),
                                message: '请输入正确格式'
                            }],
                            initialValue: item.value,
                        })(<Input style={{ margin: 0 }} onBlur={this.handleInputSubmit.bind(this, index)} />)
                    }
                </Item>
            );
        }
        else if (item.styleType === 'Number') {
            return (
                <Item style={{ margin: 0 }} label={item.labelName.label} {...inlineFormItemLayout}>
                    {
                        getFieldDecorator(`attributes.${index}`, {
                            initialValue: item.value,
                        })(
                            <InputNumber
                                style={{ margin: 0, width: '100%' }}
                                {...item.style}
                                onChange={this.handleChangeNumber.bind(this, index)}
                            />)
                    }
                </Item>
            )
        }
        else if (item.styleType === 'CheckBox') {
            return (
                <Item style={{ margin: 0, textAlign: "center" }} >
                    {
                        getFieldDecorator(`attributes[${index}]`, {
                        })(
                            <Checkbox
                                defaultChecked={item.value === false || item.value === 'false' ? false : true}
                                onChange={this.handleChangeCheckBox.bind(this, index)}
                            >
                                {item.labelName.label}
                            </Checkbox>)
                    }
                </Item >
            );
        }
    }

    render() {
        const attributes = this.props.attributes || [];

        return (
            <Fragment>
                {attributes.map((item, index) => {
                    return this.generateAttributes(item, index);
                })}
            </Fragment>
        );
    }
}

export default Form.create()(withPropsAPI(Attributes));