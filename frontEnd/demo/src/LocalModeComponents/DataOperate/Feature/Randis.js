import React, { Component } from 'react'
import { withPropsAPI } from '@src';
import { InputNumber } from 'antd'
import './feature.less'
class Randis extends Component {
  constructor(props){
      super(props);
      this.state={
        randomValue: 0.7
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
    if(attr.public){
        this.setState({
            randomValue:attr.public
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
    executeCommand(() => {
        update(item,{attr:{
            public:value
        }});
    });
  }

  render() {
    return (
        <InputNumber
            min={0} 
            max={1} 
            step={0.1}
            defaultValue = {this.state.randomValue}
            onChange={this.handleChange} 
        />
    );
  }
}
export default withPropsAPI(Randis);