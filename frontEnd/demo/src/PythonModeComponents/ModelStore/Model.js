import React, { Component } from 'react'
import { Button,Modal,Icon,message, Table, Input, Popconfirm, Form, Divider} from 'antd'
import { withPropsAPI } from '@src';

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
            this.state.ModelList.length >= 1
              ? (
                <div>
                    <a href="javascript:;" onClick={() => this.handleShow(record.key)}>调出</a>
                    <Divider type="vertical" />
                    <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
                    <a href="javascript:;">删除</a>
                    </Popconfirm>
                </div>
              ) : null
          ),
        }];
      //第一次全局渲染
      //后端拿来[{},{}]
        
      // fetch("http://********/****")
      // .then(
      //   listAll=>{
      //     console.log(listAll);
      //     this.setState({
      //       ModelList:[{},{}],
      //       count: length;
      //     });
      //   }
      // ) 
    }
    state = {
      visible:false,
      editing: false,
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
      //后端Delete(key)

      const ModelList = [...this.state.ModelList];
      this.setState({ 
        ModelList: ModelList.filter(item => item.key !== key),
      });
      message.success("删除成功!")
    }
    handleShow = (key) => {
      const ModelList = [...this.state.ModelList];
      const { propsAPI } = this.props;

      if(ModelList.length > 0){
        for(let i = 0; i < ModelList.length; i ++){
          if(ModelList[i].key === key){
            //post  data
            //inf 就是拿来的data
            let inf = JSON.parse(JSON.stringify(ModelList[i].Model));
            propsAPI.read(inf);
          }
        }
      }
      this.setState({
        visible:false
      });
    }

    handleAdd = () => {
        const { propsAPI } = this.props;
        let inf = JSON.parse(JSON.stringify(propsAPI.save()));
        const { count, ModelList } = this.state;

        //后端要add这个newData
        const newData = {
          key: count,
          Name: `模型${count}号`,
          Date: 2019.4,
          Description: `这是我的第${count}个模型`,
          Model:inf   //这个就是Data
        };
        //后端Add操作

        this.setState({
          ModelList: [...ModelList, newData],
          count: count + 1,
        });
        

        message.success("成功存储了一个新模型!")
    }
    
    handleSave = (row) => {
        //这里用于修改某个model

        const newList = [...this.state.ModelList];
        const index = newList.findIndex(item => row.key === item.key);
        const item = newList[index];
        //item为新修改的对象 index为下标

        //在这里post index,item到后端
        //然后对对应项修改
        newList.splice(index, 1, {
          ...item,
          ...row,
        }); //本地修改
        this.setState({ ModelList: newList });
        
    }

    render(){
        const { ModelList } = this.state;
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
                    ModelList={ModelList}
                    columns={columns}
                  />
                </Modal>      
            </div>
        </div>
        );
  }
}

export default withPropsAPI(Model);