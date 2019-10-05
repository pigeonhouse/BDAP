import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

class OperateSelect extends React.Component {


    handleChange = (value) => {
        this.props.handleChangeOperator(value);
    }

    render() {
        return (
            <Select
                placeholder='选择操作符'
                style={{ width: "80%", margin: "10%", marginTop: "15px", marginBottom: "0px" }}
                onChange={this.handleChange}
            >
                <Option value="=">等于</Option>
                <Option value="<>">不等于</Option>
                <Option value=">">大于</Option>
                <Option value="<">小于</Option>
                <Option value=">=">大于等于</Option>
                <Option value="<=">小于等于</Option>
                <Option value="BETWEEN">在两者之间</Option>
            </Select >
        );
    }
}

export default OperateSelect;