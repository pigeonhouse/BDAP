import React from "react"
import { Row, Col, Tabs, Button, Table } from "antd";
import Networktable from "./networktable"
import styles from "./index.less"
import EdgeModel from "./EdgeModel.js"
import PointModel from "./PointModel.js"
import AttributeModel from "./AttributeModel.js"
class DataPanel extends React.Component {
    handleClick = (info) => {
        this.props.handleClick(info);
        console.log(info)
    }
    render() {
        return (
            <div>
                <Row style={{ height: "70px" }}>
                    <h2 >网络挖掘模块</h2>
                </Row>
                <Row style={{ height: "350px" }} >
                    <Row >
                        <Col offset={2} span={10}>
                            <h3 >网络导入</h3>
                        </Col>
                        <Col offset={2} span={10}>
                            <h3>网络管理</h3>
                        </Col>
                    </Row>

                    <Row>
                        <Col offset={2} span={8}>
                            <Row>
                                <div className={styles.text}>
                                    <EdgeModel />
                                </div>
                                <div className={styles.text}>
                                    <PointModel />
                                </div>
                                <div className={styles.text}>
                                    <AttributeModel />
                                </div>
                            </Row>
                            <Row>
                                <Col offset={18} style={{ marginTop: 10 }} span={6} >
                                    <Button
                                        style={{ marginLeft: 10 }}>确定导入</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col offset={2} span={10}>
                            <Networktable handleClick={this.handleClick}/>
                        </Col>
                    </Row>
                </Row>
            </div>
        )
    }
}
export default DataPanel;