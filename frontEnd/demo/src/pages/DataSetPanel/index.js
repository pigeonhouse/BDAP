import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Tooltip } from 'antd';
import CommonFileList from '../../PublicComponents/FileOperate/CommonFileList';
import UploadFile from '../../PublicComponents/FileOperate/UploadFile';
import SetNewDir from '../../PublicComponents/FileOperate/SetNewDir';
import VisualizedPanel from '../VisualizedPanel';
import DataSetCard from '../../PublicComponents/DataSetCard';
import styles from './index.less';

import { fetchTool } from '../../FetchTool';

const { Search } = Input;

class DataSetPanel extends React.Component {

    state = {
        filePath: [],
        fileList: [],
        fileBackup: [],
        isCommonly: false,
        dataPreviewUrl: null,
    }

    getPathByFilePath = (filePath) => {
        var path = '/';
        filePath.map((item) => {
            path += item + '/';
        })
        return path;
    }

    getFileListByPath = async (path) => {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        };
        const url = `/filesystem-service/ls?path=${path}`;

        const response = await fetchTool(url, init);
        if (response.status === 200) {
            return await response.json();
        }
    }

    async componentWillMount() {
        const res = await this.getFileListByPath('/');

        this.setState({
            fileBackup: JSON.parse(JSON.stringify(res || [])),
            fileList: res || [],
        })
    }

    // 点击文件，跳转到可视化界面
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

        const { fileList, filePath, isCommonly } = this.state;
        var path = '';

        if (isCommonly === true) {
            path = fileList[index].path;
        }
        else {
            path = this.getPathByFilePath(filePath);
        }

        this.setState({
            dataPreviewUrl: `/experiment-service/query/readyForData?filePath=${path}${fileList[index].fileName}`,
        })
        this.props.handleClickEnter();
    }

    // 点击文件夹，跳转到文件夹下
    handleClickFileFolder = async (index) => {
        //这里放入向后端请求的的子文件夹内数据
        const fileName = this.state.fileList[index].fileName;
        const filePath = this.state.filePath;
        const path = this.getPathByFilePath(filePath);
        const dataDir = await this.getFileListByPath(path + fileName);

        this.setState({
            fileList: dataDir.map(r => r),
            filePath: filePath.concat(fileName)
        });
    }

    // 点击路径上的文件夹，跳转到该文件夹下
    handleChangePathByPathIndex = async (index) => {
        const { isCommonly } = this.state;
        if (isCommonly === true) return;

        // 新路径
        const newfilePath = this.state.filePath.filter((path, idx) => idx <= index).map(r => r);
        const path = this.getPathByFilePath(newfilePath);
        const dataDir = await this.getFileListByPath(path || '/');

        this.setState({
            fileList: dataDir.map(r => r),
            fileBackup: dataDir.map(r => r),
            filePath: newfilePath
        });
    }

    //返回根目录，将filePath的数据清空
    handleClickHome = async () => {
        if (this.state.filePath.length === 0) return;
        //从新向后端请求对应的目录的filelist文件
        const res = await this.getFileListByPath('/');

        this.setState({
            isCommonly: false,
            filePath: [],
            fileBackup: JSON.parse(JSON.stringify(res || [])),
            fileList: res || [],
        })
    }

    //文件删除的操作，此时需要向后端传递数据，只完成了前端的逻辑处理
    handleDeleteFile = async (index) => {
        const { fileList, fileBackup, filePath } = this.state;

        const { fileName, isDir } = fileList[index];

        var path = '';
        if (fileList[index].path === undefined) {
            path = this.getPathByFilePath(filePath);
        } else {
            path = fileList[index].path;
        }
        var url = `/filesystem-service?path=${path + fileName}`;
        if (isDir === true) url += '/';

        const init = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        }

        const response = await fetchTool(url, init);

        if (response.status === 200) {
            const fileTemp = fileList[index];
            const indexBackup = this.getFileBackupIndex(fileTemp);
            fileList.splice(index, 1);
            fileBackup.splice(indexBackup, 1);

            this.setState({ fileBackup, fileList });
        }
    }

    //输入框的搜索
    handleRearch = (searchText) => {
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

    // 获取常用文件列表
    getStarFileList = async () => {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        }
        const response = await fetchTool("/filesystem-service/ls/common", init);
        const resFile = await response.json();
        this.setState({
            filePath: ['常用文件列表'],
            fileList: resFile,
            fileBackup: JSON.parse(JSON.stringify(resFile)),
            isCommonly: true
        })
    }

    getFileBackupIndex = (fileTemp) => {
        const { fileBackup } = this.state;
        for (let indexTemp in fileBackup) {
            const dataTemp = fileBackup[indexTemp];
            if (dataTemp.fileName !== fileTemp.fileName || dataTemp.isDir !== fileTemp.isDir) continue;

            if (this.state.isCommonly) {
                if (fileTemp.path === dataTemp.path) return indexTemp;
                else continue;
            }
            else return indexTemp;
        }
    }

    // 取消此文件的常用文件
    handleCancelStar = async (index) => {
        const { fileList, filePath, fileBackup } = this.state;
        const { fileName, path } = fileList[index];

        // 取消常用文件
        var starFilePath = '';
        if (path === undefined) {
            starFilePath = this.getPathByFilePath(filePath);
        } else {
            starFilePath = path;
        }
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        }
        const url = `/filesystem-service/common-files/cancel?path=${starFilePath + fileName}`;

        const response = await fetchTool(url, init);

        // 得到请求后实现
        if (response && response.status === 200) {
            const fileTemp = fileList[index];
            const indexBackup = this.getFileBackupIndex(fileTemp);

            if (this.state.isCommonly) {
                fileList.splice(index, 1);
                fileBackup.splice(indexBackup, 1);
            } else {
                fileList[index].isCommonFile = false;
                fileBackup[indexBackup].isCommonFile = false;
            }

            this.setState({ fileList, fileBackup });
        }
    }

    // 选择此文件为常用文件
    handleSelectStar = async (index) => {
        const { fileList, filePath, fileBackup } = this.state;
        const { fileName, path } = fileList[index];

        // 请求设置为常用文件
        var starFilePath = '';
        if (path === undefined) {
            starFilePath = this.getPathByFilePath(filePath);
        } else {
            starFilePath = path;
        }
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        }
        const url = `/filesystem-service/common-files/set?path=${starFilePath + fileName}`;

        const response = await fetchTool(url, init);
        console.log(response);

        // 得到请求后实现
        if (response && response.status === 200) {
            const fileTemp = fileList[index];
            const indexBackup = this.getFileBackupIndex(fileTemp);
            fileList[index].isCommonFile = true;
            fileBackup[indexBackup].isCommonFile = true;
            console.log(fileList, fileBackup)

            this.setState({ fileList, fileBackup });
        }
    }

    // 更新文件列表
    handleUpdateFileList = async () => {
        const path = this.getPathByFilePath(this.state.filePath);
        const dataDir = await this.getFileListByPath(path || '/');

        this.setState({
            fileList: dataDir.map(r => r),
            fileBackup: dataDir.map(r => r),
        });
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

    _handleDownloadFile = async (index) => {
        const { fileList, filePath } = this.state;
        const { fileName } = fileList[index];

        var path = '';
        if (fileList[index].path === undefined) {
            path = this.getPathByFilePath(filePath);
        } else {
            path = fileList[index].path;
        }

        const url = `/experiment-service/query/readyForData?filePath=${path + fileName}`;
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
        }
        const response = await fetchTool(url, init);

        if (response.status === 200) {
            const data = await response.text();
            this.downFile(data);
        }
    }

    get handleDownloadFile() {
        return this._handleDownloadFile;
    }
    set handleDownloadFile(value) {
        this._handleDownloadFile = value;
    }

    downFile = (list) => {
        var elementA = document.createElement('a');
        elementA.download = "Dataset.csv";
        elementA.style.display = 'none';
        var blob = new Blob([list], {
            type: "text/csv;charset=" + 'utf-8' + ";"
        });
        elementA.href = URL.createObjectURL(blob);
        document.body.appendChild(elementA);
        elementA.click();
        document.body.removeChild(elementA);
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
                                    <h2 className={styles.headerFont}
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
                        <Col span={3} >
                            <Tooltip placement="bottom" title="查询文件或文件夹" >
                                <Search
                                    placeholder="请输入文件名"
                                    onSearch={this.handleRearch}
                                    style={{ width: "100%", marginTop: "35px" }}
                                    enterButton
                                />
                            </Tooltip>
                        </Col>
                        <Col span={5} style={{ paddingLeft: "20px" }} >

                            {/* 上传文件 */}
                            <UploadFile
                                handleUpdateFileList={this.handleUpdateFileList}
                                filePath={filePath}
                                type="current"
                            />

                            {/* 新建文件夹 */}
                            <SetNewDir
                                handleUpdateFileList={this.handleUpdateFileList}
                                filePath={filePath}
                                type="current"
                            />

                            {/* 常用文件列表 */}
                            <CommonFileList
                                getStarFileList={this.getStarFileList}
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
                            handleCancelStar={this.handleCancelStar}
                            handleSelectStar={this.handleSelectStar}
                            handleDeleteFile={this.handleDeleteFile}
                            handleDownloadFile={this.handleDownloadFile}
                            fileList={fileList}
                            filePath={filePath}
                            isCommonly={isCommonly}
                        />
                    </div>
                </Fragment>
            );
        } else {
            const { dataPreviewUrl } = this.state;
            return (
                <div style={{ paddingTop: 25 }}>
                    <VisualizedPanel url={dataPreviewUrl} height={130} />
                </div>
            );
        }
    }
}

export default DataSetPanel;