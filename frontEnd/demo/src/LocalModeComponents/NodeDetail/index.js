import React from 'react';
import { Card, Form, Input, Modal, Button } from 'antd';
import { withPropsAPI } from '@src';
import Selectword from '../DataOperate/selectword'
import Uploadfile from '../DataOperate/upload'
import HdfsFile from '../DataOperate/hdfsFile'
import styles from './index.less';
import Feature from '../DataOperate/Feature'

const { Item } = Form;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

class NodeDetail extends React.Component {
  
  state = {
    visible: false,
    running : false,
    labelArray:[],
  }

  componentWillMount(){
    const {  propsAPI } = this.props;
    const { getSelected } = propsAPI;
    const item = getSelected()[0];
    const { labelArray } = item.getModel();
    if(labelArray.public){
      this.setState({
        labelArray:labelArray.public
      })
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
      var re = /^[0-9]+.?[0-9]*/;
      for(let i in values.attr){
        if(re.test(item.model.attr[i])){
          values.attr[i] = Number(values.attr[i]);
        }
      }
      executeCommand(() => {
        update(item, {
          ...values,
        });
      });
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  isInputOutput(label){
    if(label === 'hdfs数据')
    return(
      <HdfsFile ></HdfsFile>
    )
    else if(label === '本地数据')
    return (
      <Uploadfile ></Uploadfile>
    )
  }
  isFeature = (group, label, sourceID)=>{
    if(group === 'feature'){
      return <Feature
              label={label}
              sourceID = {sourceID}
              labelArray = {this.state.labelArray}/>
    }
  }
  changeLabelArray = (labelArray)=>{
    this.setState({
      labelArray,
    })
  }
  handleSubmitTest = (e) => {
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
      let labelArray = JSON.parse(JSON.stringify(item.model.labelArray));
      labelArray['predict_y'] = [[values['预测集名称'], true]];
      executeCommand(() => {
        update(item, {
          labelArray:labelArray
        });
      });
    });
  }
  testLabelInput=(group, getFieldDecorator)=>{
    if(group === 'ml'){
      const { propsAPI } = this.props;
      const { getSelected, update } = propsAPI;
      const item = getSelected()[0];
      let labelArray = JSON.parse(JSON.stringify(item.model.labelArray));
      labelArray['predict_y'] = [['predict', true]];
      update(item, {
        labelArray:labelArray
      });
      return <Item style={{margin:0}} label="预测集名称" {...inlineFormItemLayout}>
              {
                getFieldDecorator('预测集名称', {
                  initialValue: 'predict',
                })(<Input onBlur={this.handleSubmitTest}/>)
              }
            </Item>
    }
  }
  render() {
    const { form, propsAPI } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;

    const item = getSelected()[0];
    
    if (!item) {
      return null;
    }

    const { label, attr, anchor, group } = item.getModel();

    var targetid = new Array(anchor[0]).fill(0);
    const inf = propsAPI.save().edges;
    for(let i in inf){
        if(inf[i].target === item.id && inf[i].targetAnchor < anchor[0]){
          targetid[inf[i].targetAnchor] = inf[i].source;
        }
    }
    if(anchor[0] === 2){
      targetid=[targetid[0], ...targetid];
    }
    var arr = []
    if(group !== 'feature'){
      for (let i in attr) {
        let o = {};
        o[i] = attr[i];
        arr.push(o)
      }
    }
    return (
      <Card 
        type="inner" 
        title="参数" 
        bordered={false} 
        style={{paddingRight:0}}
        className={styles.scrollapp}
      >
        <Form onSubmit={this.handleSubmit}>
          <Item style={{margin:0}} label="label" {...inlineFormItemLayout}>
            {
              getFieldDecorator('label', {
                initialValue: label,
              })(<Input onBlur={this.handleSubmit}/>)
            }
          </Item>
          {arr.map((item)=>{
            const itemKey = Object.keys(item)[0];
            var re = /^[0-9]+.?[0-9]*/;
            return <Item style={{margin:0}} label={itemKey} {...inlineFormItemLayout}>
                    {
                      getFieldDecorator(`attr.${itemKey}` , {
                        rules:re.test(item[itemKey])?[{
                          required:false,
                          pattern: new RegExp(/^[1-9]\d*$/, "g"),
                          message: '请输入数字'
                        }]:[],
                        initialValue: item[itemKey],
                      })(<Input style={{margin:0}} onBlur={this.handleSubmit}/>)
                    }
                  </Item>;
          })}
          {targetid.map((value, index)=>{
            return <Selectword 
                      sourceid={value}
                      label={label}
                      index={index}
                      style={{margin:0}}
                      changeLabelArray={this.changeLabelArray}
                    ></Selectword>;
          })}
          {this.testLabelInput(group, getFieldDecorator)}
          {this.isFeature(group, label, targetid[0])}
          {this.isInputOutput(label)}
        </Form>
      </Card>
    );
  }
}

export default Form.create()(withPropsAPI(NodeDetail));
