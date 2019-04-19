import React from 'react';
import { Row, Col, Card, Form, Input, Button, message, Icon, Checkbox, notification} from 'antd';
import { Redirect } from 'react-router-dom';
import style from './index.less';

const FormItem = Form.Item;

class HomePage extends React.Component {
  state={
    redirect:false,
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
    <div className = {style.editor}>
      <Row
        style={{ lineHeight: '40px',height: '40px', backgroundColor:'#343941',color:"white" }}
      >
        <Col span={1}>
          <Button style={{border:0,backgroundColor:'#343941',color:"#ddd"}} size="large">
              <Icon type="bars" style={{fontSize:20}} />
          </Button>
        </Col>
        <Col span={21}>
          <Button style={{border:0,backgroundColor:'#343941',color:"#ddd",fontSize:18,fontFamily:'consolas'}}>BigDataPlayground Local-Mode</Button>
        </Col>      
        <Col span={2}>
          <a href="https://www.yuque.com/ddrid/tx7z84">
            <Button style={{border:0,backgroundColor:'#343941',color:"#ddd",fontSize:25}} >
                <Icon type="question-circle" data-step="5" data-intro="如果想要进一步了解详细的使用教程及组件介绍，请点击此处查看文档。"/>
            </Button>                  
          </a>
        </Col>      
        <a href="https://github.com/pigeonhouse/BigDataPlayground" className={style.githubCorner} aria-label="View source on GitHub">
            <svg 
              width="45" 
              height="45" 
              viewBox="0 0 250 250" 
              style={{
                fill:'#fff', 
                color:'#343941',
                position: 'absolute', 
                top: 0,
                border: 0,
                right: 0}}
              aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin: '130px 106px'}} className={style.octoArm}></path>
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className={style.octoBody}></path>
            </svg>
          </a>     
      </Row>
      <Row style={{alignItems:'center', verticalAlign: 'middle', margin: '0 auto'}}>
        <Col span={15} />
          <Col span={6} style={{margin: '0 auto'}}>
            <Card title="Welcome to demo!"  className={style.loginCard} color='black' >
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
        <Col span={3} />
      </Row>
    </div>
    );
  }

}

export default Form.create()(HomePage);
