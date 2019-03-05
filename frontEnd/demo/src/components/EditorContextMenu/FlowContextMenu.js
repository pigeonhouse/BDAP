import React, { Component } from 'react'
import { Modal, Table, Button } from 'antd';
import {
  Command,
  NodeMenu,
  EdgeMenu,
  GroupMenu,
  MultiMenu,
  CanvasMenu,
  ContextMenu,
} from '@src';
import styles from './index.less';
import iconfont from '../../theme/iconfont.less';
import store from '../../store'
import { withPropsAPI } from '@src';
import LineMarkerEcharts from './LineMarkerEcharts';

// const columns = [{
//   title: 'Name',
//   dataIndex: 'name',
//   width: 150,
// }, {
//   title: 'Age',
//   dataIndex: 'age',
//   width: 150,
// }, {
//   title: 'Address',
//   dataIndex: 'address',
// }];

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }


class FlowContextMenu extends React.Component {
  
  state = { 
    visible: false,
    Nvisible: false
  }

  showNModal = () => {
    this.setState({
      Nvisible: true,
    });
  }
  handleNOk = (e) => {
    console.log(e);
    this.setState({
      Nvisible: false,
    });
  }
  handleNCancel = (e) => {
    console.log(e);
    this.setState({
      Nvisible: false,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
    const { propsAPI } = this.props;

    var currentId = propsAPI.getSelected()[0].id
    var saveData = propsAPI.save().nodes
    var currentData = new Array()

    for(let i = 0; i < saveData.length; i++){
      if(currentId == saveData[i].id){       
          currentData.push(saveData[i].Dataset)
      }
    }
    currentData = currentData[0]

    var columns = new Array()
    for(let i = 0; i < currentData.length; i++){
      columns.push({
                   title : currentData[i][0].label,
                   dataIndex: currentData[i][0].label,
                   width : 50,
                 })
    }
    this.setState({col:columns})

    var datas = new Array()
    for(let i = 0; i < currentData[0][0].value.length; i++){
      var temp = new Array()
      for(let j = 0; j < currentData.length; j++){
        temp[currentData[j][0].label] = currentData[j][0].value[i]
      }
      datas.push(temp)
    }
    this.setState({data:datas})

  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      col:[],
      data:[]
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      col:[],
      data:[]
    });
  }

  render() {
    return (
      <ContextMenu className={styles.contextMenu}>
      
        <NodeMenu>
          <Command name="copy">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
              <span>复制</span>
            </div>
          </Command>
          <Command name="delete">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
          
          <div className={styles.item} onClick={this.showModal}>
              <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
              <span>数据展示</span>
          </div>
          <div className={styles.item} onClick={this.showNModal}>
          <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
          <span>图形化展示-折线/柱状图</span>
          </div>
        </NodeMenu>
      
        <Modal
            title="Modal"
            visible={this.state.Nvisible}
            onOk={this.handleNOk}
            onCancel={this.handleNCancel}
            bodyStyle={{height: '500px'}}
            width={1000}
          >
            <LineMarkerEcharts/>
        </Modal>
        
        <Modal title="Modal Data" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel} width={900}
        >
          <Table columns={this.state.col} dataSource={this.state.data} pagination={{ pageSize: 70 }} scroll={{ y: 340 }} bordered size="small" />

        </Modal>

        <EdgeMenu>
          <Command name="delete">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
        </EdgeMenu>

        <GroupMenu>
          <Command name="copy">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
              <span>复制</span>
            </div>
          </Command>
          <Command name="delete">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
          <Command name="unGroup">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconUngroup}`} />
              <span>解组</span>
            </div>
          </Command>
        </GroupMenu>

        <MultiMenu>
          <Command name="copy">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
              <span>复制</span>
            </div>
          </Command>
          <Command name="paste">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`} />
              <span>粘贴</span>
            </div>
          </Command>
          <Command name="addGroup">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconGroup}`} />
              <span>成组</span>
            </div>
          </Command>
          <Command name="delete">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
              <span>删除</span>
            </div>
          </Command>
        </MultiMenu>

        <CanvasMenu>
          <Command name="undo">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconUndo}`} />
              <span>撤销</span>
            </div>
          </Command>
          <Command name="redo">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconRedo}`} />
              <span>重做</span>
            </div>
          </Command>
          <Command name="pasteHere">
            <div className={styles.item}>
              <i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`} />
              <span>粘贴</span>
            </div>
          </Command>
        </CanvasMenu>

      </ContextMenu>
    );
  }
}

export default withPropsAPI(FlowContextMenu);
