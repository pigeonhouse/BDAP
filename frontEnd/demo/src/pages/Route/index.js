import React from 'react';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';

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
        <Button onClick={this.insertLocal}>lOCAL</Button>
        <Button onClick={this.insertCluster}>CLUSTER</Button>
      </div>
    );
  }
}

export default RouteMode;
