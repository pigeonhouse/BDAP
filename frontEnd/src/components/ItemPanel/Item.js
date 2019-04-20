import React from 'react';
import withGGEditorContext from '@common/context/GGEditorContext/withGGEditorContext';
import styles from './index.less'
import { Menu, Icon, Row, Col, Tooltip, Popconfirm } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.bindEvent();

    this.state={
      isMouseEnter:false,
      Tooltipvisible:false
    }
  }

  handleMouseDown = () => {
    const { type, size, shape, model } = this.props;
    if (this.page) {
      this.page.beginAdd(type, {
        type,
        size,
        shape,
        ...model,
      });
    }
  }

  bindEvent() {
    const { onAfterAddPage } = this.props;

    onAfterAddPage(({ page }) => {
      this.page = page;
    });
  }
  handleMouseEnterClose=()=>{
    this.setState({Tooltipvisible:true})
  }
  handleMouseLeaveClose=()=>{
    this.setState({Tooltipvisible:false})  
  }
  iconClose=(group, label)=>{
    if(group === 'input' && this.state.isMouseEnter
      && label !== '本地数据' && label !== 'Titanic测试' && label !== 'Titanic训练'){
      return (
        <Col span={4}>
          <Popconfirm placement="rightTop" title="是否删除此文件" onConfirm={this.handleClickClose.bind(this, label)} okText="是" cancelText="否">
            <Tooltip title='点击可删除上传的文件' visible={this.state.Tooltipvisible} placement='top'>
              <Icon 
                type="close" 
                className={styles.iconCloseStyle}
                onMouseEnter={this.handleMouseEnterClose}
                onMouseLeave={this.handleMouseLeaveClose}
              />
            </Tooltip>
          </Popconfirm>
        </Col>
      )
    }
  }
  handleClickClose=(label)=>{
    this.props.deleteDataName(label);
  }
  handleMouseEnter=()=>{
    this.setState({isMouseEnter:true})
  }
  handleMouseLeave=()=>{
    this.setState({isMouseEnter:false})
  }
  render() {
    const { model } = this.props;
    return (
      <Tooltip title="左键单击拖拽至右面" visible={this.state.isMouseEnter} placement='top'>
        <div 
          style={{ cursor: 'pointer' }} 
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Row style={{paddingLeft:5,fontSize:13, cursor:'move'}}>
            <Col span={20}>
              <Icon type='bars'/>
              <span>{model.label}</span>
            </Col> 
            {this.iconClose(model.group, model.label)}       
          </Row>
        </div>
      </Tooltip>
    );
  }
}

export default withGGEditorContext(Item);
