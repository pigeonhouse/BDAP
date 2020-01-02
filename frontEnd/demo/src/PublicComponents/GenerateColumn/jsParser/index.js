import React, { Component } from 'react';
import MyEditor from './MyEditor';
import {Collapse,Icon,Table,Row,Col,Input,Button} from 'antd';
const { Panel } = Collapse;
class JsParser extends Component {
  render() {
    const{dataSource}=this.props;
    const columns = [
      {
        title: '列名',
        dataIndex: 'colName',
        key: 'colName',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'age',
      }
      
    ];
    return (
     
      <div >
        <Row style={{height:"50px"}}>
        <Col span={1}/>
        <Col span={12}>
          <h2>表达式编辑</h2>
          </Col>
          <Col span={1}/>
        <Col span={9}>
          <h2>可用资源</h2>
        </Col>  
        </Row>
        <Row>
        <Col span={1}/>
        <Col span={12}>
       
        <MyEditor></MyEditor>
        <Collapse defaultActiveKey={['1']} >
        <Panel header="这是什么？" key="1">
           <p>这是一个表达式编辑器，您可以在其中指定某一列或者某几列的计算规则，然后根据计算规则生成一个新的列作为运算的结果</p>
        </Panel>
        <Panel header="我该如何使用这一编辑器？" key="2">
        <Collapse defaultActiveKey={['1']} >
        <Panel header="运算符操作示例" key="1">
           <p>例1 在编辑器中输入"列1+列2"，编辑器将新生成列1与列2的对应行数值相加的一列，如果两行中有非数字型数值则会报错</p>
           <p>例2 在编辑器中输入"列1-列2"，编辑器将新生成列1与列2的对应行相减的一列，如果两行中有非数字型数值则会报错</p>
        </Panel>
        <Panel header="单行操作函数示例" key="2">
           <p>例1 在编辑器中输入"sin(列1)",编辑器将新生成数值上相当于对列1的对应行做sin运算的一列，如果该列中有非数字型数值则会报错</p>
           
        </Panel>
        <Panel header="多行操作函数示例" key="2">
           <p>例1 在编辑器中输入"concat(列1,列2)",编辑器将新生成等同于列1与列2对应行拼接的一列</p>
           
        </Panel>
        </Collapse>
        </Panel>
        </Collapse>
        </Col>
        <Col span={1}></Col>
        <Col span={9}>
        <Collapse defaultActiveKey={['1']} >
        <Panel header="编辑器中提供了哪些函数？" key="1">
        <Input
            placeholder="您也可以在这里查找您需要的函数"
            suffix={
              <Button
                className="search-btn"
                style={{ marginRight: -12 }}
                size="large"
                type="primary"
              >
                <Icon type="search" />
              </Button>
            }
          />
        <Collapse defaultActiveKey={['1']} >
        <Panel header="单操作数函数" key="1">
           <p>这是一个表达式编辑器</p>
        </Panel>
        <Panel header="多操作数函数" key="2">
           <p>这是一个表达式编辑器</p>
        </Panel>
        <Panel header="操作符" key="3">
          
        </Panel>
       
        </Collapse>
        
        </Panel>
        <Panel header="有哪些列名是合法的？" key="4">
        <Table size="small" dataSource={dataSource} columns={columns} />;
        </Panel>
        
      </Collapse>
      </Col>
      <Col span={1}></Col>
      </Row>
      </div>
      
    );
  }
}

export default JsParser;
