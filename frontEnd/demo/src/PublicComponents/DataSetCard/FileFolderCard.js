import React from 'react';
import { Col, Tooltip, Row, Icon, Card } from 'antd';
import styles from './index.less';

import DeleteFile from '../DataOperate/DeleteFile';

class FileFolderCard extends React.Component {
    state = {
        mouseEnter: false,
    }

    // 点击文件夹，跳转到文件夹下
    handleClickFileFolder = async () => {
        //这里放入向后端请求的的子文件夹内数据
        const { filePath, fileFolder, updateAttributes, handleUpdateFileList } = this.props;

        const attributes = {
            filePath: filePath.concat(fileFolder.fileName)
        };

        await updateAttributes(attributes);
        handleUpdateFileList();
    }

    mouseEnter = () => {
        this.setState({ mouseEnter: true });
    }

    mouseLeave = () => {
        this.setState({ mouseEnter: false });
    }

    render() {
        const { fileFolder, filePathUpload, handleUpdateFileList } = this.props;

        return (
            <Col span={8}>
                <Tooltip placement="bottom" title="点击进入文件夹" >
                    <Card
                        className={styles.cardStyle}
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseLeave}
                        onClick={this.handleClickFileFolder}
                    >
                        <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Col span={4} >
                                <Icon
                                    type={this.state.mouseEnter ? "folder-open" : "folder"}
                                    style={{ fontSize: 30 }}
                                />
                            </Col>
                            <Col span={8} style={{ padding: 1, fontWeight: "bold", fontSize: 20 }} >
                                {fileFolder.fileName}
                            </Col>
                            <Col span={12} style={{ paddingLeft: 5 }} >
                                {this.state.mouseEnter === true ?
                                    <div style={{ float: "right" }}>
                                        <DeleteFile
                                            handleUpdateFileList={handleUpdateFileList}
                                            filePathUpload={filePathUpload}
                                            file={fileFolder}
                                        />
                                    </div> : null}
                            </Col>
                        </Row>
                    </Card>
                </Tooltip>
            </Col>
        );
    }
}

export default FileFolderCard;