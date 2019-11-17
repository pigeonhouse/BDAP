import React, { Fragment } from 'react';

class FilePathShow extends React.Component {

    // 点击路径上的文件夹，跳转到该文件夹下
    handleChangePathByPathIndex = async (index) => {
        const { status, filePath, handleUpdateFileList, updateAttributes } = this.props;
        if (status !== 'normal') return;

        // 新路径
        const newFilePath = filePath.filter((path, idx) => idx <= index);

        const attributes = {
            filePath: newFilePath,
        };

        // 更新父组件的属性
        await updateAttributes(attributes);
        handleUpdateFileList();
    }

    render() {
        const { filePath } = this.props;

        return (
            <Fragment>
                {
                    filePath.map((path, index) => {
                        if (index === '0') {
                            return (
                                <div style={{ display: "inline" }} >
                                    <h5 style={{ display: "inline" }} >
                                        <a onClick={this.handleChangePathByPathIndex.bind(this, index)} >{path}</a>
                                    </h5>
                                </div>
                            )
                        } else return (
                            <div style={{ display: "inline" }} >
                                <h5 style={{ display: "inline" }} >
                                    &nbsp;&nbsp;/&nbsp;&nbsp;
                                    <a onClick={this.handleChangePathByPathIndex.bind(this, index)} >{path}</a>
                                </h5>
                            </div>
                        )
                    })
                }
            </Fragment>

        )
    }
}

export default FilePathShow;