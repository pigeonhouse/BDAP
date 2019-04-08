import React from 'react';
import withGGEditorContext from '@common/context/GGEditorContext/withGGEditorContext';
import styles from './index.less'
import { Menu, Icon, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.bindEvent();
    this.state={
      isMouseEnter:'no'
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
  iconClose=(group)=>{
    if(group === 'input' && this.state.isMouseEnter === 'yes'){
      return (
        <Col span={4}>
          <Icon type="close" className={styles.iconCloseStyle} />
        </Col>
      )
    }
  }
  handleMouseEnter=()=>{
    this.setState({isMouseEnter:'yes'})
  }
  handleMouseLeave=()=>{
    this.setState({isMouseEnter:'no'})
  }
  render() {
    const { model } = this.props;
    return (
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
          {this.iconClose(model.group)}       
        </Row>
      </div>
    );
  }
}

export default withGGEditorContext(Item);
