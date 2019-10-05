import { Tag } from 'antd';
import React from 'react';


class TagVisual extends React.Component {

    closeDelete = () => {

    }

    render() {
        return (
            <div>
                <Tag closable color="blue" onClose={this.closeDelete} >blue</Tag>
            </div>
        );
    }
}

export default TagVisual;