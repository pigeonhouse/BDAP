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
                value={this.props.operator}
                placeholder='选择操作符'
                style={{ width: "80%", margin: "10%", marginTop: "0px", marginBottom: "0px" }}
                onChange={this.handleChange}
            >
                <Option value="sum">求和</Option>
                <Option value="max">最大值</Option>
                <Option value="min">最小值</Option>
                <Option value="avg">平均值</Option>
                <Option value="count">计数</Option>
            </Select >
        );
    }
}

export default OperateSelect;