import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Tooltip, Modal } from 'antd';
import ActiveFileList from '../../PublicComponents/DataOperate/ActiveFileList';
import UploadFile from '../../PublicComponents/DataOperate/UploadFile';
import VisualizedPanel from '../VisualizedPanel';
import DataSetCard from '../../PublicComponents/DataSetCard';
import styles from './index.less';

import { fetchToolTest } from '../../FetchTool/FetchToolTest';

const { Search } = Input;

class DataSetPanel extends React.Component {
    state = {
        filePath: [],
        fileList: [],
        fileBackup: [],
        isCommonly: false,
    }

    getFileListByPath = async (path) => {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        };
        const url = `/filesystem-service/ls&path=${path}`;

        return await fetchToolTest(url, init);
    }

    async componentWillMount() {
        const res = await this.getFileListByPath('/');

        this.setState({
            fileBackup: res || [],
            fileList: res || [],
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

    handleClickFileFolder = async (index) => {
        //这里放入向后端请求的的子文件夹内数据
        const fileName = this.state.fileList[index].fileName;
        const filePath = this.state.filePath;
        var path = '';
        filePath.map((item) => {
            path += '/' + item;
        })

        const dataDir = await this.getFileListByPath(path || '/');

        this.setState({
            fileList: dataDir.map(r => r),
            filePath: filePath.concat(fileName)
        });
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
        //路径更新
        const newfilePath = this.state.filePath.filter((path, idx) => idx <= index).map(r => r);
        this.setState({
            fileList: dataDir.map(r => r),
            filePath: newfilePath
        });
        console.log(this.state.fileList);
        console.log(this.state.filePath);
    }

    //返回根目录，将filePath的数据清空
    handleClickHome = async () => {
        if (this.state.filePath.length === 0) return;
        //从新向后端请求对应的目录的filelist文件
        const res = await this.getFileListByPath('/');

        this.setState({
            filePath: [],
            fileBackup: res || [],
            fileList: res || [],
        })
    }

    //文件删除的操作，此时需要向后端传递数据，只完成了前端的逻辑处理
    handleDeleteFile = (index) => {
        const { fileList, fileBackup } = this.state;
        const fileTemp = fileList[index];
        for (let indextemp in fileBackup) {
            const datatemp = fileBackup[indextemp];
            if (datatemp.fileName === fileTemp.fileName && datatemp.isDir === fileTemp.isDir) {
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

    getStartFileList = () => {
        const resFile = [
            { fileName: "adult1.csv", fileFolder: false, activeFile: false },
            { fileName: "adult2.csv", fileFolder: false, activeFile: true },
            { fileName: "adult3.csv", fileFolder: false, activeFile: false },
            { fileName: "adult4.csv", fileFolder: false, activeFile: false },
            { fileName: "adult5.csv", fileFolder: false, activeFile: true },
        ]
        this.setState({ fileList: resFile, isCommonly: true, filePath: ["常用文件列表"] })
        // const init = {
        // 	method: 'GET',
        // 	mode: 'cors',
        // 	body: JSON.stringify(stream),
        // 	headers: {
        // 		"Content-Type": "application/json;charset=utf-8"
        // 	},
        // }
        // const res = await fetchTool("/getFileList", init)
        // if (res.code === 200) {
        //    this.setState({fileList: res.data})
        // }
    }


    onBack = () => {
        const resFile = [
            { fileName: "adult_1", fileFolder: true },
            { fileName: "adult_2", fileFolder: true },
            { fileName: "adult_3", fileFolder: true },
            { fileName: "adult1.csv", fileFolder: false, activeFile: false },
            { fileName: "adult2.csv", fileFolder: false, activeFile: true },
            { fileName: "adult3.csv", fileFolder: false, activeFile: false },
            { fileName: "adult4.csv", fileFolder: false, activeFile: false },
            { fileName: "adult5.csv", fileFolder: false, activeFile: true },
        ]
        this.setState({ fileList: resFile, isCommonly: false, filePath: [] })
    }

    getFileList = () => {
        // 演示用的
        const active = this.state.fileList[3].activeFile;
        const afileList = [
            { fileName: "adult_1", fileFolder: true },
            { fileName: "adult_2", fileFolder: true },
            { fileName: "adult_3", fileFolder: true },
            { fileName: "adult1.csv", fileFolder: false, activeFile: true },
            { fileName: "adult2.csv", fileFolder: false, activeFile: true },
            { fileName: "adult3.csv", fileFolder: false, activeFile: false },
            { fileName: "adult4.csv", fileFolder: false, activeFile: false },
            { fileName: "adult5.csv", fileFolder: false, activeFile: true }
        ]
        const bfileList = [
            { fileName: "adult_1", fileFolder: true },
            { fileName: "adult_2", fileFolder: true },
            { fileName: "adult_3", fileFolder: true },
            { fileName: "adult1.csv", fileFolder: false, activeFile: false },
            { fileName: "adult2.csv", fileFolder: false, activeFile: true },
            { fileName: "adult3.csv", fileFolder: false, activeFile: false },
            { fileName: "adult4.csv", fileFolder: false, activeFile: false },
            { fileName: "adult5.csv", fileFolder: false, activeFile: true }
        ]
        const fileList = active ? bfileList : afileList
        console.log(active)
        console.log(fileList)
        this.setState({ fileList })

        // 正式用的
        // const init = {
        // 	method: 'GET',
        // 	mode: 'cors',
        // 	body: JSON.stringify(stream),
        // 	headers: {
        // 		"Content-Type": "application/json;charset=utf-8"
        // 	},
        // }
        // const res = await fetchTool("/getFileList", init)
        // if (res.code === 200) {
        //    this.setState({fileList: res.data})
        // }
    }

    render() {
        const { currentTab, clickTab } = this.props;

        if (currentTab !== "2") return <Fragment></Fragment>;

        if (clickTab === "2") {
            const { fileList, filePath, isCommonly } = this.state;
            return (
                <Fragment>
                    <Row className={styles.header} >
                        <Col span={16} >
                            <Row>
                                <Col span={4} style={{ paddingTop: 20 }} >
                                    <h2
                                        className={styles.headerFont}
                                    >DataSet</h2>
                                </Col>
                                <Col span={1} >
                                    <Tooltip placement="bottom" title="返回上一页" >
                                        <Button
                                            icon="arrow-left"
                                            shape="circle"
                                            style={{
                                                marginTop: 20,
                                                fontSize: 30,
                                                padding: 0,
                                                border: 0
                                            }}
                                            onClick={this.onBack}
                                        />
                                    </Tooltip>
                                </Col>
                                <Col span={19} style={{ paddingTop: 30, paddingLeft: 10 }} >
                                    {
                                        filePath.map((path, index) => {
                                            if (index === '0') {
                                                return <div style={{ display: "inline" }} >
                                                    <h5 style={{ display: "inline" }} >
                                                        <a onClick={this.handleChangePathByPathIndex.bind(this, index)} >{path}</a>
                                                    </h5>
                                                </div>
                                            } else return <div style={{ display: "inline" }} >
                                                <h5 style={{ display: "inline" }} >
                                                    &nbsp;&nbsp;/&nbsp;&nbsp;
                                                    <a onClick={this.handleChangePathByPathIndex.bind(this, index)} >{path}</a>
                                                </h5>
                                            </div>
                                        })
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4} >
                            <Tooltip placement="bottom" title="查询文件或文件夹" >
                                <Search
                                    placeholder="请输入文件名"
                                    onSearch={this.handleRearch}
                                    style={{ width: "100%", marginTop: "35px" }}
                                    enterButton
                                />
                            </Tooltip>
                        </Col>
                        <Col span={4} style={{ paddingLeft: "20px" }} >

                            {/* 上传文件 */}
                            <UploadFile />

                            <Tooltip placement="bottom" title="新建文件夹" >
                                <Button
                                    icon="folder-add"
                                    className={styles.buttonStyle}
                                    onClick={this.setNewDirVisible}
                                />
                                <Modal
                                    onOk={this.setNewDirOperate}
                                    onCancel={this.setNewDirVisible}
                                >
                                </Modal>
                            </Tooltip>

                            {/* 常用文件列表 */}
                            <ActiveFileList
                                getStartFileList={this.getStartFileList}
                                isCommonly={isCommonly}
                            />
                            <Tooltip placement="bottom" title="返回根目录" >
                                <Button
                                    icon="home"
                                    className={styles.buttonStyle}
                                    onClick={this.handleClickHome}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                    <div style={{ height: "calc(100vh - 185px)" }} >
                        <DataSetCard
                            handleClickFile={this.handleClickFile}
                            handleClickFileFolder={this.handleClickFileFolder}
                            getFileList={this.getFileList}
                            fileList={fileList}
                            handleDeleteFile={this.handleDeleteFile}
                            filePath={filePath}
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