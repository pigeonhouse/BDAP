import React from 'react';
import FlowDataModel from '../../PublicComponents/EditorDataModel'

/**
 * 左侧菜单栏，表示数据的组件
 */
class FlowDataPanel extends React.Component {
	state = {
		dataTable: []
	}

	componentWillMount() {
		fetch(
			'http://localhost:3000/FileList'
		)
			.then((response) => {
				if (response.status === 200) {
					response.json().then((respData) => {
						this.setState({
							dataTable: respData,
						});
					})
				}
			})
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.dataTable.length !== 0) {
			this.setState({ dataTable: nextProps.dataTable })
		}
	}
	deleteFile = (dataName) => {
		const init = {
			method: 'POST',
			body: "fileName=" + dataName,
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
		}
		fetch(
			'http://localhost:3000/DeleteFile', init
		)
			.then((response) => {
				return response.json()
			})
			.then(a => { message.success(`${dataName}file deleted successfully`) })
			.catch(e => console.log('错误:', e))
	}
	deleteDataName = (dataName) => {
		var dataTable = this.state.dataTable;
		const index = dataTable.indexOf(dataName);
		dataTable.splice(index, 1);
		this.setState({ dataTable })
		this.deleteFile(dataName);
	}
	render() {
		// var children = [];
		// if(this.state.dataTable.length !== 0){
		//   var dataTable = this.state.dataTable;
		//   for(let i in dataTable){
		//     children.push(
		//       <Menu.Item key={i+3} > 
		//             <ItemPanel>
		//               <Item
		//                 type="node"
		//                 size="200*40"
		//                 shape='zero-one'
		//                 model={{
		//                   label: dataTable[i],
		//                   elabel: dataTable[i],
		//                   attr:{},
		//                   attrDetail:[],
		//                   Dataset: [],
		//                   labelArray: {}, 
		//                   length: 0,
		//                   anchor: [0, 1],
		//                   group:'input',
		//                   keyConfig:{
		//                     color_type: '#1890FF',
		//                     state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
		//                   }
		//                 }}
		//                 deleteDataName={this.deleteDataName}    
		//               />
		//             </ItemPanel>
		//       </Menu.Item>
		//     )
		//   }
		// }
		var dataTable = [{
			label: '本地数据',
			elabel: 'localFile'
		}, {
			label: 'Titanic测试',
			elabel: 'TitanicTestFile'
		}, {
			label: 'Titanic训练',
			elabel: 'TitanicTrainFile'
		}]
		return (
			<FlowDataModel itemData={dataTable}></FlowDataModel>
		);
	}
}

export default FlowDataPanel;
