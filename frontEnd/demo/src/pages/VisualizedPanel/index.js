import React from 'react';
import { Row, Col, Radio, Button } from 'antd';

import styles from './index.less';

class VisualizedPanel extends React.Component {

    state = {
        currentChart: "table",
    }

    selectVisibleChart = () => {
        switch(this.state.currentChart){
            case "table": return(<div></div>);
            case "line": return(<div></div>);
            case "bar": return(<div></div>);
            case "pie": return(<div></div>);
            case "scatter": return(<div></div>);
            case "funnel": return(<div></div>);
        }
    }

    handlechangeCurrentChart = (e) => {
        this.setState({
            currentChart: e.target.value,
        });
    }

    render() {
        return (
            <div style={{ height: 'calc(100vh - 105px)' }} >
                <Row className={styles.header}>
                    <Col span={18}>Data Visualization</Col>
                    <Col span={6}>
                        <Button>DataSource</Button>
                        <Button>Save</Button>
                        <Button>Filter</Button>
                        <Button>Summarize</Button>
                    </Col>
                </Row>
                <Row className={styles.visualized}>
                    <Col span={18}>
                        {this.selectVisibleChart()}
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Row className={styles.footer}>
                    <Col span={8}></Col>
                    <Col span={8} >
                        <Radio.Group
                            value={this.state.currentChart}
                            buttonStyle="solid"
                            className={styles.radioButton}
                            onChange={this.handlechangeCurrentChart}
                        >
                            <Radio.Button value="table">表格</Radio.Button>
                            <Radio.Button value="line">折线图</Radio.Button>
                            <Radio.Button value="bar">柱状图</Radio.Button>
                            <Radio.Button value="pie">饼图</Radio.Button>
                            <Radio.Button value="scatter">散点图</Radio.Button>
                            <Radio.Button value="funnel">漏斗图</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        );
    }
}

export default VisualizedPanel;