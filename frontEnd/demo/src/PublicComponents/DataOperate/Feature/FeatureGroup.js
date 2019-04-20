import React, { Component, Fragment } from 'react'
import { withPropsAPI } from '@src';
import { Form, Icon, Button, Select, Input, Row, Col } from 'antd'
import './feature.less'
const { Item } = Form;
const Option = Select.Option;
class FeatureGroup extends Component {
  constructor(props){
      super(props);
      this.state={
        group:[[]],
        stat: [],
        children:[]
      }
  }
  componentWillMount(){
    const { propsAPI } = this.props;
    const { getSelected } = propsAPI;
    const item = getSelected()[0];
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    const tag = this.props.tag;
    if(attr[tag]){
      this.setState({
        group: attr[tag]
      })
    }
    let children = new Array;
    this.props.stat.map((value, index)=>{
      children.push(<Option key={index}>{value.name}</Option>)
    })
    // console.log('--------------')
    // console.log(this.props.stat);
    // if(children.length === 0){
    //   children.push(<Option key='1'>test</Option>)
    // }
    this.setState({
      children
    })
  }
  handleSubmitInput = (e) => {
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
      let attr = JSON.parse(JSON.stringify(item.model.attr));
      const tag = this.props.tag;
      var re = /^[0-9]+.?[0-9]*/;
      for(let i in values.name){
        let temp = re.test(values.name[i])?Number(values.name[i]):values.name[i];
        attr[tag][i][0] = temp;
      }
      executeCommand(() => {
        update(item,{attr});
      });
      this.setState({
        group: attr[tag]
      })
    });
  }
  handleSubmitSelect(index, value){
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;
    const item = getSelected()[0];
    if (!item) {
      return;
    }
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    const tag = this.props.tag;
    attr[tag][index] = attr[tag][index]?[attr[tag][index][0], ...value]:[undefined, ...value];
    executeCommand(() => {
      update(item,{attr});
    });
    this.setState({
      group:attr[tag]
    })
  }
  add=()=>{
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;
    const item = getSelected()[0];
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    const tag = this.props.tag;
    attr[tag].push([]);
    executeCommand(() => {
      update(item,{attr});
    });
    this.setState({
      group: attr[tag]
    })
  }
  remove=(index)=>{
    const { propsAPI, form } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;
    const item = getSelected()[0];
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    attr[this.props.tag].splice(index, 1);
    executeCommand(() => {
      update(item,{attr:attr});
    });
    let group = attr[this.props.tag];
    for(let i in group){
      let name = `name[${i}]`;
      let value = `value[${i}]`;
      let values = {};
      values[name] = group[i][0];
      values[value] = group[i].slice(1);
      form.setFieldsValue({
        ...values
      })  
    }
    this.setState({
      group:attr[this.props.tag]
    })
  }
  render() {
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    const tag = this.props.tag;
    const { getFieldDecorator } = this.props.form;
    const inlineFormItemLayout = {
        labelCol: {
          sm: { span: 6 },
        },
        wrapperCol: {
          sm: { span: 24 },
        },
    };
    let group;
    if(attr[tag]){
      group = attr[tag];
    }
    else {
      group = this.state.group;
      attr[tag] = group;
      update(item, {attr})
    }
    return (
      <Form>
        {group.map((item, index)=>{
          return <Fragment>
            <Row>
              <Item 
                {...inlineFormItemLayout} 
                style={{margin:0}}
                required={false}
                key={index*2}
              >
                <Col span = {6}>
                  组名：
                </Col>
                <Col span = {14}>
                  {getFieldDecorator(`name[${index}]`,item[0]?{
                    initialValue: item[0]}:{}
                  )(
                    <Input 
                      onChange={this.handleSubmitInput}
                      onBlur={this.handleSubmitInput}
                    />
                  )}
                </Col>
                <Col span = {4}>
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.remove(index)}
                    style={{cursor:'pointer', marginLeft:'5px'}}
                  />
                </Col>
              </Item>
            </Row>

            <Row>
              <Item 
                {...inlineFormItemLayout} 
                style={{margin:0}}
                required={false}
                key={index*2+1}
              >
                <Col span = {6}>
                  标签：
                </Col>
                <Col span = {18}>
                  {getFieldDecorator(`value[${index}]`, item.slice(1)?{
                    initialValue: item.slice(1)}:{}
                  )(
                    <Select
                      mode="tags"
                      onChange={this.handleSubmitSelect.bind(this, index)}
                      showArrow
                    >
                      {this.state.children}
                    </Select>
                  )}
                </Col>
              </Item>
            </Row>
          </Fragment>
          })}
          <Item>
            <Button type="dashed" onClick={this.add} style={{width:'100%'}}>
                <Icon type="plus" /> Add group
            </Button>
          </Item>
      </Form>
    );
  }
}
export default Form.create()(withPropsAPI(FeatureGroup));