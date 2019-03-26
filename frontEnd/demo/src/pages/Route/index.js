import React from 'react';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';

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
        <Col span={12}>
    
        <Button style={{height:200,width:400,margin:150,fontSize:25}} onClick={this.insertLocal}>LOCAL MODE</Button>
        
        </Col>

        <Col span={12}>
        
        <Button style={{height:200,width:400,margin:150,fontSize:25}} onClick={this.insertCluster}>CLUSTER MODE</Button>
        
        </Col>
        </Row>
      </div>
    );
  }
}

export default RouteMode;
