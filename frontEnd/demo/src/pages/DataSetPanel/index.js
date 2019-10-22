import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Tooltip } from 'antd';

import DataCard from './DataCard';

import styles from './index.less';

const { Search } = Input;

class DataSetPanel extends React.Component {
    state = {
        filePath: "bdap/students/2017211511",
    }

    render() {
        return (
            <Fragment>
                <Row className={styles.header} >
                    <Col span={16} >
                        <h3 className={styles.headerFont} style={{ marginLeft: "50px" }} >Dataset&nbsp;&nbsp;>&nbsp;&nbsp;</h3>
                        <h5 className={styles.headerFont} >{this.state.filePath}</h5>
                    </Col>
                    <Col span={4} >
                        <Tooltip placement="bottom" title="查询文件或文件夹" >
                            <Search
                                placeholder="请输入文件名"
                                onSearch={value => console.log(value)}
                                style={{ width: "100%", marginTop: "5px" }}
                            />
                        </Tooltip>
                    </Col>
                    <Col span={4} style={{ paddingLeft: "20px" }} >
                        <Tooltip placement="bottom" title="上传文件" >
                            <Button
                                icon="upload"
                                className={styles.buttonStyle}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="新建文件夹" >
                            <Button
                                icon="folder-add"
                                className={styles.buttonStyle}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="返回根目录" >
                            <Button
                                icon="home"
                                className={styles.buttonStyle}
                            />
                        </Tooltip>
                    </Col>
                </Row>
                <div style={{ height: "calc(100vh - 175px)" }} >
                    <Row style={{ paddingLeft: "60px", paddingRight: "60px" }} gutter={16}>
                        <DataCard></DataCard>
                        <DataCard></DataCard>
                        <DataCard></DataCard>
                    </Row>
                    <Row style={{ paddingLeft: "60px", paddingRight: "60px" }} gutter={16}>
                        <DataCard></DataCard>
                        <DataCard></DataCard>
                        <DataCard></DataCard>
                    </Row>
                    <Row style={{ paddingLeft: "60px", paddingRight: "60px" }} gutter={16}>
                        <DataCard></DataCard>
                        <DataCard></DataCard>
                        <DataCard></DataCard>
                    </Row>
                </div>
            </Fragment>
        );
    }
}

export default DataSetPanel;