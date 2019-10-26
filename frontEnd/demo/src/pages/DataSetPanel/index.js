import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Tooltip } from 'antd';

import DataSetCard from '../../PublicComponents/DataSetCard';
import styles from './index.less';

const { Search } = Input;

class DataSetPanel extends React.Component {
    state = {
        homePath: "bdap/students/2017211511",
        filePath: ["bdap", "student", "2017211511", "/"],
        fileList: [
            { fileName: "adult", fileFolder: true },
            { fileName: "adult", fileFolder: true },
            { fileName: "adult", fileFolder: true },
            { fileName: "adult.csv", fileFolder: false, activeFile: false },
            { fileName: "adult.csv", fileFolder: false, activeFile: true },
            { fileName: "adult.csv", fileFolder: false, activeFile: false },
            { fileName: "adult.csv", fileFolder: false, activeFile: false },
            { fileName: "adult.csv", fileFolder: false, activeFile: true },
        ],
    }

    handleClickFile = (index) => {
        console.log(this.state.fileList[index]);
    }

    handleClickFileFolder = (index) => {
        console.log(this.state.fileList[index]);
    }

    handleChangePathByPathIndex = (index) => {
        console.log(this.state.filePath[index]);
    }

    render() {
        const { filePath, fileList } = this.state;
        return (
            <Fragment>
                <Row className={styles.header} >
                    <Col span={14} >
                        <h3 className={styles.headerFont} style={{ marginLeft: "50px" }} >Dataset</h3>
                        {
                            filePath.map((path, index) => {
                                return <div style={{ display: "inline" }} >
                                    <h5 style={{ display: "inline" }} >&nbsp;&nbsp;>&nbsp;&nbsp;
                                    <a className={styles.aStyle} onClick={this.handleChangePathByPathIndex.bind(this, index)} >{path}</a>
                                    </h5>
                                </div>
                            })
                        }
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
                    <Col span={6} style={{ paddingLeft: "20px" }} >
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
                        <Tooltip placement="bottom" title="常用文件列表" >
                            <Button
                                icon="star"
                                className={styles.buttonStyle}
                            />
                        </Tooltip>
                        <Tooltip placement="bottom" title="返回上一页" >
                            <Button
                                icon="left"
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
                    <DataSetCard
                        handleClickFile={this.handleClickFile}
                        handleClickFileFolder={this.handleClickFileFolder}
                        fileList={fileList}
                    />
                </div>
            </Fragment>
        );
    }
}

export default DataSetPanel;