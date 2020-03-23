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

/**
 * 数据交互界面
 * 将用户从后端存储的数据以文件夹及文件的形式展示给用户，为用户提供
 * 新建、删除文件夹，上传、下载数据（csv文件），数据可视化功能。
 */

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
        loading: true
    }

    /**
     * 点击文件file后，跳转到可视化界面
     * @param {object} file  文件的简要信息
     */
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
        const filePath = path === undefined ? filePathUpload + fileName : path;

        this.setState({
            status: 'visiual',
            dataPreviewUrl: `/experiment-service/query/readyForData?filePath=${filePath}`,
        })

        this.props.handleClickEnter();
    }

    /**
     * 按子组件传递的attribute值，修改setState中对应的值
     * @param {object} attributes  子组件传递给DataSetPanel的需要修改的属性
     */
    updateAttributes = async (attributes) => {
        await this.setState({ ...attributes });
    }

    /**
     * 对于数组filePath，做一个转换，变为string类型的文件路径path
     * @param {array} filePath  当前所处的文件路径
     */
    getPathByFilePath = (filePath) => {
        var path = '/';
        filePath.map((item) => {
            path += item + '/';
        })
        return path;
    }

    /**
     * 根据path向后端请求拿到fileList，即当前路径下的文件列表，类型为array
     * @param {string} path  当前路径
     */
    getFileListByPath = async (path) => {
        const url = `/filesystem-service/ls?path=${path}`;

        const response = await fetchTool(url, init);
        if (response.status === 200) {
            return await response.json();
        }
    }

    // 初始化state中的参数
    async componentWillMount() {
        const response = await this.getFileListByPath('/');

        const attributes = {
            fileList: response || [],
            filePathUpload: '/',
            loading: false
        }

        this.updateAttributes(attributes);
    }

    // 当前页面显示常用文件时，更新CommonFileList
    handleUpdateCommonFileList = async () => {
        const response = await fetchTool("/filesystem-service/ls/common", init);

        if (response.status === 200) {
            const fileList = await response.json();

            const attributes = {
                fileList,
                loading: false
            };

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

    /**
     * 子组件用来更新文件列表的函数，在点开下一级文件夹，搜索文件或查看常用文件时使用
     * status 有四种类别：
     * 1.common 表示界面处在常用文件夹下
     * 2.search 表示界面处在搜索文件下
     * 3.normal 表明界面展示的是：默认的当前左上角显示的路径下的文件及文件夹
     * 4.visiual 表明进入可视化界面
     */
    handleUpdateFileList = async () => {
        await this.setState({ loading: true });

        const { filePath, status } = this.state;
        if (status === 'common') return this.handleUpdateCommonFileList();

        const path = this.getPathByFilePath(filePath);
        const dataDir = await this.getFileListByPath(path);

        this.setState({
            fileList: dataDir,
            filePathUpload: path,
            loading: false
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
                                    {/* 回退到上一级路径 */}
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
                            {/* 搜索文件及文件夹 */}
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
                                handleUpdateCommonFileList={this.handleUpdateFileList}
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

                        {/* 对文件及文件夹的可视化展示 */}
                        <DataSetCard
                            handleUpdateFileList={this.handleUpdateFileList}
                            updateAttributes={this.updateAttributes}
                            handleClickFile={this.handleClickFile}
                            fileList={fileList}
                            filePathUpload={filePathUpload}
                            status={status}
                            filePath={filePath}
                            loading={this.state.loading}
                        />
                    </div>
                </Fragment>
            );
        } else {
            const { status, dataPreviewUrl } = this.state;
            return (
                <div style={{ paddingTop: 25 }}>
                    {/* 在点开某个文件之后，将进入可视化界面 */}
                    <VisualizedPanel url={status === 'visiual' ? dataPreviewUrl : null} height={130} />
                </div>
            );
        }
    }
}

export default DataSetPanel;