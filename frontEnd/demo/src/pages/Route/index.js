import React from 'react';
import { Button,Card, Tooltip } from 'antd';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';

var IntroJs = require('intro.js')

class RouteMode extends React.Component {
  state={
    resirect: 'route',
  }

  insertLocal=()=>{
    this.setState({
      redirect:'local'
    })
  }
  insertCluster=()=>{
    this.setState({
      redirect:'cluster'
    })
  }

  startIntro = () => {
    // 获取包含引导元素的父容器, 并组成IntroJs
    var intro1 = IntroJs(document.getElementById('root'))
    intro1.setOptions({
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "结束",
    }).start();
}
  render() {
    if (this.state.redirect === 'local') {
      return <Redirect to="/local" />;
    }
    else if(this.state.redirect === 'cluster'){
      return <Redirect to="/cluster" />;
    }
    else return (
      <div>
        <Row>
        <div id='root' data-step="1" data-intro='开始引导!'>
            <Card bordered={true} style={{ width: '100%' }} >
                <Button onClick={() => this.startIntro()}>开始引导</Button>
            </Card>
          </div>
        <Col span={12}>
        
        <div data-step="2" data-intro='单机模式'>
        <Button style={{height:200,width:400,margin:150,fontSize:25}} onClick={this.insertLocal}>LOCAL MODE</Button>
        </div>

        </Col>

        <Col span={12}>
        <div data-step="3" data-intro='集群模式'>
        <Button style={{height:200,width:400,margin:150,fontSize:25}} onClick={this.insertCluster}>CLUSTER MODE</Button>
        </div>
        </Col>
        </Row>
      </div>
    );
  }
}

export default RouteMode;
