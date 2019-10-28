import React, { Fragment } from 'react';
import { Col, Tooltip, Row, Button, Icon, Card,Modal } from 'antd';
const { confirm } = Modal
import styles from './index.less';

class FileFolderCard extends React.Component {
    state = {
        mouseEnter: false,
    }

    // 点击文件夹后进入此文件夹
    handleClickFileFolder = () => {
        const { index } = this.props;
        this.props.handleClickFileFolder(index);
    }

    mouseEnter = () => {
        this.setState({ mouseEnter: true });
    }

    mouseLeave = () => {
        this.setState({ mouseEnter: false });
    }
    deleteFolderFile = (e) => {
        const { index,fileFolder } = this.props;
        const self=this;
        e.stopPropagation();
        confirm({
            title: '确定要删除此项目？',
            content:fileFolder.fileName,
            onOk() {
                self.props.handleDeleteFile(index)
            }
        })
    }

    render() {
        const { fileFolder } = this.props;
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
                                        <Tooltip placement="bottom" title="删除文件夹" >
                                            <Button
                                                icon="delete"
                                                className={styles.iconStyle}
                                                onClick={this.deleteFolderFile}
                                            />
                                        </Tooltip>
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