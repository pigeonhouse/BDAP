import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  
  const { Option } = Select;
  class ModuleForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>,
      );
  

      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="模块中文名">
            {getFieldDecorator('模块中文名', {
              rules: [
                {
                  required: true,
                  message: '请输入算法中文名!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="模块英文名">
            {getFieldDecorator('模块英文名', {
              rules: [
                {
                  type: 'string',
                  pattern: /^[a-z,A-Z]+$/,
                  message: '请输入合法的英文名!',
                },
                {
                  required: true,
                  message: '请输入模块中文名!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="所在分组">
            {getFieldDecorator('所在分组', {
              rules: [
                {required: true, message: '请选择分组!' },
              ],
            })(<Select>
                <Option value="数据预处理">数据预处理</Option>
                <Option value="机器学习">机器学习</Option>
                <Option value="预测">预测</Option>
                <Option value="模型评估">模型评估</Option>
                </Select>)}
          </Form.Item>

          <Form.Item label={<span>下锚点个数&nbsp;
                <Tooltip title="模块有几个输入？">
                  <Icon type="question-circle-o" />
                </Tooltip></span>}>
            {getFieldDecorator('上锚点个数', {
              rules: [
                {required: true, message: '请选择上锚点个数!' },
              ],
            })(<Select>
                <Option value="0">0</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                </Select>)}
          </Form.Item>

          <Form.Item label={<span>上锚点个数&nbsp;
                <Tooltip title="模块有几个输出？">
                  <Icon type="question-circle-o" />
                </Tooltip></span>}>
            {getFieldDecorator('下锚点个数', {
              rules: [
                {required: true, message: '请选择下锚点个数!' },
              ],
            })(<Select>
                <Option value="0">0</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                </Select>)}
          </Form.Item>



          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              确认无误，提交
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
const ModuleAddingForm = Form.create({ name: 'register' })(ModuleForm);
  
//   ReactDOM.render(<WrappedRegistrationForm />, mountNode);
export default ModuleAddingForm