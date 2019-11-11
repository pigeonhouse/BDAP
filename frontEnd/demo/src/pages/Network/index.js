import React from "react"
import { Row, Col,Tabs, Table } from "antd";
import { Button } from "antd/lib/radio";
const { TabPane } = Tabs;
const dataSource = [
    {
      key: '1',
      name: '网络1',
      points: 32,
      edges: 55,
      time:2019
    },
    {
        key: '2',
        name: '网络2',
        points: 3,
        edges: 5,
        time:2019
      },
      {
        key: '3',
        name: '网络3',
        points: 32,
        edges: 58,
        time:2019
      },
  ];
  
  const columns = [
    {
      title: '网络名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '点数',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: '边数',
      dataIndex: 'edges',
      key: 'edges',
    },
    {
        title: '生成时间',
        dataIndex: 'time',
        key: 'time',
      },
  ];
class NetworkPanel extends React.Component {
render()
{
    return(
    <div>
     <Row  style={{height:"60px"}}>
       <h1 >网络挖掘模块</h1>
     </Row>
     
     <Row style={{height:"500px"}} >
     <div style={{height:"50px"}}>
            </div>
        <Row >
        <Col offset={2} span={12}>
        <h2 >网络导入</h2>
        </Col>
        <Col span={5}>
        <h2>网络管理</h2>
        </Col>
       </Row>
     
       <Row>
         <Col offset={2} span={3}>
         <div style={{height:"100px"}}>
            点信息上传选项
         </div>
         <div style={{height:"100px"}}>
            边信息上传选项
         </div>
         <div style={{height:"100px"}}>
            统计信息上传选项
         </div>
         </Col>
         <Col span={6}>
            <div style={{paddingTop:"21px"}}>
              数据展示
                </div>
         </Col>
         <Col offset={3} span={5}>
         <Table bordered columns={columns} dataSource={dataSource}></Table>
         </Col>
       </Row>
       
     </Row>
     
     <Row span={2} style={{height:"60px"}}>
        <Button>开始导入</Button>
        <Button>确定</Button>
     </Row>
    </div>
    )
}
}
export default NetworkPanel;