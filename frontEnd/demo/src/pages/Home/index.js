import React from 'react';
import { Row, Col, Card, Form, Input, Button, message, Icon, Checkbox} from 'antd';
import { Redirect } from 'react-router-dom';

import style from './index.less';

const FormItem = Form.Item;

class HomePage extends React.Component {
  state={
    resirect:false,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        if(values.userName==='demo' && values.passWord==='123456'){
          this.setState({redirect: true});
          message.success(`${userInfo.userName}, welcome`);
        }
        else {
          alert('Password error');
         }
      }
     })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/flow" />;
    }
    const {getFieldDecorator} = this.props.form;
    return (
      <Row type="flex" style={{ flex: 1, alignItems: 'center' }}>
        <Col span={9} />
          <Col span={6}>
            <Card title="Welcome to demo!">
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {
                      getFieldDecorator('userName',{
                        // initialValue:'demo',
                        rules:[
                          {
                            required:true,
                            message:'User name cannot be empty'
                          },
                          {
                            min:4,max:20,
                            message:'Length is out of range'
                          },
                          {
                            pattern:new RegExp('^\\w+$','g'),
                            message:'User names must be alphanumeric or underlined'
                          }
                        ]
                      })(
                        <Input 
                          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)'}}/>} 
                          placeholder='username:demo'
                        ></Input>
                      )
                    }
                </FormItem>
                <FormItem>
                    {
                      getFieldDecorator('passWord',{
                        // initialValue:'123456',
                        rules:[
                          {
                            required:true,
                            message:'Password cannot be empty'
                          },
                        ]
                      })(
                        <Input 
                          prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)'}}/>} 
                          placeholder='passWord:123456' type='password'
                        ></Input>
                      )
                    }
                </FormItem>
                <Form.Item>
                  {
                    getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>Remember me</Checkbox>
                  )}
                  <a className={style.loginFormForgot} href="">Forgot password</a>
                  <Button type='primary'htmlType="submit" className={style.loginButton}>Log in</Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        <Col span={9} />
      </Row>
    );
  }
}

export default Form.create()(HomePage);
