import React from 'react';
import { Card, Form, Input, Modal, Button } from 'antd';
import { withPropsAPI } from '@src';
import Selectword from '../DataOperate/selectword'
import Download from '../DataOperate/download'
import Show from '../DataOperate/Datashow/index.js'
import Uploadfile from '../DataOperate/upload';
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
  isInputOutput(label){
    if(label === 'Output')
    return (
      <div>
        <Show style={{minWidth:'206px',marginBottom:'10px'}}></Show>
        <Download></Download>
      </div>
    );
    else if(label === 'Input')
    return (
      <Uploadfile ></Uploadfile>
    );
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
    const { attr } = item.getModel();
    const { select_status } = item.getModel();
    var targetid = [];
    if(select_status){
      for(let i = 0;i < select_status;i++){
        targetid.push(0);
      }
      const inf = propsAPI.save().edges;
      for(let i in inf){
          if(inf[i].target === item.id && inf[i].targetAnchor < select_status){
            targetid[inf[i].targetAnchor] = inf[i].source;
          }
      }
    }
    var arr = []
    for (let i in attr) {
        let o = {};
        o[i] = attr[i];
        arr.push(o)
    }

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
          {targetid.map((value)=>{
            return <Selectword 
                      id={value}
                      style={{margin:0}}
                    ></Selectword>;
          })}
          {arr.map((item)=>{
            const itemKey = Object.keys(item)[0];
            return <Item label={itemKey} {...inlineFormItemLayout}>
                    {
                      getFieldDecorator(`attr.${itemKey}` , {
                        initialValue: item[itemKey],
                      })(<Input onBlur={this.handleSubmit} />)
                    }
                  </Item>;
          })}
          {this.isInputOutput(label)}
        </Form>
      </Card>
    );
  }
}

export default Form.create()(withPropsAPI(NodeDetail));
