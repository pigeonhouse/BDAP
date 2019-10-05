import { Input } from 'antd';
import React from 'react';


class InputValue extends React.Component {

    changeInputValue = (e) => {
        this.props.handleChangeValue(e.target.value);
    }

    render() {
        return (
            <Input
                style={{ width: "80%", margin: "10%", marginTop: "15px", marginBottom: "0px" }}
                placeholder="请输入值"
                onChange={this.changeInputValue}
            />
        );
    }
}

export default InputValue;