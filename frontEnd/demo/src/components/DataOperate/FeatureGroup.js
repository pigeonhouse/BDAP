import React, {Component, Fragment} from 'react'
import { withPropsAPI } from '@src';
import { Form, Icon, Button, Input } from 'antd'
import './feature.less'

class FeatureGroup extends Component {
    constructor(props){
        super(props);
        this.state={
            id: 1,
            names: [],
            tages: []
        }
    }
    handleSubmit = (value) => {
      const { propsAPI } = this.props;
      const { getSelected, executeCommand, update } = propsAPI;
      const item = getSelected()[0];
      if (!item) {
        return;
      }
      const attr = item.model.attr;
      attr[this.props.tag] = ['normal', value];
      executeCommand(() => {
        update(item,{attr});
      });
    }
    add=()=>{
      let min = this.state.min;
      min.length++;
      let max = this.state.max;
      max.length++;
      this.setState({
        id: this.state.id+1,
        min: min,
        max: max
      })
    }
    remove=(index)=>{
      let arrmin = [];
      let arrmax = [];
      for(let i in this.state.min){
        if(Number(i) !== index){
          arrmin.push(this.state.min[i]);
          arrmax.push(this.state.max[i]);
        }
      }
      const { propsAPI } = this.props;
      const { getSelected, executeCommand, update } = propsAPI;
      const item = getSelected()[0];
      const attr = item.model.attr;
      attr[this.props.tag][1] = {min: arrmin, max: arrmax};
      executeCommand(() => {
        update(item,{attr});
      });
      this.setState({
        min: arrmin,
        max: arrmax,
        id: this.state.id-1
      })
    }
  render() {
    const { getFieldDecorator } = this.props.form;
    const inlineFormItemLayout = {
        labelCol: {
          sm: { span: 6 },
        },
        wrapperCol: {
          sm: { span: 24 },
        },
    };
    const id = new Array(this.state.id).fill(0);
    const formItems = id.map((item, index) => (
      <Form.Item
        style={{marginLeft:0}}
        {...inlineFormItemLayout}
        required={false}
        key={item}
      >
        {`${index}组名`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`组内:`}
        <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={id.length === 1}
            onClick={() => this.remove(k)}
          />
        <br/>
        {getFieldDecorator(`names[${index}]`)(
          <Input onBlur={this.handleSubmit} style={{width:'30%'}}/>
        )}
        {getFieldDecorator(`tags[${index}]`)(
          <Input onBlur={this.handleSubmit} style={{marginLeft:'5%',width:'65%'}}/>
        )}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{width:'200px'}}>
            <Icon type="plus" /> Add group
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create()(withPropsAPI(FeatureGroup));