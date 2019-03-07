import React, {Component, Fragment} from 'react'
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
        id: 0,
        min:[],
        max:[]
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
      const attr = item.model.attr;
      attr[this.props.tag] = ['user-defined', values];
      executeCommand(() => {
        update(item,{attr});
      });
      this.setState({
        min: values.min,
        max: values.max
      })
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
  returnitemmin=(min, index)=>{
    const { getFieldDecorator } = this.props.form;
    if(min)
    return <Fragment>
          {getFieldDecorator(`min[${index}]`)(
          <Input 
            defaultValue={min}
            placeholder={'max'}
            onChange={this.handleSubmit2}
            onBlur={this.handleSubmit2}
            style={{width:'30%'}}/>
        )}
    </Fragment>
    else return <Fragment>
                {getFieldDecorator(`min[${index}]`)(
                <Input
                  placeholder={'min'}
                  onBlur={this.handleSubmit2}
                  style={{width:'30%'}}/>
              )}
            </Fragment>
  }
  returnitemmax=(max, index)=>{
    const { getFieldDecorator } = this.props.form;
    if(max){
      console.log(max)
        return <Fragment>
              {getFieldDecorator(`max[${index}]`)(
                <Input
                  placeholder={'max'}
                  defaultValue={max}
                  onChange={this.handleSubmit2}
                  onBlur={this.handleSubmit2}
                  style={{width:'30%'}}/>
              )}
            </Fragment>
    }
    else return <Fragment>
              {getFieldDecorator(`max[${index}]`)(
              <Input 
                placeholder={'max'}
                onBlur={this.handleSubmit2}
                style={{width:'30%'}}/>
            )}
          </Fragment>
  }
  isGroupingType=()=>{
    if(this.state.groupingType === 'normal'){
      const { propsAPI } = this.props;
      const { getSelected, executeCommand, update } = propsAPI;
      const item = getSelected()[0];
      const attr = item.model.attr;
      attr[this.props.tag] = ['normal', 3];
      executeCommand(() => {
        update(item,{attr});
      });
      return <div>
        组数：&nbsp;&nbsp;&nbsp;
        <InputNumber 
          min={2} 
          max={10} 
          defaultValue={3}
          style={{margin:10, width:'65%', marginBottom:0}}
          onChange={this.handleSubmit1} />
      </div>
    }
    else if(this.state.groupingType === 'user-defined'){
      const inlineFormItemLayout = {
          labelCol: {
            sm: { span: 6 },
          },
          wrapperCol: {
            sm: { span: 24 },
          },
      };
      const id = new Array(this.state.id).fill(0);
      const min = this.state.min;
      const max = this.state.max;
      return  <Form>
        {id.map((item, index)=>{
          return <Item 
                  {...inlineFormItemLayout} 
                  style={{marginLeft:0}}
                  required={false}
                  key={index}
                >
          {`第${index}组`}：
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(index)}
              style={{flex:'right'}}
            />
              {this.returnitemmin(min[index], index)}
              {this.returnitemmax(max[index], index)}
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
          <Option value="normal">正常分组</Option>
          <Option value="user-defined">自定义分组</Option>
        </Select>
        {this.isGroupingType()}
      </div>
    );
  }
}
export default Form.create()(withPropsAPI(FeatureRegion));