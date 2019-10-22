import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Tooltip, Upload, Icon } from 'antd';

import DataCard from './DataCard';
import styles from './index.less';

const { Search } = Input;
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
                    </Row>
                </div>
            </Fragment>
        );
    }
}

export default DataSetPanel;