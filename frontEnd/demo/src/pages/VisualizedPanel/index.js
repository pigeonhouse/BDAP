import React from 'react';
import { Row, Col, Radio, Button } from 'antd';

import DataSource from '../../PublicComponents/VisualDataSource';
import Filter from '../../PublicComponents/VisualFilter';

import styles from './index.less';

class VisualizedPanel extends React.Component {

    state = {
        currentChart: "table",
        dataSourceName: undefined,
        filter: [],
        Summarize: [],
        dataSet: [],
    }

    handleAddFilter = (label, operator, value) => {
        let filter = this.state.filter;
        filter.push({
            label, operator, value
        })
        this.setState({ filter })
        console.log(filter);

        this.getDataSetByOperate();
    }

    handleDeleteFilter = (tag) => {
        this.setState({ filter:tag });

        this.getDataSetByOperate();
    }

    getDataSetByOperate = () => {
        //操作，发送sql语句获取dataSet
        console.log('test');
    }

    selectVisibleChart = () => {
        switch (this.state.currentChart) {
            case "table": return (<div></div>);
            case "line": return (<div></div>);
            case "bar": return (<div></div>);
            case "pie": return (<div></div>);
            case "scatter": return (<div></div>);
            case "funnel": return (<div></div>);
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
                    <Col span={6}>Data Visualization</Col>
                    <Col span={18}>
                        <div style={{ float: "right", marginRight: 20 }} >
                            <DataSource></DataSource>
                            <Button>Save</Button>
                            <Button>Filter</Button>
                            <Button>Summarize</Button>
                        </div>
                    </Col>
                </Row>
                <Row className={styles.visualized}>
                    <Col span={19} >
                        <div className={styles.charter}>
                            {this.selectVisibleChart()}
                        </div>
                        <div className={styles.footer} style={{ textAlign: "center" }} >
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
                        </div>
                    </Col>
                    <Col span={5} className={styles.righter} >
                        <Filter
                            handleAddFilter={this.handleAddFilter}
                            handleDeleteFilter={this.handleDeleteFilter}
                            filter={this.state.filter}
                        ></Filter>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default VisualizedPanel;