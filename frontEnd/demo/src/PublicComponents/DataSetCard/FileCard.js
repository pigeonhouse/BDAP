import React, { Fragment } from 'react';
import { Col, Tooltip, Row, Button, Icon, Card } from 'antd';

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

    render() {
        const { file } = this.props;

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
                                            />
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="标记为常用文件" >
                                            <Button
                                                icon="star"
                                                className={styles.iconStyle}
                                            />
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="删除文件" >
                                            <Button
                                                icon="delete"
                                                className={styles.iconStyle}
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