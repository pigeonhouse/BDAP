import { Tag } from 'antd';
import React from 'react';

class TagVisual extends React.Component {

    handleCloseDelete = (removedTag) => {
        const tag = this.props.summarize.filter(Tag => {
            if (Tag.label === removedTag.label &&
                Tag.operator === removedTag.operator)
                return false;
            else return true;
        });
        this.setState({ tag });

        this.props.handleDeleteTag(tag);
    }

    render() {
        const { summarize } = this.props;
        return (
            <div >
                {summarize.map((item) => {
                    const tag = `${item.operator}${item.label}`;
                    return (
                        <div style={{ margin: "15%", marginTop: "6px", marginBottom: "6px" }} >
                            <Tag
                                closable
                                color="blue"
                                onClose={() => this.handleCloseDelete(item)}
                                key={tag}
                            >
                                {item.operator}&nbsp;of&nbsp;{item.label}
                            </Tag>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TagVisual;