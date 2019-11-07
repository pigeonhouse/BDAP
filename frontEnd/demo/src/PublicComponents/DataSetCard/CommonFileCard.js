import React from 'react';
import { Col, Tooltip, Row, Button, Icon, Card } from 'antd';

import DataPreview from '../DataOperate/DataPreview';
import DeleteFile from '../DataOperate/DeleteFile';
import StarCommonFile from '../DataOperate/StarCommonFile';
import styles from './CommonFileCard.less';


class CommonFileCard extends React.Component {
    state = {
        mouseEnter: false,
    }

    handleClickFile = () => {
        const { index } = this.props;
        this.props.handleClickFile(index);
    }

    mouseEnter = () => {
        this.setState({ mouseEnter: true });
    }

    mouseLeave = () => {
        this.setState({ mouseEnter: false });
    }

    //此处应该写文件下载，但还没有完成
    handleClickDownloadFile = (e) => {
        e.stopPropagation();
        const { file } = this.props;
        alert(file.fileName)
    }

    render() {
        const { file, index, handleDeleteFile, handleCancelStar, handleSelectStar } = this.props;

        console.log(file)
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
                                    style={{ fontSize: 30, marginTop: 10 }}
                                />
                            </Col>
                            <Col span={8}  >
                                <div style={{ fontWeight: "bold", fontSize: 20 }} >
                                    {file.fileName}
                                </div>
                                <div style={{ fontSize: 16, color: '#666' }} >
                                    {file.path}{file.fileName}
                                </div>
                            </Col>
                            <Col span={12} style={{ paddingLeft: 5, marginTop: 10 }} >
                                {this.state.mouseEnter === true ?
                                    <div style={{ float: "right" }}>
                                        <DataPreview />
                                        <Tooltip placement="bottom" title="下载数据" >
                                            <Button
                                                icon="download"
                                                className={styles.iconStyle}
                                                onClick={this.handleClickDownloadFile}
                                            />
                                        </Tooltip>
                                        <StarCommonFile
                                            handleCancelStar={handleCancelStar}
                                            handleSelectStar={handleSelectStar}
                                            index={index}
                                            file={file}
                                        />
                                        <DeleteFile
                                            handleDeleteFile={handleDeleteFile}
                                            index={index}
                                            file={file}
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

export default CommonFileCard;