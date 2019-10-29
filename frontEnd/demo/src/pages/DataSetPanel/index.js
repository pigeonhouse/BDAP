import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Tooltip } from 'antd';
import ActiveFileList from '../../PublicComponents/DataOperate/ActiveFileList';
import UploadFile from '../../PublicComponents/DataOperate/UploadFile';
import VisualizedPanel from '../VisualizedPanel';
import DataSetCard from '../../PublicComponents/DataSetCard';
import styles from './index.less';
import { number } from 'prop-types';

const { Search } = Input;

const data = [
    { fileName: "adult_1", fileFolder: true },
    { fileName: "adult_2", fileFolder: true },
    { fileName: "adult_3", fileFolder: true },
    { fileName: "adult1.csv", fileFolder: false, activeFile: false },
    { fileName: "adult2.csv", fileFolder: false, activeFile: true },
    { fileName: "adult3.csv", fileFolder: false, activeFile: false },
    { fileName: "adult4.csv", fileFolder: false, activeFile: false },
    { fileName: "adult5.csv", fileFolder: false, activeFile: true },
]
class DataSetPanel extends React.Component {
    state = {
        homePath: "bdap/students/2017211511",
        filePath: ["2017211511"],
        fileList: [],
        fileBackup: [],
    }

    componentWillMount() {
        //data应该是从后端拿到的数据
        this.setState({
            fileBackup: data,
            fileList: data.map(r => r),
        })
    }

    handleClickFile = (index) => {
        if (this.props.sessionFinish === false) {
            const args = {
                message: 'Session',
                description:
                    '正在创建session，请稍候',
                key: "session"
            };
            notification['info'](args);
            return;
        }

        console.log(this.state.fileList[index]);
        this.props.handleClickEnter();
    }

    handleClickFileFolder = (index) => {
        //这里放入向后端请求的的子文件夹内数据
        const Name = this.state.fileList[index].fileName;
        const dataDir = [

            { fileName: "adult_2", fileFolder: true },
            { fileName: "adult_3", fileFolder: true },
            { fileName: "adult1.csv", fileFolder: false, activeFile: false },
            { fileName: "adult2.csv", fileFolder: false, activeFile: true },
            { fileName: "adult3.csv", fileFolder: false, activeFile: false },
            { fileName: "adult4.csv", fileFolder: false, activeFile: false },
            { fileName: "adult5.csv", fileFolder: false, activeFile: true },
        ]
        this.setState({
            fileList: dataDir.map(r => r),
            filePath: this.state.filePath.concat(Name)
        });
        console.log(this.state.fileList);
        console.log(this.state.filePath);
    }

    handleChangePathByPathIndex = (index) => {
        //这里放入向后端请求的的子文件夹内数据
        const dataDir = [

            { fileName: "adult_2", fileFolder: true },
            { fileName: "adult_3", fileFolder: true },
            { fileName: "adult1.csv", fileFolder: false, activeFile: false },
            { fileName: "adult2.csv", fileFolder: false, activeFile: true },
            { fileName: "adult3.csv", fileFolder: false, activeFile: false },
            { fileName: "adult4.csv", fileFolder: false, activeFile: false },
            { fileName: "adult5.csv", fileFolder: false, activeFile: true },
        ]
        const newfilePath = this.state.filePath.filter((path, idx) => idx <= index).map(r => r);
        this.setState({
            fileList: dataDir.map(r => r),
            filePath: newfilePath
        });
        console.log(this.state.fileList);
        console.log(this.state.filePath);
    }

    //返回根目录，将filePath的数据清空
    handleClickHome = () => {
        //从新向后端请求对应的目录的filelist文件
        this.setState({
            filePath: []
        })
    }

    //文件删除的操作，此时需要向后端传递数据，只完成了前端的逻辑处理
    handleDeleteFile = (index) => {
        const { fileList, fileBackup } = this.state;
        const fileTemp = fileList[index];
        for (let indextemp in fileBackup) {
            const datatemp = fileBackup[indextemp];
            if (datatemp.fileName === fileTemp.fileName && datatemp.fileFolder === fileTemp.fileFolder) {
                fileList.splice(index, 1);
                fileBackup.splice(indextemp, 1);
                this.setState({
                    fileBackup,
                    fileList,
                })
            }
        }
    }

    //输入框的搜索
    handleRearch = (searchText) => {
        console.log("handleRearch")
        const filelist = this.state.fileBackup;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            fileList: filelist.map((record) => {
                const match = record.fileName.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                };
            }).filter(record => !!record),
        });
    }

    render() {
        const { currentTab, clickTab } = this.props;
        if (currentTab !== "2") return <Fragment></Fragment>;

        if (clickTab === "2") {
            const { fileList } = this.state;
            console.log(this.state);
            const filePath = this.state.filePath;
            return (
                <Fragment>
                    <Row className={styles.header} >
                        <Col span={14} >
                            <h3 className={styles.headerFont} style={{ marginLeft: "30px" }} >DataSet&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                            {
                                filePath.map((path, index) => {
                                    return <div style={{ display: "inline" }} >
                                        <h5 style={{ display: "inline" }} >
                                            <a className={styles.aStyle} onClick={this.handleChangePathByPathIndex.bind(this, index)} >{path}</a>
                                            &nbsp;&nbsp;>&nbsp;&nbsp;</h5>
                                    </div>
                                })
                            }
                        </Col>
                        <Col span={4} >
                            <Tooltip placement="bottom" title="查询文件或文件夹" >
                                <Search
                                    placeholder="请输入文件名"
                                    onSearch={this.handleRearch}
                                    style={{ width: "100%", marginTop: "5px" }}
                                    enterButton
                                />
                            </Tooltip>
                        </Col>
                        <Col span={6} style={{ paddingLeft: "20px" }} >

                            {/* 上传文件 */}
                            <UploadFile />

                            <Tooltip placement="bottom" title="新建文件夹" >
                                <Button
                                    icon="folder-add"
                                    className={styles.buttonStyle}
                                />
                            </Tooltip>

                            {/* 常用文件列表 */}
                            <ActiveFileList />

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
                                    onClick={this.handleClickHome}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                    <div style={{ height: "calc(100vh - 175px)" }} >
                        <DataSetCard
                            handleClickFile={this.handleClickFile}
                            handleClickFileFolder={this.handleClickFileFolder}
                            fileList={fileList}
                            handleDeleteFile={this.handleDeleteFile}
                        />
                    </div>
                </Fragment>
            );
        } else {
            return <VisualizedPanel></VisualizedPanel>;
        }
    }
}

export default DataSetPanel;