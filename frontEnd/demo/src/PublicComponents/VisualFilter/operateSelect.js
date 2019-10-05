import { Select } from 'antd';
import React, { Fragment } from 'react';

import InputValue from './inputValue.js';

const { Option } = Select;

class OperateSelect extends React.Component {


    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render() {
        return (
            <Fragment>
                <Select placeholder='选择操作符' style={{ width: "90%" }} onChange={this.handleChange}>
                    <Option value="=">等于</Option>
                    <Option value="<>">不等于</Option>
                    <Option value=">">大于</Option>
                    <Option value="<">小于</Option>
                    <Option value=">=">大于等于</Option>
                    <Option value="<=">小于等于</Option>
                    <Option value="BETWEEN">在两者之间</Option>
                </Select >

                <InputValue></InputValue>
            </Fragment>
        );
    }
}

export default OperateSelect;