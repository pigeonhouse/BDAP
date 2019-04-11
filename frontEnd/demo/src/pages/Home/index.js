import React from 'react';
import { Row, Col, Card, Form, Input, Button, message, Icon, Checkbox, notification} from 'antd';
import { Redirect } from 'react-router-dom';
import style from './index.less';

const FormItem = Form.Item;

class HomePage extends React.Component {
  state={
    resirect:false,
    username: '',
    password: '',
    remind:'',
    rememberPassword: false,
  }
  loadAccountInfo=()=>{
    let arr,reg=new RegExp("(^| )"+'accountInfo'+"=([^;]*)(;|$)");
    let accountInfo =''
    if(arr=document.cookie.match(reg)){
        accountInfo = unescape(arr[2]);
    }
    else{
        accountInfo = null;
    }
    if(Boolean(accountInfo) == false){
        return false;
    }else{
        let userName = "";
        let passWord = "";
        let Remind = "";
 
        let i=new Array()
        i = accountInfo.split("&");
        userName = i[0],
        passWord = i[1],
        Remind = i[2],
        this.setState({
            username: userName,
            password: passWord,
            remind: Remind
        })
      }
  }
  componentWillMount() {
    this.loadAccountInfo();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        if(values.username==='demo' && values.password==='123456'){
          if(values.remember){
            let accountInfo = '';
            if(this.state.remind === '')
              accountInfo = values.username+ '&' +values.password + '&' + 'true';
            else accountInfo = values.username+ '&' +values.password + '&' + this.state.remind;
            let Days = 3;
            let exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = 'accountInfo' + "="+ escape(accountInfo) + ";expires=" + exp.toGMTString()
          }
          this.setState({redirect: true});
          message.success(`${userInfo.username}, welcome`);
        }
        else {
          alert('Password error');
        }
      }
     })
  }
  render() {
    if (this.state.redirect) {
      notification['success']({
        message: '进入模式选择页面',
        description: '在这里选择使用的模式',
        duration: 1
      });
      this.setState({redirect:false})
      return <Redirect to="/route" />;
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
                      getFieldDecorator('username',{
                        initialValue: this.state.username,
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
                      getFieldDecorator('password',{
                        initialValue:this.state.password,
                        rules:[
                          {
                            required:true,
                            message:'Password cannot be empty'
                          },
                        ]
                      })(
                        <Input 
                          prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)'}}/>} 
                          placeholder='password:123456' type='password'
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
