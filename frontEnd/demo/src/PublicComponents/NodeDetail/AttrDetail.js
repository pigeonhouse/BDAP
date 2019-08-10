import React, { Fragment } from 'react';
import { withPropsAPI } from '@src';
import { Form, Input, Select } from 'antd';

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

const { Item } = Form;
const Option = Select.Option;
const inlineFormItemLayout = {
    labelCol: {
        sm: { span: 10 },
    },
    wrapperCol: {
        sm: { span: 14 },
    },
};

class AttrDetail extends React.Component {

    //Select模式的修改函数
    handleSelectChange = (label, value) => {
        const { propsAPI } = this.props;
        const { getSelected, executeCommand, update } = propsAPI;
        const item = getSelected()[0];
        const attr = JSON.parse(JSON.stringify(item.model.attr));
        attr[label] = value;
        executeCommand(() => {
            update(item, { attr });
        });
    }

     //Input模式的修改函数
    handleInputSubmit = (e) => {
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
            values = values.attr;
            const attr = JSON.parse(JSON.stringify(item.model.attr));
            for (var i in values) {
                attr[i] = values[i];
            }
            executeCommand(() => {
                update(item, { attr });
            });
        });
    }

    //Number模式的修改函数
    handleChangeNumber = (label, value) => {
        const { propsAPI } = this.props;
        const { getSelected, executeCommand, update } = propsAPI;

        const item = getSelected()[0];
        if (!item) {
            return;
        }
        var attr = JSON.parse(JSON.stringify(item.model.attr));
        attr[label] = value;
        executeCommand(() => {
            update(item, { attr });
        });
    }

    //根据item的类型某一种属性表单，并设置修改函数
    generateAttrDetail = (item) => {
        const { form, attr } = this.props;
        const { getFieldDecorator } = form;

        if (item.type === 'Select') {
            return (<Item style={{ margin: 0 }} label={item.label} {...inlineFormItemLayout}>
                {
                    getFieldDecorator(item.elabel, {
                        initialValue: attr[item.elabel]?attr[item.elabel]:item.evalue[0],
                    })(
                        <Select onChange={this.handleSelectChange.bind(this, item.elabel)}>
                            {item.evalue.map((value, index) => {
                                return <Option value={value}>{item.value[index]}</Option>
                            })}
                        </Select>
                    )
                }
            </Item>);
        }
        else if (item.type === 'Input') {
            return (
                <Item style={{ margin: 0 }} label={item.label} {...inlineFormItemLayout}>
                    {
                        getFieldDecorator(`attr.${item.elabel}`, {
                            rules: [{
                                required: false,
                                pattern: new RegExp(item.regexp, "g"),
                                message: '请输入正确格式'
                            }],
                            initialValue: attr[item.elabel]?attr[item.elabel]:null,
                        })(<Input style={{ margin: 0 }} onBlur={this.handleInputSubmit} />)
                    }
                </Item>
            );
        }
        else if (item.type === 'Number') {
            return (
                <Item style={{ margin: 0 }} label={item.label} {...inlineFormItemLayout}>
                    {
                        getFieldDecorator(`attr.${item.elabel}`, {
                            initialValue: attr[item.elabel]?attr[item.elabel]:null,
                        })(
                            <InputNumber
                                style={{ margin: 0 }}
                                min={item.min}
                                max={item.max}
                                step={item.step}
                                onChange={this.handleChangeNumber.bind(this, item.elabel)}
                            />)
                    }
                </Item>
            )
        }
    }

    render() {
        const { attrDetail } = this.props;
        if (attrDetail === undefined) {
            return null;
        }

        return (
            <Fragment>
                {attrDetail.map((item) => {
                    return this.generateAttrDetail(item);
                })}
            </Fragment>
        );
    }
}

export default Form.create()(withPropsAPI(AttrDetail));