
import React from 'react';
import { Table, Input, Button, Popconfirm, Form,message } from 'antd';
import {fetchTool} from '../../../FetchTool'
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };



  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
function filepathmap(item)
{
  item.filePath=item.filePath===undefined?undefined:
        "/"+item.filePath.split("/").slice(4-item.filePath.split("/").length).join("/");
  return item

}
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.columns = [
      {
				title: 'fileName',
				dataIndex: 'label',
				key: 'label',
				
			  },
			{
				title: 'filePath',
				dataIndex: 'filePath',
				key: 'filePath',
			},
		
      {
        title: 'operate',
        dataIndex: 'operate',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDelete(record.label)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: this.props.items.map(r=>(filepathmap(r)))
       
    };
    console.log(this.state.dataSource)
  }
  


  
  getCookieValue = (name) => {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		return arr;
	}
  handleDelete = async(label) => {
    const dataSource = [...this.state.dataSource];
    const filePath=dataSource.filter (r=>(r.label===label))[0].filePath
    let formData = new FormData();
		let cookie = this.getCookieValue("loginToken")
		formData.append('oppositePath',filePath)
		const init = {
			method: 'POST',
			body:formData,
			mode: 'cors',
      credentials: 'include'
		}
    console.log(dataSource)
    const res = await fetchTool('/commonFiles/deleteFiles', init)
    if (res.code === 201) {
      this.setState({ dataSource: dataSource.filter(
        r=>(r.label!==label))});
			message.success(res.message);
		}
		if (res.code === 410) {
			message.error(res.message);
		}
    
  };

 

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={this.state.dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
export default EditableTable;