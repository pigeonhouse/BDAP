import React from 'react';
import { Row, Col, Radio, Button } from 'antd';

import DataSource from '../../PublicComponents/VisualDataSource';
import Filter from '../../PublicComponents/VisualFilter';
import Summarize from '../../PublicComponents/VIsualSummarize';

import styles from './index.less';

class VisualizedPanel extends React.Component {

    state = {
        currentChart: "table",
        rightCol: "filter",
        dataSourceName: undefined,
        filter: [],
        Summarize: [],
        dataSet: [],
        labelArray: ['jack', 'test'],
    }

    handleAddFilter = (label, operator, value) => {
        let filter = this.state.filter;
        filter.push({
            label, operator, value
        })
        this.setState({ filter });

        this.getDataSetByOperate();
    }

    handleDeleteFilter = (tag) => {
        this.setState({ filter: tag });

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

    rightColGenerate = () => {
        switch (this.state.rightCol) {
            case 'filter':
                return (
                    <Filter
                        handleAddFilter={this.handleAddFilter}
                        handleDeleteFilter={this.handleDeleteFilter}
                        filter={this.state.filter}
                        labelArray={this.state.labelArray} />
                )
            case 'summarize':
                return (
                    <Summarize
                        handleAddFilter={this.handleAddFilter}
                        handleDeleteFilter={this.handleDeleteFilter}
                        filter={this.state.filter}
                        labelArray={this.state.labelArray} />
                )
            case 'settings':
                return (
                    <Settings
                        currentChart={this.state.currentChart} />
                )
        }
    }

    handleFilter = () => {
        this.setState({ rightCol: "filter" })
    }
    handleSummarize = () => {
        this.setState({ rightCol: "summarize" })
    }
    handleSettings = () => {
        this.setState({ rightCol: "settings" })
    }

    render() {
        return (
            <div style={{ height: 'calc(100vh - 105px)' }} >
                <Row className={styles.header}>
                    <Col span={6}>Data Visualization</Col>
                    <Col span={18}>
                        <div style={{ float: "right", marginRight: 20 }} >
                            <DataSource></DataSource>
                            <Button onClick={this.handleFilter} >Filter</Button>
                            <Button onClick={this.handleSummarize} >Summarize</Button>
                            <Button onClick={this.handleSettings} >Settings</Button>
                            <Button>Save</Button>
                            <Button>Download</Button>
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
                        {this.rightColGenerate()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default VisualizedPanel;