import React from 'react';
import withGGEditorContext from '@common/context/GGEditorContext/withGGEditorContext';
import styles from './index.less'
import { Menu, Icon, Row,Col } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.bindEvent();
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
    if(group === 'input'){
      return <Icon type="close" className={styles.iconCloseStyle} />
    }
  }
  render() {
    const { model } = this.props;
    return (
      <div 
        style={{ cursor: 'pointer', verticalAlign: 'middle'}} 
        onMouseDown={this.handleMouseDown}
      >
        <Row style={{paddingLeft:5,fontSize:13, cursor:'move', verticalAlign: 'middle'}}>
        <Col>
          <Icon type='bars'/>
            <span>{model.label}</span>
            </Col>
            <Col>
          {this.iconClose(model.group)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withGGEditorContext(Item);
