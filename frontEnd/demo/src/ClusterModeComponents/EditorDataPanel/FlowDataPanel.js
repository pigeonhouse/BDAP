import React from 'react';
import { ItemPanel, Item } from '@src';
import styles from './index.less';
import { Menu, Icon, message } from 'antd';
import ItemDecoration from '../../PublicComponents/ItemDecoration/ItemDecoration'

const SubMenu = Menu.SubMenu;
class FlowDataPanel extends React.Component {
  state={
    dataTable: []
  }
  
  componentWillMount(){
    fetch(
      'http://10.105.222.92:3000/FileList'
    )
    .then((response) => {
      if(response.status===200){
        response.json().then((respData)=>{
          this.setState({
            dataTable:respData,
          });
        })
      }
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.dataTable.length !== 0){
      this.setState({dataTable:nextProps.dataTable})
    }
  }
  deleteFile = (dataName)=>{
    const init={
      method: 'POST', 
      body:"fileName="+dataName,
      mode: 'cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    　　 },
      }
      fetch(
        'http://10.105.222.92:3000/DeleteFile',init
      )
      .then((response) => {
        return response.json()
      })
      .then(a=>{message.success(`${dataName}file deleted successfully`)})
      .catch(e => console.log('错误:', e))
  }
  deleteDataName=(dataName)=>{
    var dataTable = this.state.dataTable;
    const index = dataTable.indexOf(dataName);
    dataTable.splice(index, 1);
    this.setState({dataTable})
    this.deleteFile(dataName);
  }
  render() {
    var children = [];
    if(this.state.dataTable.length !== 0){
      var dataTable = this.state.dataTable;
      for(let i in dataTable){
        children.push(
          <Menu.Item key={i+3} > 
                <ItemPanel>
                  <Item
                    type="node"
                    size="200*40"
                    shape='zero-one'
                    model={{
                      label: dataTable[i],
                      elabel: dataTable[i],
                      attr:{},
                      attrDetail:[],
                      Dataset: [],
                      labelArray: {}, 
                      length: 0,
                      anchor: [0, 1],
                      group:'input',
                      keyConfig:{
                        color_type: '#1890FF',
                        state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                      }
                    }}
                    deleteDataName={this.deleteDataName}    
                  />
                </ItemPanel>
          </Menu.Item>
        )
      }
    }
    return (
      <Menu
        defaultOpenKeys={['sub1','sub2','sub3']}
        mode="inline"
        className={styles.scrollapp}
        style={{maxHeight:'calc(100vh - 105px)'}}
        selectable={false}
      >
      <ItemDecoration></ItemDecoration>
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>数据源</span></span>}>
        <Menu.Item key="1" > <ItemPanel><Item
              type="node"
              size="200*40"
              shape='zero-one'
              model={{
                label: 'hdfs数据',
                elabel:'hdfsFile',
                attr:{},
                attrDetail:[],
                Dataset: [],
                labelArray: {}, 
                length: 0,
                anchor: [0, 1],
                keyConfig:{
                  color_type: '#1890FF',
                  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                }
              }}         
            /></ItemPanel></Menu.Item>
          <Menu.Item key="2" > 
              <ItemPanel>
                <Item
                  type="node"
                  size="200*40"
                  shape='zero-one'
                  model={{
                    label: 'Titanic测试',
                    elabel:'TitanicTestFile',
                    attr:{},
                    attrDetail:[],
                    Dataset: [],
                    labelArray: {}, 
                    length: 0,
                    anchor: [0, 1],
                    group:'input',
                    keyConfig:{
                      color_type: '#1890FF',
                      state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                    }
                  }}         
                />
              </ItemPanel>
        </Menu.Item>
        <Menu.Item key="3" > 
              <ItemPanel>
                <Item
                  type="node"
                  size="200*40"
                  shape='zero-one'
                  model={{
                    label: 'Titanic训练',
                    elabel:'TitanicTrainFile',
                    attr:{},
                    attrDetail:[],
                    Dataset: [],
                    labelArray: {}, 
                    length: 0,
                    anchor: [0, 1],
                    group:'input',
                    keyConfig:{
                      color_type: '#1890FF',
                      state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
                    }
                  }}         
                />
              </ItemPanel>
        </Menu.Item>
          {children}
      </SubMenu>
    </Menu>
    );
  }
}

export default FlowDataPanel;
