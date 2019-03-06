import React, {Component} from 'react'
import { withPropsAPI } from '@src';
import { Input, Form, Icon, Button } from 'antd'
import './feature.less'

class FeatureRegion extends Component {
    constructor(props){
        super(props);
        this.state={
            id: 1
        }
    }
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.state.id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const inlineFormItemLayout = {
        labelCol: {
          sm: { span: 6 },
        },
        wrapperCol: {
          sm: { span: 24 },
        },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        style={{marginLeft:0}}
        {...inlineFormItemLayout}
        required={false}
        key={k}
      >
        {`组名${k}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`组内:${k}`}
        <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        <br/>
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur']
        })(
          <Input onBlur={this.handleSubmit} style={{width:'30%'}}/>
        )}
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur']
        })(
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
export default Form.create()(withPropsAPI(FeatureRegion));