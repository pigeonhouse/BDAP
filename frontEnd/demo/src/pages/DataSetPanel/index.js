import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Tooltip } from 'antd';
import ActiveFileList from '../../PublicComponents/DataOperate/ActiveFileList';
import UploadFile from '../../PublicComponents/DataOperate/UploadFile';
import VisualizedPanel from '../VisualizedPanel';
import DataSetCard from '../../PublicComponents/DataSetCard';
import styles from './index.less';

const { Search } = Input;

class DataSetPanel extends React.Component {
    state = {
        homePath: "bdap/students/2017211511",
        filePath: ["2017211511",],
        fileList: [
            { fileName: "adult_1", fileFolder: true },
            { fileName: "adult_2", fileFolder: true },
            { fileName: "adult_3", fileFolder: true },
            { fileName: "adult1.csv", fileFolder: false, activeFile: false },
            { fileName: "adult2.csv", fileFolder: false, activeFile: true },
            { fileName: "adult3.csv", fileFolder: false, activeFile: false },
            { fileName: "adult4.csv", fileFolder: false, activeFile: false },
            { fileName: "adult5.csv", fileFolder: false, activeFile: true },
        ],
        fileBackup:[],
    }
    componentWillMount(){
        //data应该是从后端拿到的数据
        const data = this.state.fileList;
        this.setState({
            fileBackup:data
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
        console.log(this.state.fileList[index]);
    }

    handleChangePathByPathIndex = (index) => {
        console.log(this.state.filePath[index]);
    }
    //返回根目录，将filePath的数据清空
    handleClickHome = () => {
        //从新向后端请求对应的目录的filelist文件
        this.setState({
            filePath:[]
        })
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

    render() {
        const { currentTab, clickTab } = this.props;
        if (currentTab !== "2") return <Fragment></Fragment>;

        if (clickTab === "2") {
            const { filePath, fileList } = this.state;
            return (
                <Fragment>
                    <Row className={styles.header} >
                        <Col span={14} >
                            <h5 className={styles.headerFont} style={{ marginLeft: "50px" }} >.> &nbsp;&nbsp;</h5>
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