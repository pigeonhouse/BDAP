import React from 'react';
import { Tooltip, Button } from 'antd';

class GoBackPanel extends React.Component {

    state = {
        filePath: [],
    }

    componentWillReceiveProps(nextProps) {
        const { status, filePath } = this.props;
        if (nextProps.status !== 'normal' && status === 'normal') {
            this.setState({ filePath });
        }
    }

    onGoBack = async () => {
        const { handleUpdateFileList, updateAttributes, filePath, status } = this.props;

        var attributes = {};

        if (status !== 'normal') {
            attributes = {
                filePath: this.state.filePath,
                status: 'normal'
            }
        } else {
            filePath.pop();
            console.log(filePath)
            attributes = {
                filePath,
            }
        }

        await updateAttributes(attributes);
        handleUpdateFileList();
    }

    render() {
        return (
            <Tooltip placement="bottom" title="返回上一页" >
                <Button
                    icon="arrow-left"
                    shape="circle"
                    style={{
                        marginTop: 20,
                        fontSize: 30,
                        padding: 0,
                        border: 0
                    }}
                    onClick={this.onGoBack}
                />
            </Tooltip>
        )
    }
}

export default GoBackPanel;