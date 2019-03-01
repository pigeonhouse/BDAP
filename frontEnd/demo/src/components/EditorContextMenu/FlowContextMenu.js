import React from 'react';
import { Modal, Table } from 'antd';
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

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
    const { propsAPI } = this.props;
    this.setState({currentId : propsAPI.getSelected()[0].id})
    const data = store.getState().Dataset
    
    for(let i = 0; i < data.length; i++){
      if(data[i].id == propsAPI.getSelected()[0].id){
        const rawData = data[i]
        console.log(rawData)
        var columns = new Array()
        for(let j = 0; j < rawData.fieldNameArray[0].length; j++){
            columns.push({
              title : rawData.fieldNameArray[0][j],
              dataIndex: rawData.fieldNameArray[0][j],
               width : 50,
            })
        }
        this.setState({col:columns})
        var datas = new Array()
        for(let m = 0; m < rawData.vectorLength[0]; m++){
          var temp = new Array();
          for(let k = 0; k < rawData.fieldNameArray[0].length; k++){
            var colName = rawData.fieldNameArray[0][k]
            temp[colName] = rawData.allData[0][k][0].value[m]
          }
          datas.push(temp)
        }
        this.setState({data:datas})

        break
      }
    }
    //onsole.log(this.state.dataSet)
    //console.log(store.getState())
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
              <span>展示</span>
          </div>
        </NodeMenu>

        <Modal title="Basic Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel} width={800}
        >
          <Table columns={this.state.col} dataSource={this.state.data} pagination={{ pageSize: 70 }} scroll={{ y: 340 }} bordered />

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
