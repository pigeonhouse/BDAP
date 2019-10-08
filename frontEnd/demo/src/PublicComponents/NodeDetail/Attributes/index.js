import React, { Fragment } from 'react';
import { withPropsAPI } from '@src';
import { Form, Input, Select, InputNumber, Checkbox } from 'antd';

/* 显示attrDetail，即属性的细节，取决于标签框中的attrDetail属性，目前有三种格式：
    1.为Select即选择模式 例：
    attrDetail:[{
        elabel:'type',    英文标签
        label:'填充值', 	中文标签
        type:'Select', 		此attr类型
        evalue:['average', 'median', 'max', 'min'],  选择值的英文名
        value:['平均值', '中位数', '最大值', '最小值']  选择值对应的中文名
    }]
    2.为Input即输入模式，根据输入的正则式判定输入是否正确，例：
    attrDetail:[{
        elabel:'type',
        label:'填充值', 
        type:'Input', 
        regexp:'^[0-9]+.?[0-9]*'  正则式
        
    }]
    3.Number专门为数字类型，有上下限范围，且有步长step，例：
    attrDetail:[{
        elabel:'type',
        label:'填充值', 
        type:'Number', 
        min:0,
        max:100,
        step:2 即每次增加2步长
    }]

    最后会修改attr中与elabel相同的键的值，此键可事先不设定默认值，attrDetail也可不写
*/
/**
 * @param {class} attributes
 */

const { Item } = Form;
const Option = Select.Option;
const inlineFormItemLayout = {
    labelCol: {
        sm: { span: 8 },
    },
    wrapperCol: {
        sm: { span: 16 },
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
            return (
                <Item style={{ margin: 0 }} label={item.labelName.label} {...inlineFormItemLayout}>
                    {
                        getFieldDecorator(item.labelName.elabel, {
                            initialValue: item.value,
                        })(
                            <Select onChange={this.handleSelectChange.bind(this, index)}>
                                {item.style.menu.map((value) => {
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
                                required: false,
                                pattern: new RegExp('^[a-z]+.?[a-z]*', "g"),
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
                                style={{ margin: 0 }}
                                min={item.style.min}
                                max={item.style.max}
                                step={item.style.step}
                                onChange={this.handleChangeNumber.bind(this, index)}
                            />)
                    }
                </Item>
            )
        }
        else if (item.styleType === 'CheckBox') {
            return (
                <Item style={{ margin: 0 }} {...inlineFormItemLayout}>
                    {
                        getFieldDecorator(`attributes[${index}]`, {
                            initialValue: item.value === false || item.value === 'false' ? false:true,
                        })(
                            <Checkbox
                                // checked={item.value}
                                style={{ margin: 0, marginLeft: '30px' }}
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
        const { attributes } = this.props;
        if (attributes === undefined) {
            return null;
        }

        return (
            <Fragment>
                {
                    attributes.map((item, index) => {
                        return this.generateAttributes(item, index);
                    })}
            </Fragment>
        );
    }
}

export default Form.create()(withPropsAPI(Attributes));