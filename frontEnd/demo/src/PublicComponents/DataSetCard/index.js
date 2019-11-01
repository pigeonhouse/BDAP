import React, { Fragment } from 'react';
import { Icon, Upload, Row, Col, Tooltip } from 'antd';
import FileCard from './FileCard';
import FileFolderCard from './FileFolderCard';
import CommonFileCard from './CommonFileCard';

import styles from './index.less';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class DataSetCard extends React.Component {

    render() {
        const { fileList, handleDeleteFile, filePath, getFileList, isCommonly } = this.props;
        var children = new Array();

        // 生成fileList对应的文件夹，且最后为上传文件，
        for (let count = 0; count <= fileList.length; count += 3) {
            var colChildren = new Array();
            for (let colCount = 0; colCount < 3; colCount++) {

                // 分情况生成file及fileFolder，upLoad
                if (isCommonly === true) {

                    // 当为常用文件列表时
                    if (fileList.length > count + colCount) {
                        colChildren.push(
                            <CommonFileCard
                                file={fileList[count + colCount]}
                                filePath={filePath}
                                getFileList={getFileList}
                                handleClickFile={this.props.handleClickFile}
                                index={count + colCount}
                                handleDeleteFile={handleDeleteFile}
                                handleSelectStar={this.props.handleSelectStar}
                                handleCancelStar={this.props.handleCancelStar}
                            ></CommonFileCard>
                        )
                    } else {
                        colChildren.push(
                            <Col span={8} style={{ paddingTop: 21 }} ></Col>
                        )
                    }
                }
                else if (fileList.length > count + colCount) {
                    if (fileList[count + colCount].isDir === false) {
                        colChildren.push(
                            <FileCard
                                file={fileList[count + colCount]}
                                filePath={filePath}
                                getFileList={getFileList}
                                handleClickFile={this.props.handleClickFile}
                                index={count + colCount}
                                handleDeleteFile={handleDeleteFile}
                                handleSelectStar={this.props.handleSelectStar}
                                handleCancelStar={this.props.handleCancelStar}
                            ></FileCard>
                        )
                    } else {
                        colChildren.push(
                            <FileFolderCard
                                handleClickFileFolder={this.props.handleClickFileFolder}
                                fileFolder={fileList[count + colCount]}
                                index={count + colCount}
                                handleDeleteFile={handleDeleteFile}
                            ></FileFolderCard>
                        )
                    }
                }
                else if (fileList.length == count + colCount) {
                    colChildren.push(
                        <Col span={8} style={{ paddingTop: 21 }} >
                            <Tooltip placement="bottom" title="点击上传至此文件夹" >
                                <div>
                                    <Dragger {...props}
                                        className={styles.uploadStyle}
                                        style={{ maxHeight: "70px" }}
                                    >
                                        <Icon type="plus" />
                                    </Dragger>
                                </div>
                            </Tooltip>
                        </Col>
                    )
                } else {
                    colChildren.push(
                        <Col span={8} style={{ paddingTop: 21 }} ></Col>
                    )
                }
            }

            children.push(
                <Row style={{ paddingLeft: "60px", paddingRight: "60px" }} gutter={16}>
                    {colChildren}
                </Row>
            )
        }

        return (
            <Fragment>
                {children}
            </Fragment>
        );
    }
}

export default DataSetCard;