import React, { Component } from 'react'
import { withPropsAPI } from '@src';
import { Form, Select, Input } from 'antd'
import '../feature.less'
const { Item } = Form;
const Option = Select.Option;
class DataFilter extends Component {
  constructor(props){
      super(props);
      this.state={
      }
  }
  componentWillMount(){
    const { propsAPI } = this.props;
    const { getSelected } = propsAPI;
    const item = getSelected()[0];
    let attr = JSON.parse(JSON.stringify(item.model.attr));
    const tag = this.props.tag;
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
    return (
      <Form>
        <Item 
            {...inlineFormItemLayout} 
            style={{marginLeft:0}}
            required={false}
            key={index}
        >
            组名：
            {getFieldDecorator(`name[${index}]`,item[0]?{
            initialValue: item[0]}:{}
            )(
            <Input 
                onChange={this.handleSubmitInput}
                onBlur={this.handleSubmitInput}
                style={{width:'70%'}}/>
            )}
            标签：
            {getFieldDecorator(`value[${index}]`, item.slice(1)?{
            initialValue: item.slice(1)}:{}
            )(
            <Select
                mode="tags"
                style={{ width: '80%' }}
                onChange={this.handleSubmitSelect.bind(this, index)}
            >
            </Select>,
            )}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(withPropsAPI(DataFilter));