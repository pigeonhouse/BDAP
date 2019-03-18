import React, { Component } from 'react'
import { withPropsAPI } from '@src';
import { Form, Icon, Button, Select, InputNumber, Input } from 'antd'
import './feature.less'
const { Item } = Form;
const Option = Select.Option;
class FeatureRegion extends Component {
  constructor(props){
      super(props);
      this.state={
        groupingType: "normal",
        region:[[]]
      }
  }
  handleSubmit1 = (value) => {
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
    console.log(propsAPI.save())
  }
  handleSubmit2 = (e) => {
    e.preventDefault();

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      const item = getSelected()[0];
      if (!item) {
        return;
      }
      let attr = item.model.attr;
      const tag = this.props.tag;
      for(let i in values.value){
        attr[tag][Number(i)+1] = [values.value[i], values.min[i], values.max[i]];
      }
      console.log(attr[tag])
      executeCommand(() => {
        update(item,{attr});
      });
      this.setState({
        region: attr[tag].slice(1)
      })
    });
  }
  add=()=>{
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;
    const item = getSelected()[0];
    let attr = item.model.attr;
    const tag = this.props.tag;
    attr[tag].push([]);
    executeCommand(() => {
      update(item,{attr:attr});
    });
    this.setState({
      region: attr[tag].slice(1)
    })
  }
  remove=(index)=>{
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;
    const item = getSelected()[0];
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    attr[this.props.tag].splice(index+1, 1);
    executeCommand(() => {
      update(item,{attr:attr});
    });
    this.setState({
      region:attr[this.props.tag].slice(1)
    })
  }
  isGroupingType=()=>{
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;
    const item = getSelected()[0];
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    const tag = this.props.tag;
    if(this.state.groupingType === 'normal'){
      let groupvalue = 3;
      if(attr[tag] && attr[tag][0] === 'normal'){
        groupvalue = attr[tag][1];
      }
      else {
        attr[tag] = ['normal', 3];
      }
      executeCommand(() => {
        update(item,{attr:attr});
      });
      return <div>
        组数：&nbsp;&nbsp;&nbsp;
        <InputNumber 
          min={2} 
          max={10} 
          defaultValue={groupvalue}
          style={{margin:10, width:'65%', marginBottom:0}}
          onChange={this.handleSubmit1} />
      </div>
    }
    else if(this.state.groupingType === 'user-defined'){
      const { getFieldDecorator } = this.props.form;
      const inlineFormItemLayout = {
          labelCol: {
            sm: { span: 6 },
          },
          wrapperCol: {
            sm: { span: 24 },
          },
      };
      let region;
      if(attr[tag]){
        if(attr[tag][0] === 'user-defined'){
          region = attr[tag].slice(1);
        }
        else {
          attr[tag] = ['user-defined',[]];
          executeCommand(() => {
            update(item,{attr:attr});
          });
          region = attr[tag].slice(1);
        }
      }
      else {
        region = this.state.region;
      }
      return  <Form>
        {region.map((item, index)=>{
          return <Item 
                  {...inlineFormItemLayout} 
                  style={{marginLeft:0}}
                  required={false}
                  key={index}
                >
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(index)}
              style={{width:'10%', cursor:'pointer'}}
            />
            {getFieldDecorator(`value[${index}]`)(
              <Input 
                placeholder='value'
                onChange={this.handleSubmit2}
                onBlur={this.handleSubmit2}
                style={{width:'30%'}}/>
            )}
            {getFieldDecorator(`min[${index}]`)(
              <Input 
                placeholder='min'
                onChange={this.handleSubmit2}
                onBlur={this.handleSubmit2}
                style={{width:'30%'}}/>
            )}
            {getFieldDecorator(`max[${index}]`)(
              <Input
                placeholder='max'
                onChange={this.handleSubmit2}
                onBlur={this.handleSubmit2}
                style={{width:'30%'}}/>
            )}
          </Item>
        })}
        <Item>
          <Button type="dashed" onClick={this.add} style={{width:'200px'}}>
              <Icon type="plus" /> Add group
          </Button>
        </Item>
      </Form>
    }
  }
  handleChange=(value)=>{
    if(this.state.groupingType !== value){
      this.setState({
        groupingType:value
      })
    }
  }
  render() {
    console.log(this.props.propsAPI.save())
    return (
      <div>
        分组方式:&nbsp;&nbsp;&nbsp;
        <Select defaultValue="normal" style={{ width: 140 }} onChange={this.handleChange}>
          <Option value="normal">顺序分组</Option>
          <Option value="user-defined">自定义分组</Option>
        </Select>
        {this.isGroupingType()}
      </div>
    );
  }
}
export default Form.create()(withPropsAPI(FeatureRegion));