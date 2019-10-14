import { Tag } from 'antd';
import React from 'react';

class TagVisual extends React.Component {

    handleCloseDelete = (removedTag) => {
        const tag = this.props.filter.filter(Tag => {
            if (Tag.label === removedTag.label &&
                Tag.operator === removedTag.operator &&
                Tag.value === removedTag.value)
                return false;
            else return true;
        });

        console.log(tag);

        this.props.handleDeleteTag(tag);
    }

    render() {
        const { filter } = this.props;
        return (
            <div >
                {filter.map((item) => {
                    const tag = `${item.label}${item.operator}${item.value}`;
                    return (
                        <div style={{ margin: "15%", marginTop: "6px", marginBottom: "6px" }} >
                            <Tag
                                closable
                                color="blue"
                                onClose={() => this.handleCloseDelete(item)}
                                key={tag}
                            >
                                {item.label}&nbsp;{item.operator}&nbsp;{item.value}
                            </Tag>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TagVisual;