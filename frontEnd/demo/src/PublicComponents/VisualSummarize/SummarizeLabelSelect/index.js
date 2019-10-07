import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

class SummarizeLabelSelect extends React.Component {

    onChange = (value) => {
        this.props.handleChangeLabel(value);
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    render() {
        const { labelArray } = this.props;
        return (
            <Select
                value={this.props.label}
                showSearch
                style={{ width: "80%", margin: "10%", marginTop: "15px", marginBottom: "0px" }}
                placeholder="请选择分组列"
                optionFilterProp="children"
                onChange={this.onChange}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {labelArray.map((item)=>{
                    return(
                        <Option value={item}>{item}</Option>
                    );
                })}
            </Select >
        );
    }
}

export default SummarizeLabelSelect;