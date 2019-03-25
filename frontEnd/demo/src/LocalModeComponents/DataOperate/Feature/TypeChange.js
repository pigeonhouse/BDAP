import React, { Component, Fragment } from 'react'
import { withPropsAPI } from '@src';
import { Select } from 'antd'
import './feature.less'
class TypeChange extends Component {
  constructor(props){
      super(props);
      this.state={
        typeValue:"string"
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
    if(attr[this.props.tag]){
        this.setState({
            typeValue:attr[this.props.tag]
        })
    }
  }
  handleChange = (value) => {
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    const item = getSelected()[0];
    if (!item) {
    return;
    }
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    attr[this.props.tag] = value;
    executeCommand(() => {
        update(item,{attr});
    });
  }

  render() {
    return (
        <Fragment style={{textAlign:'center'}}>
            转换类型:&nbsp;&nbsp;&nbsp;&nbsp;
            <Select defaultValue={this.state.typeValue} style={{ width: '50%' }} onChange={this.handleChange}>
                <Option value="string">字符</Option>
                <Option value="number">数字</Option>
            </Select>
        </Fragment>
    );
  }
}
export default withPropsAPI(TypeChange);