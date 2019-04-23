import React, { Component } from 'react'
import { Button,Modal,Icon,message, Pagination,Table, Input, Popconfirm, Form, Divider} from 'antd'
import { withPropsAPI } from '@src';
import store from "../../store"
import { vgg,lenet } from "../../ExampleData/FlowData"
const nwData = {
  key: 0,
  Name: "LeNet-mnist",
  Date: 2019.4,
  Description: "利用经典的LeNet卷积神经网络进行手写字符识别",
  Model:{}
};
const FormItem = Form.Item;
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
    }
  
    toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
    }
  
    save = (e) => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    }
  
    render() {
      const { editing } = this.state;
      const {
        editable,
        dataIndex,
        title,
        record,
        index,
        handleSave,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editable ? (
            <EditableContext.Consumer>
              {(form) => {
                this.form = form;
                return (
                  editing ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `${title} is required.`,
                        }],
                        initialValue: record[dataIndex],
                      })(
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                          onBlur={this.save}
                        />
                      )}
                    </FormItem>
                  ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
                );
              }}
            </EditableContext.Consumer>
          ) : restProps.children}
        </td>
      );
    }
}
class Model extends Component{
    constructor(props) {
        super(props);
        this.columns = [{
          title: 'Name',
          dataIndex: 'Name',
          width: '30%',
          editable: true,
        }, {
          title: 'Date',
          dataIndex: 'Date',
          editable: true,
        }, {
          title: 'Description',
          dataIndex: 'Description',
          editable: true,
        }, {
          title: 'Operation',
          dataIndex: 'Operation',
          render: (text, record) => (
            this.state.dataSource.length >= 1
              ? (
                <div>
                    {/* <Popconfirm title="确定展示这个模型?" onConfirm={() => this.handleShow(record.key)}> */}
                    <a href="javascript:;" onClick={() => this.handleShow(record.key)}>调出</a>
                    {/* </Popconfirm> */}
                    <Divider type="vertical" />
                    <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
                    <a href="javascript:;">删除</a>
                    </Popconfirm>
                </div>
              ) : null
          ),
        }];
        this.handleStoreChange = this.handleStoreChange.bind(this)
        store.subscribe(this.handleStoreChange)
        nwData.Model = lenet;
        let nw2Data = {
          key: 1,
          Name: "VGG-16",
          Date: 2019.4,
          Description: "利用VGG-16识别cifar100数据集",
          Model:vgg
        };
        this.state = {
          dataSource:[nwData,nw2Data],
          count: 2
        };
    }
    state = {
      visible:false,
      editing: false,
    }
    handleStoreChange = () => {
      const sta = store.getState();
      if(!sta.did){
        const { count, dataSource } = this.state;
        const newData = {
          key: count,
          Name: sta.name,
          Date: 2019.4,
          Description: sta.info,
          Model:sta.Dataset
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
        const action = {
          type:'test',
          did:true,
          count:count+1
        }
        store.dispatch(action)
      }
    }
    ShowModal = () => {
      this.setState({
        visible: true,
      });
    }
    DisModal = () => {
      this.setState({
        visible: false,
      });
    }
    handleDelete = (key) => {
      const dataSource = [...this.state.dataSource];
      this.setState({ 
        dataSource: dataSource.filter(item => item.key !== key),
      });
      message.success("删除成功!")
    }
    handleShow = (key) => {
      const dataSource = [...this.state.dataSource];
      const { propsAPI } = this.props;
      if(dataSource.length > 0){
        for(let i = 0; i < dataSource.length; i ++){
          if(dataSource[i].key === key){
            let inf = JSON.parse(JSON.stringify(dataSource[i].Model));
            propsAPI.read(inf);
          }
        }
      }
      this.setState({
        visible:false
      });
      //message.success("这个模型被成功调出!")
    }
    handleAdd = () => {
        const { propsAPI } = this.props;
        let inf = JSON.parse(JSON.stringify(propsAPI.save()));
        const { count, dataSource } = this.state;
        const newData = {
          key: count,
          Name: `模型${count}号`,
          Date: 2019.4,
          Description: `这是我的第${count}个模型`,
          Model:inf    //注意不能有和它重名的
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
        const action = {
          type:'test',
          did:true,
          count:count+1
        }
        store.dispatch(action);
        message.success("成功存储了一个新模型!")
    }
    
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData });
    }

    render(){
        const { dataSource } = this.state;
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
        };
        const columns = this.columns.map((col) => {
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
              handleSave: this.handleSave,
            }),
          };
        });
        return(
        <div>
            <div>  
              <Button onClick={()=>this.ShowModal()} style={{border:0,backgroundColor:'#343941',color:"#ddd",fontSize:25}}>
                <Icon type="search" style={{fontSize:25}}/>模型
              </Button>
            </div>
            <div>
                <Modal
                  title="模型仓库"
                  visible={this.state.visible}
                  onOk={this.DisModal}
                  onCancel={this.DisModal}
                  bodyStyle={{height: '400px'}}
                  width={1000}
                >
                  {/* <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加当前模型
                  </Button> */}
                  <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    pagination={{
                      pageSize: 5
                    }}
                    dataSource={dataSource}
                    columns={columns}
                  />
                </Modal>
                
            </div>
        </div>
        );
  }
}

export default withPropsAPI(Model);