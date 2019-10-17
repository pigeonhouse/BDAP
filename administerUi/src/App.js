import React from 'react';
import './App.css';
import ModuleAddingForm from './ModuleForm';

import {
  Row,
  Col,
} from 'antd';


function App() {
  return ( 
  <div>
    <Row>
      <Col span={4}></Col>
      <Col span={14}>
        <Row style={{"height":"200px"}}></Row>
        <ModuleAddingForm></ModuleAddingForm>
      </Col>
      <Col span={5}></Col>
    </Row>
  </div>
  );
}

export default App;