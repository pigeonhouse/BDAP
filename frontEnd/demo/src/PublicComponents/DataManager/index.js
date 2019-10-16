import React from "react"
import { Upload, message, Button, Icon, Row, Col, Divider ,Menu,Modal,Radio} from 'antd';
import DragM from "dragm";
import { fetchTool } from '../../FetchTool';
import EditableTable from './EditableTable';
import HdfsFileTreeModal from '../DataOperate/FileOperate/HdfsFileTreeModal';
import style from './index.less';
const SubMenu = Menu.SubMenu;
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
        items:[],
        replacevalue:true,
        setheadervalue:true
    }
    
	/**
	 * 添加常用文件取消键触发
	 */
	addCommonFileCancel = e => {
		this.setState({
			addCommonFileModalVisible: false
		})
    }
    async componentWillMount()
    {
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
               items:res.data.files
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
                   items:result.data.files
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
    onSelect=(key,event)=>{
        if(key!=[]){
      this.setState({
          fileOppositePath:event.node.props.dataRef.totalPath
      });
    }
    }
    onChangereplace=(value)=>{
        this.setState({replacevalue:value})
    }
    onChangesetHeader=(value)=>{
        this.setState({setheadervalue:value})
    }
    getreplace=()=>
    {
        return this.state.replace
    }
    handleUploadData()
  {
    let d={replace:this.state.replacevalue,
        withHeader:this.state.setheadervalue}
    return d;
  }
  handleDelete = async(filePath) => {
    const oppositePath=filePath===undefined?undefined:
    "/"+filePath.split("/").slice(4-filePath.split("/").length).join("/");
    let formData = new FormData();
		formData.append('oppositePath',oppositePath)
		const init = {
			method: 'POST',
			body:formData,
			mode: 'cors',
      credentials: 'include'
		}
    const res = await fetchTool('/commonFiles/deleteFiles', init)
    if (res.code === 201) {
       this.setState({items:this.state.items.filter(
        r=>(r.filePath!==filePath))});
      message.success(res.message);
		}
		if (res.code === 410) {
			message.error(res.message);
		}
    
  };
   render() {

        const addCommonFilesTitle = <BuildModalTitle title="HDFS文件列表" />;
        const data={"replace":this.state.replace}
        //const deleteCommonFilesTitle = <BuildModalTitle title="删除常用文件" />;
        let formData = new FormData();
		    formData.append('replace',this.state.replace)
        const props = {
            name: 'file',
            action: 'http://localhost:8888/hdfs/uploadwithheader',
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                   
                     if (info.file.response.code === 413)
                     message.error(info.file.response.message);
                     if (info.file.response.code === 200)
                     message.success(`${info.file.name} file uploaded successfully`);
                     if (info.file.response.code === 410)
                     message.error("输入非法，请选择正确的CSV格式文件进行上传！");
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }
        return (
            <div >
                <Row>
                    <Col span={12}>
                        <Row ><b><h2 className={style.box}>&nbsp;文件下载</h2></b></Row>
                        <Row style={{ height: 250 }}></Row>
                        <Row ><b><h2 className={style.box}>&nbsp;文件上传</h2></b></Row>
                        <Row style={{ height: 40 }}></Row>
                        <Row>
                            <Col offset={2}  style={{ height: 240, overflow: "auto" }}>
                            <Row>
                                <Upload {...props} withCredentials={true} data={()=>this.handleUploadData()}>
                                    <Button>
                                        <Icon type="upload" /> 将文件上传至HDFS
    		                        </Button>
                                </Upload>
                                <br />
                            </Row>
                            <Row>
                                <Radio.Group onChange={this.onChangereplace} defaultValue={true}>
                                 <p>是否覆盖原有文件: &nbsp;
                                 <Radio.Button value={true}>是</Radio.Button>
                                 <Radio.Button value={false}>否</Radio.Button>
                                 </p>
                                 </Radio.Group>
                            </Row>
                            <Row>
                                 <Radio.Group onChange={this.onChangesetHeader} defaultValue={true}>
                                 <p>是否带有表头: &nbsp;
                                 <Radio.Button value={true}>是</Radio.Button>
                                 <Radio.Button value={false}>否</Radio.Button>
                                 </p>
                                 
                                </Radio.Group>
                                </Row>
                            </Col>
                           
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                    
                    <Col span={12}>
                    <Row ><b><h2 className={style.box}>&nbsp;常用文件管理</h2></b></Row>
                    <Row>
						
                        
						
						 <EditableTable item={this.state.items} handleDelete= {this.handleDelete} />
							
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
                
            </div>
        )

    }
}
export default DataManager;
