import React from 'react';
import withGGEditorContext from '@common/context/GGEditorContext/withGGEditorContext';

import { Menu, Icon } from 'antd';
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

  render() {
    const { model } = this.props;

    return (
      <div style={{ cursor: 'pointer' }} onMouseDown={this.handleMouseDown}>
      <div><Icon type='bars'/>{<span label={model.label}>{model.label}</span>}</div>
      </div>
    );
  }
}

export default withGGEditorContext(Item);
