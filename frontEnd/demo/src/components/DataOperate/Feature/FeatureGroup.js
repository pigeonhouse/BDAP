import React, {Component} from 'react'
import { withPropsAPI } from '@src';
import { Form, Icon, Button, Input, Select } from 'antd'
import './feature.less'

class FeatureGroup extends Component {
  constructor(props){
      super(props);
      this.state={
          id: 1,
          names: [undefined],
          tags: [undefined]
      }
  }
  handleSubmit = (e) => {
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
      attr[this.props.tag] = {...values};
      executeCommand(() => {
        update(item,{attr:attr});
      });
      this.setState({
        tags: values.tags,
        names: values.names
      })
    });
  }
  add=()=>{
    let names = this.state.names;
    names.length++;
    let tags = this.state.tags;
    tags.length++;
    this.setState({
      id: this.state.id+1,
      names: names,
      tags: tags
    })
  }
  remove=(index)=>{
    let names = [];
    let tags = [];
    for(let i in this.state.names){
      if(Number(i) !== index){
        names.push(this.state.names[i]);
        tags.push(this.state.tags[i]);
      }
    }
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;
    const item = getSelected()[0];
    const attr = item.model.attr;
    attr[this.props.tag] = {names: names, tags: tags};
    executeCommand(() => {
      update(item,{attr});
    });
    this.setState({
      names: names,
      tags: tags,
      id: this.state.id-1
    })
  }
  handleSelect=(value)=>{
    console.log(value);
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
    const names = this.state.names;
    const tags = this.state.tags;
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
            onClick={() => this.remove(index)}
          />
        <br/>
        {getFieldDecorator(`names[${index}]`)(
          <Input value={names[index]?names[index]:''} onBlur={this.handleSubmit} style={{width:'30%'}}/>
        )}
        {getFieldDecorator(`tags[${index}]`)(
          <Select
          mode="tags"
          style={{marginLeft:'5%',width:'65%'}}
          onBlur={this.handleSelect}
        />
          // <Input value={tags[index]?tags[index]:''} onBlur={this.handleSubmit} style={{marginLeft:'5%',width:'65%'}}/>
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