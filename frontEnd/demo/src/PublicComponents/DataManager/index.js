import React from "react"
import { message, Button, Icon, Row, Col, Modal } from 'antd';
import DragM from "dragm";
import { fetchTool } from '../../FetchTool';
import EditableTable from './EditableTable';
import HdfsFileTreeModal from '../DataOperate/FileOperate/HdfsFileTreeModal';

import UploadFile from './UploadFile';
import style from './index.less';
class BuildModalTitle extends React.Component {
    updateTransform = transformStr => {
        this.modalDom.style.transform = transformStr;
    };
    componentDidMount() {
        this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
        )[0];
    }
    render() {
        const { title } = this.props;
        return (
            <DragM updateTransform={this.updateTransform}>
                <div>{title}</div>
            </DragM>
        );
    }
}

class DataManager extends React.Component {


    state = {
        addCommonFileModalVisible: false,
        deleteCommonFileModalVisible: false,
        fileOppositePath: '',
        items: [],
        replacevalue: true,
        setheadervalue: true
    }

	/**
	 * 添加常用文件取消键触发
	 */
    addCommonFileCancel = e => {
        this.setState({
            addCommonFileModalVisible: false
        })
    }
    async componentWillMount() {
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        }
        const res = await fetchTool("/module", init)
        if (res.code === 200) {
            this.setState({
                items: res.data.files
            })
        }
    }
	/**
	 * 删除常用文件取消键触发
	 */
    deleteCommonFileCancel = e => {
        this.setState({
            deleteCommonFileModalVisible: false
        })
    }
    deleteCommonFile = key => {

        console.log(key)
    }
	/**
	 * 选择树文件点击触发函数
	 */
	/**
   * 操作常用文件触发函数
   */
    addCommonFile = () => {
        this.setState({
            addCommonFileModalVisible: true
        });
    }


    getCookieValue = (name) => {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        return arr;
    }

    setCommonFile = async () => {
        console.log(document.cookie)
        let formData = new FormData();
        formData.append('oppositePath', this.state.fileOppositePath)
        const init = {
            method: 'POST',
            body: formData,
            mode: 'cors',
            credentials: 'include'
        }
        const res = await fetchTool('/commonFiles/setNewFile', init)
        if (res.code === 200) {
            message.success(res.message);
            const init = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                credentials: 'include'
            }
            const result = await fetchTool("/module", init)
            if (result.code === 200) {
                this.setState({
                    items: result.data.files
                })
            }
        }
        if (res.code === 409) {
            message.error(res.message);
        }
        if (res.code === 412) {
            message.error("请选择一个文件!");
        }

    }
    onSelect = (key, event) => {
        if (key != []) {
            this.setState({
                fileOppositePath: event.node.props.dataRef.totalPath
            });
        }
    }

    getreplace = () => {
        return this.state.replace
    }

    handleDelete = async (filePath) => {
        const oppositePath = filePath === undefined ? undefined :
            "/" + filePath.split("/").slice(4 - filePath.split("/").length).join("/");
        let formData = new FormData();
        formData.append('oppositePath', oppositePath)
        const init = {
            method: 'POST',
            body: formData,
            mode: 'cors',
            credentials: 'include'
        }
        const res = await fetchTool('/commonFiles/deleteFiles', init)
        if (res.code === 201) {
            this.setState({
                items: this.state.items.filter(
                    r => (r.filePath !== filePath))
            });
            message.success(res.message);
        }
        if (res.code === 410) {
            message.error(res.message);
        }

    };
    render() {

        const addCommonFilesTitle = <BuildModalTitle title="HDFS文件列表" />;
        return (

            <Row>
                <Col span={12}>
                    <Row ><b><h2 className={style.box}>&nbsp;文件下载</h2></b></Row>
                    <Row style={{ height: 250 }}></Row>
                    <Row ><b><h2 className={style.box}>&nbsp;文件上传</h2></b></Row>
                    <Row style={{ height: 40 }}></Row>
                    <Row>
                        <Col offset={2} style={{ height: 240, overflow: "auto" }}>
                            <Row>
                                <UploadFile></UploadFile>
                                <br />
                            </Row>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </Col>

                <Col span={12}>
                    <Row ><b><h2 className={style.box}>&nbsp;常用文件管理</h2></b></Row>
                    <Row>

                        <EditableTable item={this.state.items} handleDelete={this.handleDelete} />

                        <Button onClick={this.addCommonFile}  ><Icon type="file-add" />添加常用数据集</Button>
                        <Modal title={addCommonFilesTitle}
                            visible={this.state.addCommonFileModalVisible}
                            centered
                            onOk={this.setCommonFile}
                            onCancel={this.addCommonFileCancel}
                            okText="标注为常用文件"
                            cancelText="取消"
                        >
                            <p>
                                <HdfsFileTreeModal
                                    onSelect={this.onSelect.bind(this)}
                                />
                            </p>
                        </Modal>
                    </Row>
                </Col>
            </Row>
        )
    }
}
export default DataManager;
