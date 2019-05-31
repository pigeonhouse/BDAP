import React, { Component } from 'react'
import { withPropsAPI } from '@src';
import { Select } from 'antd'
const Option = Select.Option;
class DataFilterA extends Component {
  state={
    columnsRelation: 'and',
  }
  componentWillMount(){
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    var attr = JSON.parse(JSON.stringify(item.model.attr));
    if(attr.columnsRelation){
      this.setState({columnsRelation:attr.columnsRelation})
    }
    else {
      attr.columnsRelation = 'and'
      let a = {attr:attr}
      update(item, {...a});
    }
  }
  handleChange=(value)=>{
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    var attr = JSON.parse(JSON.stringify(item.model.attr));
    attr.columnsRelation = value;
    var condition = '';
    const labelArray = item.model.labelArray.public;

    for(let i in labelArray){
      if(labelArray[i][1]){
        const con = attr[labelArray[i][0]];
        if(con){
          if(condition === ''){
            condition = '('+ con.join(' ') +')';
          }
          else {
            condition = condition + ' '+ value + ' (' + con.join(' ') + ')';
          }
        }
      }
    }

    attr.condition = condition;
    let a = {attr:attr};
    update(item, {...a});
    this.setState({columnsRelation:value});
  }
  render() {
    return (
      <Select value={this.state.columnsRelation} style={{ width: 120 }} onChange={this.handleChange}>
        <Option value="and">与</Option>
        <Option value="or">或</Option>
      </Select>
    );
  }
}
export default withPropsAPI(DataFilterA);