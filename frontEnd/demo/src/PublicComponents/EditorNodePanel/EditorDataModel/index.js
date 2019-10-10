import React from 'react';
import { ItemPanel, Item } from '@src';
import { Menu, Icon,Modal,Button,Tree,message, Table,Popconfirm } from 'antd';
import ItemDecoration from '../ItemDecoration';
import DragM from "dragm";
import { fetchTool } from '../../../FetchTool';
import EditableTable from './EditableTable';
/**
 * 左侧下拉菜单栏，包括可操作实现的组件
 * 整理为一个通用的组件，将关于数据源的名字数组传入即可
 * 
*/
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
class FlowDataModel extends React.Component {
	state = {
		addCommonFileModalVisible:false,
		deleteCommonFileModalVisible:false,
		fileOppositePath:''
	}
	/**
	 * 添加常用文件取消键触发
	 */
	addCommonFileCancel=e=>
    {
		this.setState({
			addCommonFileModalVisible:false
		})
	}
	/**
	 * 删除常用文件取消键触发
	 */
	deleteCommonFileCancel=e=>
    {
		this.setState({
			deleteCommonFileModalVisible:false
		})
	}
	deleteCommonFile=key=>{

	 console.log(key)
	}
	/**
	 * 选择树文件点击触发函数
	 */
	onSelect = (keys) => {
		console.log('Trigger Select', keys[0]);
		this.setState({
			fileOppositePath:keys[0]
		})
	  };
	  /**
	 * 点击导航菜单操作常用文件触发函数
	 */
    operateCommonFile=e=>
	{
		if(e.key==="add")
		{
		this.setState({
			addCommonFileModalVisible:true
		})
		}
		if(e.key==="delete")
		this.setState({
			deleteCommonFileModalVisible:true
		})
	}
	
	getCookieValue=(name) =>{
		 var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		return arr;
	}
	setCommonFile=async()=>
	{
		console.log(document.cookie)
		let formData = new FormData();
		let cookie=this.getCookieValue("loginToken")
		formData.append('oppositePath', this.state.fileOppositePath)
		 const init = {
			method: 'POST',
			body: formData,
			mode: 'cors',
			headers: {
				"Cookie": cookie
			},
		}
		const res = await fetchTool('/commonFiles/setNewFile', init)
			if (res.code === 200) {
					message.success(res.message);
			}
			if(res.code === 409){
					message.error(res.message);
			}
			if(res.code === 412){
				message.error("请选择一个文件!");
		    }
			
	}
	createLabelArray = (fileColumnsInfo) => {
		var labelArray = new Array();
		fileColumnsInfo.map((item)=>{
			labelArray.push([item.colName, false]);
		})
		return labelArray;
	}

	createDataPanel = (item) => {
		var result = [];
		var menu;
		for (let i in item) {
			menu = item[i];
			result.push(
				<Menu.Item key={i}><ItemPanel>
					<Item
						type="node"
						size="200*40"
						shape='zero-one'
						model={{
							labelName: {
								label: menu.label,
								elabel: menu.elabel,
							},
							groupName: {
								label: "数据源",
								elabel: 'datasource',
							},
							filePath:menu.filePath,
							anchor: [0, 1],
							labelArray: this.createLabelArray(menu.fileColumnsInfo),				
							keyConfig: {
								color_type: '#1890FF',
								state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
							}
						}}
					/>
				</ItemPanel></Menu.Item>);
		}
		return result;
	}
	
	
	render() {
		const addCommonFilesTitle = <BuildModalTitle title="HDFS文件列表" />;
		const deleteCommonFilesTitle = <BuildModalTitle title="删除常用文件" />;
		const { TreeNode, DirectoryTree } = Tree;
		var itemData = this.props.itemData;
		
		return (
			<Menu
				defaultOpenKeys={['sub1']}
				mode="inline"
				style={{ maxHeight: 'calc(100vh - 105px)', width: '280px', borderRight: 0 }}
				selectable={true}
				onClick={this.operateCommonFile.bind(this)}
			>
				<ItemDecoration />
				<SubMenu key="sub1"  title={<span><Icon type="mail" /><span>数据源</span></span>}>
					{this.createDataPanel(itemData)}
					<SubMenu key="sub2"  title={<span><Icon type="setting" /><span>常用数据集管理</span></span>} >
							<Menu.Item key="add"  ><Icon type="file-add" />添加常用数据集</Menu.Item>	     
							<Modal title={addCommonFilesTitle}
        						   visible={this.state.addCommonFileModalVisible}
								   centered
								   onOk={this.setCommonFile}
								   onCancel={this.addCommonFileCancel}
								   okText="标注为常用文件"
								   cancelText="取消"
								   
								   /*footer={[
        						   <Button onClick={() => this.setCommonFile()}>标注为常用文件</Button>
       							 ]}*/
    						>
	   						<p>
        					<Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={this.onSelect}>
       							 <TreeNode title="parent 1" key="0-0">
          							<TreeNode title="parent 1-0" key="0-0-0">
            							<TreeNode title="leaf" key="/adult.csv" />
           							 	<TreeNode title="leaf" key="0-0-0-1" />
            							<TreeNode title="leaf" key="0-0-0-2" />
          							</TreeNode>
        						 </TreeNode>
      						</Tree>
	  						</p>
    						</Modal>
							<Menu.Item key="delete" ><Icon type="delete" />删除常用数据集</Menu.Item>
							<Modal title={deleteCommonFilesTitle}
        						   visible={this.state.deleteCommonFileModalVisible}
								   centered
								   width={800}
								   onCancel={this.deleteCommonFileCancel}
								   footer={<Button onClick={this.deleteCommonFileCancel}>取消</Button>}
    						>
							<p>
							<EditableTable items={itemData}/>
							</p>	
							</Modal>
				   </SubMenu>
				</SubMenu>
			</Menu>
		);
	}
}

export default FlowDataModel;
