import { Input } from 'antd';
import React from 'react';


class InputValue extends React.Component {

    render() {
        return (
            <Input style={{ width: "90%" }} placeholder="请输入值" />
        );
    }
}

export default InputValue;