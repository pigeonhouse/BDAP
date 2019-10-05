import { Tag } from 'antd';
import React from 'react';


class TagVisual extends React.Component {

    state = {
        tag: [],
    }

    componentWillMount() {
        const { filter } = this.props;
        this.setState({ tag: filter })
    }

    handleCloseDelete = (removedTag) => {
        const tag = this.state.tag.filter(Tag => {
            if (Tag.label === removedTag.label &&
                Tag.operator === removedTag.operator &&
                Tag.value === removedTag.value)
                return false;
            else return true;
        });
        this.setState({ tag });

        this.props.handleDeleteTag(tag);
    }

    render() {
        const { tag } = this.state;
        return (
            <div >
                {tag.map((item) => {
                    const tag = `${item.label}${item.operator}${item.value}`;
                    return (
                        <div style={{ margin: "15%", marginTop: "6px", marginBottom: "6px"}} >
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