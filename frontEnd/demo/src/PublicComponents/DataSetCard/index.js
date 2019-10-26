import React, { Fragment } from 'react';
import { Icon, Upload, Row, Col, Tooltip } from 'antd';
import FileCard from './FileCard';
import FileFolderCard from './FileFolderCard';

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
        return (
            <Fragment>
                <Row style={{ paddingLeft: "60px", paddingRight: "60px" }} gutter={16}>
                    <FileCard></FileCard>
                    <FileCard></FileCard>
                    <FileCard></FileCard>
                </Row>
                <Row style={{ paddingLeft: "60px", paddingRight: "60px" }} gutter={16}>
                    <FileCard></FileCard>
                    <FileCard></FileCard>
                    <FileCard></FileCard>
                </Row>
                <Row style={{ paddingLeft: "60px", paddingRight: "60px" }} gutter={16}>
                    <FileCard></FileCard>
                    <FileCard></FileCard>
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
            </Fragment>
        );
    }
}

export default DataSetCard;