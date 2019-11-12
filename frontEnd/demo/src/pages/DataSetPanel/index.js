import React, { Fragment } from 'react';
import { Row, Col } from 'antd';

import FilePathShow from '../../PublicComponents/FileOperate/FilePathShow';
import ReturnHome from '../../PublicComponents/FileOperate/ReturnHome';
import GoBackPanel from '../../PublicComponents/FileOperate/GoBackPanel';
import SearchFile from '../../PublicComponents/FileOperate/SearchFile';
import CommonFileList from '../../PublicComponents/FileOperate/CommonFileList';
import UploadFile from '../../PublicComponents/FileOperate/UploadFile';
import SetNewDir from '../../PublicComponents/FileOperate/SetNewDir';
import VisualizedPanel from '../VisualizedPanel';
import DataSetCard from '../../PublicComponents/DataSetCard';
import styles from './index.less';

import { fetchTool } from '../../FetchTool';

const init = {
    method: 'GET',
    mode: 'cors',
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
};

class DataSetPanel extends React.Component {

    /**
     * filePath: 左上角展示文件路径
     * filePathUpload：上传时直接使用的路径
     * fileList: 当前路径下，页面显示的文件或文件夹列表
     * status: 当前界面的状态，分为四个：normal，common，search，visiual
     * dataPreviewUrl：可视化界面进入时的url
     */
    state = {
        filePath: [],
        filePathUpload: null,
        fileList: [],
        status: 'normal',
        dataPreviewUrl: null,
    }

    // 点击文件，跳转到可视化界面
    handleClickFile = (file) => {
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

        const { filePathUpload } = this.state;
        const { fileName, path } = file;
        const filePath = path === undefined ? filePathUpload : path;

        this.setState({
            dataPreviewUrl: `/experiment-service/query/readyForData?filePath=${filePath}${fileName}`,
        })

        this.props.handleClickEnter();
    }

    // 修改父组件的值
    updateAttributes = async (attributes) => {
        await this.setState({ ...attributes });
    }

    // 根据filePath，返回string类型path
    getPathByFilePath = (filePath) => {
        var path = '/';
        filePath.map((item) => {
            path += item + '/';
        })
        return path;
    }

    // 根据path向后端请求拿到fileList
    getFileListByPath = async (path) => {
        const url = `/filesystem-service/ls?path=${path}`;

        const response = await fetchTool(url, init);
        if (response.status === 200) {
            return await response.json();
        }
    }

    async componentWillMount() {
        const response = await this.getFileListByPath('/');

        const attributes = {
            fileBackup: JSON.parse(JSON.stringify(response || [])),
            fileList: response || [],
            filePathUpload: '/'
        }

        this.updateAttributes(attributes);
    }

    // 当前页面显示常用文件时，更新CoomonFileList
    handleUpdateCommonFileList = async () => {
        const response = await fetchTool("/filesystem-service/ls/common", init);

        if (response.status === 200) {
            const fileList = await response.json();

            const attributes = { fileList };

            this.updateAttributes(attributes);
        }
    }

    // 当前页面显示为搜索文件时，更新FileBackup
    handleUpdateSearchFileBackup = (fileList) => {
        this.child.updateFileBackup(fileList);
    }

    onRef = (ref) => {
        this.child = ref;
    }

    // 更新文件列表
    handleUpdateFileList = async () => {
        const { filePath, status } = this.state;
        if (status === 'common') return this.handleUpdateCommonFileList();

        const path = this.getPathByFilePath(filePath);
        const dataDir = await this.getFileListByPath(path);

        this.setState({
            fileList: dataDir,
            filePathUpload: path
        });
        if (status === 'search') return this.handleUpdateSearchFileBackup(dataDir);
    }

    render() {
        const { currentTab, clickTab } = this.props;

        if (currentTab !== "2") return <Fragment></Fragment>;

        if (clickTab === "2") {
            const { fileList, filePath, status, filePathUpload } = this.state;
            return (
                <Fragment>
                    <Row className={styles.header} >
                        <Col span={16} >
                            <Row>
                                <Col span={4} style={{ paddingTop: 20 }} >
                                    <h2 className={styles.headerFont} >DataSet</h2>
                                </Col>
                                <Col span={1} >
                                    <GoBackPanel
                                        filePath={filePath}
                                        status={status}
                                        updateAttributes={this.updateAttributes}
                                        handleUpdateFileList={this.handleUpdateFileList}
                                    />
                                </Col>
                                <Col span={19} style={{ paddingTop: 30, paddingLeft: 10 }} >
                                    {/* 文件路径展示的组件 */}
                                    <FilePathShow
                                        updateAttributes={this.updateAttributes}
                                        handleUpdateFileList={this.handleUpdateFileList}
                                        filePath={filePath}
                                        status={status}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={3} >
                            <SearchFile
                                onRef={this.onRef}
                                updateAttributes={this.updateAttributes}
                                status={status}
                                fileList={fileList}
                            />
                        </Col>
                        <Col span={5} style={{ paddingLeft: "20px" }} >

                            {/* 上传文件 */}
                            <UploadFile
                                handleUpdateFileList={this.handleUpdateFileList}
                                filePath={filePath}
                                type="current"
                                status={status}
                            />

                            {/* 新建文件夹 */}
                            <SetNewDir
                                handleUpdateFileList={this.handleUpdateFileList}
                                filePath={filePath}
                                status={status}
                                type="current"
                            />

                            {/* 常用文件列表 */}
                            <CommonFileList
                                handleUpdateCommonFileList={this.handleUpdateCommonFileList}
                                updateAttributes={this.updateAttributes}
                                status={status}
                            />

                            {/* 返回根目录 */}
                            <ReturnHome
                                updateAttributes={this.updateAttributes}
                                handleUpdateFileList={this.handleUpdateFileList}
                            />
                        </Col>
                    </Row>
                    <div style={{ height: "calc(100vh - 185px)" }} >
                        <DataSetCard
                            handleUpdateFileList={this.handleUpdateFileList}
                            updateAttributes={this.updateAttributes}
                            handleClickFile={this.handleClickFile}
                            fileList={fileList}
                            filePathUpload={filePathUpload}
                            status={status}
                            filePath={filePath}
                        />
                    </div>
                </Fragment>
            );
        } else {
            const { status, dataPreviewUrl } = this.state;
            return (
                <div style={{ paddingTop: 25 }}>
                    <VisualizedPanel url={status === 'visiual' ? dataPreviewUrl : null} height={130} />
                </div>
            );
        }
    }
}

export default DataSetPanel;