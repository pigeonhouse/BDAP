import React, {Component} from 'react'
import { withPropsAPI } from '@src';
import { Input, Form } from 'antd'
import './feature.less'
const { Item } = Form;
class FeatureBinary extends Component {
  constructor(props){
      super(props);
  }
  componentWillMount(){
    
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
      attr[this.props.tag] = values.attr[this.props.tag];
      executeCommand(() => {
        update(item,{attr});
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const inlineFormItemLayout = {
        labelCol: {
          sm: { span: 6 },
        },
        wrapperCol: {
          sm: { span: 18 },
        },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item label='tags:' {...inlineFormItemLayout} style={{marginLeft:0}}>
          {getFieldDecorator(`attr.${this.props.tag}`)(
            <Input onBlur={this.handleSubmit} />
          )}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(withPropsAPI(FeatureBinary));