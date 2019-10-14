import React from "react"
import { Upload, message, Button, Icon, Row, Col, Divider ,Menu,Modal} from 'antd';
import DragM from "dragm";
import { fetchTool } from '../../FetchTool';
import EditableTable from './EditableTable';
import HdfsFileTreeModal from '../DataOperate/FileOperate/HdfsFileTreeModal';
import { async } from "q";
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
        items:[]
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
        //const deleteCommonFilesTitle = <BuildModalTitle title="删除常用文件" />;
        const props = {
            name: 'file',
            action: 'http://localhost:8888/hdfs/uploadwithheader',
            headers: {
                Cookie: this.getCookieValue("loginToken")
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }
        return (
            <div >
                <Row>
                    <Col span={12}>
                        <Row style={{ height: 200 }}></Row>
                        <Row>
                            <Col span={20} style={{ height: 240, overflow: "auto" }}>
                                <Upload {...props} >
                                    <Button>
                                        <Icon type="upload" /> Click to Upload
    		                        </Button>
                                </Upload>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>

                    <Col 
                    span={12}>
                
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
                        
						
						 <EditableTable item={this.state.items} handleDelete= {this.handleDelete} />
							
                    
                    
                    </Col>
                </Row>

            </div>
        )

    }
}
export default DataManager;
