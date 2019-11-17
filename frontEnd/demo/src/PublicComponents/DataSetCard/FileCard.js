import React, { Fragment } from 'react';
import { Col, Tooltip, Row, Icon, Card } from 'antd';

import DownloadFile from '../DataOperate/DownloadFile';
import DataPreview from '../DataOperate/DataPreview';
import DeleteFile from '../DataOperate/DeleteFile';
import StarCommonFile from '../DataOperate/StarCommonFile';
import styles from './index.less';

class FileCard extends React.Component {
    state = {
        mouseEnter: false,
    }

    handleClickFile = () => {
        const { file } = this.props;
        this.props.handleClickFile(file);
    }

    mouseEnter = () => {
        this.setState({ mouseEnter: true });
    }

    mouseLeave = () => {
        this.setState({ mouseEnter: false });
    }

    render() {
        const { mouseEnter } = this.state;
        const { file, filePathUpload, status, handleUpdateFileList } = this.props;

        return (
            <Col span={8}>
                <Tooltip placement="bottom" title="点击进行可视化" >
                    <Card
                        className={styles.cardStyle}
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseLeave}
                        onClick={this.handleClickFile}
                    >
                        <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Col span={4} >
                                <Icon
                                    type="file"
                                    style={{ fontSize: 30 }}
                                />
                            </Col>
                            <Col span={8} style={{ padding: 1, fontWeight: "bold", fontSize: 20 }} >
                                {file.fileName}
                            </Col>
                            <Col span={12} style={{ paddingLeft: 5 }} >
                                <div style={{ float: "right" }}>

                                    {/* 数据预览 */}
                                    <div style={{ display: 'inline', visibility: mouseEnter ? 'visible' : 'hidden' }}>
                                        <DataPreview
                                            file={file}
                                            filePathUpload={filePathUpload}
                                            status={status}
                                        />
                                    </div>

                                    <div style={{ display: 'inline', visibility: mouseEnter ? 'visible' : 'hidden' }}>
                                        <DownloadFile
                                            file={file}
                                            filePathUpload={filePathUpload}
                                            status={status}
                                        />
                                    </div>

                                    <div style={{ minWidth: 36, display: 'inline' }}>
                                        <StarCommonFile
                                            mouseEnter={mouseEnter}
                                            handleUpdateFileList={handleUpdateFileList}
                                            status={status}
                                            filePathUpload={filePathUpload}
                                            file={file}
                                        />
                                    </div>

                                    <div style={{ display: 'inline', visibility: mouseEnter ? 'visible' : 'hidden' }}>
                                        <DeleteFile
                                            handleUpdateFileList={handleUpdateFileList}
                                            filePathUpload={filePathUpload}
                                            file={file}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Tooltip>
            </Col>
        );
    }
}

export default FileCard;