import React from 'react';
import { Card, Form, Input, Modal, Button } from 'antd';
import { withPropsAPI } from '@src';
import {AppendingLineChart} from "../linechart/linechart.ts";
import d3 from "d3"

const { Item } = Form;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

let a=1;

class NodeDetail extends React.Component {
  
  state = {
    visible: false,
    running : false,
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

      executeCommand(() => {
        update(item, {
          ...values,
      
        });
      });
    });
  }

  showModal = () => {
    console.log(a)
    this.setState({
      visible: true,
    });

  }



  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  render() {
    const { form, propsAPI } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;

    const item = getSelected()[0];

    if (!item) {
      return null;
    }

    const { label } = item.getModel();

    return (
      <Card type="inner" title="参数" bordered={false}>
        <Form onSubmit={this.handleSubmit}>

          <Item label="label" {...inlineFormItemLayout}>
            {
              getFieldDecorator('label', {
                initialValue: label,
              })(<Input onBlur={this.handleSubmit} />)
            }
          </Item>

        </Form>
      </Card>
    );
  }
}

export default Form.create()(withPropsAPI(NodeDetail));
