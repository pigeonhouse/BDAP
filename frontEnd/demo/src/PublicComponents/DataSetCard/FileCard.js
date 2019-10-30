import React, { Fragment } from 'react';
import { Col, Tooltip, Row, Button, Icon, Card, Modal, message } from 'antd';
const { confirm } = Modal
import { fetchTool } from './../../FetchTool';
import styles from './index.less';

class FileCard extends React.Component {
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

    //handleDeleteFile是传递过来的，为了将index传给父组件
    deleteFile = (e) => {
        const { index, file } = this.props;
        const self = this;
        e.stopPropagation();
        confirm({
            title: '确定要删除此文件？',
            content: file.fileName,
            onOk() {
                self.props.handleDeleteFile(index)
            }
        })
    }

    //此处应该写文件下载，但还没有完成
    handleClickDownloadFile = (e) => {
        e.stopPropagation();
        const { file } = this.props;
        alert(file.fileName)
    }

    handleClickStart = (e) => {
        e.stopPropagation();
        const { file, filePath } = this.props;
        const path = `${filePath[0]}/${file.fileName}`;
        // const init = {
        // 	method: 'POST',
        // 	mode: 'cors',
        // 	body: JSON.stringify(stream),
        // 	headers: {
        // 		"Content-Type": "application/json;charset=utf-8"
        // 	},
        // 	params: {
        //         path: path,
        //         file: file,
        //     }
        // }
        // const res = await fetchTool("/collection", init)
        // if (res.code === 200) {
        //    this.message.success("操作成功")
        //    this.props.getFileList()
        // }
        this.props.getFileList()
    }

    render() {
        const { file } = this.props;
        const style = file.activeFile ? { color: '#1890ff' } : { color: '#ccc' }

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
                                {this.state.mouseEnter === true ?
                                    <div style={{ float: "right" }}>
                                        <Tooltip placement="bottom" title="预览数据" >
                                            <Button
                                                icon="eye"
                                                className={styles.iconStyle}
                                            />
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="下载数据" >
                                            <Button
                                                icon="download"
                                                className={styles.iconStyle}
                                                onClick={this.handleClickDownloadFile}
                                            />
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="标记为常用文件" >
                                            <Button
                                                icon="star"
                                                className={styles.iconStyle}
                                                onClick={this.handleClickStart}
                                            />
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="删除文件" >
                                            <Button
                                                icon="delete"
                                                className={styles.iconStyle}
                                                onClick={this.deleteFile}
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

export default FileCard;