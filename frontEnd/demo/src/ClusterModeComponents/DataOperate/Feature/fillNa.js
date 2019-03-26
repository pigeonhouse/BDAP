import React, { Component } from 'react'
import { withPropsAPI } from '@src';
import { Select } from 'antd'
import './feature.less'
class FillNa extends Component {
  constructor(props){
      super(props);
      this.state={
        typeValue:"average"
      }
  }
  componentWillMount(){
    const { propsAPI } = this.props;
    const { getSelected } = propsAPI;
    const item = getSelected()[0];
    if (!item) {
    return;
    }
    const { attr } = item.getModel();
    if(attr.type){
        this.setState({
            typeValue:attr.type
        })
    }
    else{
      attr.type = 'average';
      update(item, {attr});
    }
  }
  handleChange = (value) => {
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    const item = getSelected()[0];
    if (!item) {
    return;
    }
    executeCommand(() => {
        update(item,{attr:{
            type:value
        }});
    });
  }

  render() {
    return (
        <Select defaultValue={this.state.typeValue} style={{ width: '70%' }} onChange={this.handleChange}>
          <Option value="average">平均值</Option>
          <Option value="max">最大值</Option>
          <Option value="min">最小值</Option>
          <Option value="media">中位数</Option>
        </Select>
    );
  }
}
export default withPropsAPI(FillNa);