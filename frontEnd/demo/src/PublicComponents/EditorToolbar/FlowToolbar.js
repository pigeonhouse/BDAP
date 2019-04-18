import React from 'react';
import { Tooltip, Divider, Modal,List, Avatar, Button, Icon } from 'antd';
import { Toolbar, Command } from '@src';
import styles from './index.less';
import iconfont from '../../theme/iconfont.less';
import { withPropsAPI } from '@src';
import store from '../../store';
import { getStopLineAction, getShowLineAction, UpINF } from '../../store/actionCreate';
import { data } from '../../ExampleData/FlowData';
var inf = data;
const dat = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
class FlowToolbar extends React.Component {

  state = {
    visible: false,
    v:false
  }
  sModal = () => {
    this.setState({
      v: true,
    });
  }
  hOk = (e) => {
    console.log(e);
    this.setState({
      v: false,
    });
  }

  hCancel = (e) => {
    console.log(e);
    this.setState({
      v: false,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  stopLine = () =>{
    const action = getStopLineAction();
    store.dispatch(action);
    console.log(store.getState().running);
  }
  handleModel = () =>{
    const { propsAPI } = this.props;
    const { read } = propsAPI;
    read(inf);
    console.log("----propsAPI------")
    console.log(inf)
  }
  handleSave = () =>{
    console.log("----存储模型显示---------")
    const { propsAPI } = this.props;
    const { save } = propsAPI;
    inf = save();
    console.log(inf)
  }

  render() {  

    return (
      <div>
      <div>
      <Toolbar className={styles.toolbar}>
        <Command name="undo">
          <Tooltip title="撤销" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconUndo}`} />
          </Tooltip>
        </Command>
        <Command name="redo">
          <Tooltip title="重做" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconRedo}`} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="copy">
          <Tooltip title="复制" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconCopyO}`} />
          </Tooltip>
        </Command>
        <Command name="paste">
          <Tooltip title="粘贴" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconPasterO}`} />
          </Tooltip>
        </Command>
        <Command name="delete">
          <Tooltip title="删除" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconDeleteO}`} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="zoomIn">
          <Tooltip title="放大" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconZoomInO}`} />
          </Tooltip>
        </Command>
        <Command name="zoomOut">
          <Tooltip title="缩小" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconZoomOutO}`} />
          </Tooltip>
        </Command>
        <Command name="autoZoom">
          <Tooltip title="适应画布" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconFit}`} />
          </Tooltip>
        </Command>
        <Command name="resetZoom">
          <Tooltip title="实际尺寸" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconActualSizeO}`} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="toBack">
          <Tooltip title="层级后置" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconToBack}`} />
          </Tooltip>
        </Command>
        <Command name="toFront">
          <Tooltip title="层级前置" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconToFront}`} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="multiSelect">
          <Tooltip title="多选" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconSelect}`} />
          </Tooltip>
        </Command>
        <Command name="addGroup">
          <Tooltip title="成组" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconGroup}`} />
          </Tooltip>
        </Command>
        <Command name="unGroup">
          <Tooltip title="解组" placement="bottom" overlayClassName={styles.tooltip}>
            <i className={`${iconfont.iconfont} ${iconfont.iconUngroup}`} />
          </Tooltip>
        </Command>
      <Button onClick={()=>this.handleModel()} >
        <Icon type="search"/>模型
      </Button>
      <Button onClick={()=>this.handleSave()} >
        <Icon type="lock"/>存储
      </Button>
      </Toolbar>
      
      </div>
      {/* <div>
        <Modal
          title="模型仓库"
          visible={this.state.v}
          onOk={this.hOk}
          onCancel={this.hCancel}
        >
          <List
          itemLayout="horizontal"
          dataSource={dat}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </Modal>
      </div> */}
      </div>
    );
  }
}

export default withPropsAPI(FlowToolbar);