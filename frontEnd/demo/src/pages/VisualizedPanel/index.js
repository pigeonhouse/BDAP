import React from 'react';
import { Row, Col, Radio, Button } from 'antd';

import DataSource from '../../PublicComponents/VisualDataSource';
import Filter from '../../PublicComponents/VisualFilter';
import Summarize from '../../PublicComponents/VisualSummarize';
import VisualChart from '../../PublicComponents/VisualChart';
import Settings from '../../PublicComponents/VisualChartSettings';
import styles from './index.less';

class VisualizedPanel extends React.Component {

    state = {
        currentChart: "table",
        rightCol: "filter",
        dataSourceName: 'dataTest',
        filter: [],
        summarize: [],
        dataSet: [],
        labelArray: ['jack', 'test'],
        groupLabel: undefined,
    }

    //group by的label修改
    handleChangeGroupLabel = (value) => {
        this.setState({ groupLabel: value });

        this.getDataSetByOperate();
    }

    //增加分组方式
    handleAddSummarize = (label, operator) => {
        let summarize = this.state.summarize;
        summarize.push({
            label, operator
        })
        this.setState({ summarize });

        this.getDataSetByOperate();
    }

    // 删除分组方式
    handleDeleteSummarize = (tag) => {
        this.setState({ summarize: tag });

        this.getDataSetByOperate();
    }

    // 增加过滤器方式
    handleAddFilter = (label, operator, value) => {
        let filter = this.state.filter;
        filter.push({
            label, operator, value
        })
        this.setState({ filter });

        this.getDataSetByOperate();
    }

    // 删除过滤器方式
    handleDeleteFilter = (tag) => {
        this.setState({ filter: tag });

        this.getDataSetByOperate();
    }

    // 向后端发送请求，参数为sql语句，返回值为Dataset
    getDataSetByOperate = () => {
        const { dataSourceName, filter, summarize, groupLabel } = this.state;
        var sqlCode, label;
        var where = '', group = '';

        // 没有group by 是否可求和
        if (groupLabel !== undefined) {
            label = groupLabel;
            summarize.map((item) => {
                label += `,${item.operator}(${item.label})`;
            })

            group = ` group by ${groupLabel}`;
        }
        else label = '*';

        if (filter.length !== 0) {
            filter.map((item, index) => {
                let filterString = `${item.label}${item.operator}'${item.value}'`;
                where += index === 0 ? ' WHERE ' : ' AND ';
                where += filterString;
            })
        }

        sqlCode = `SELECT ${label} FROM ${dataSourceName}${where}${group}`;


        //操作，发送sql语句获取dataSet
        console.log(sqlCode);
    }

    // currentChart类型修改
    handlechangeCurrentChart = (e) => {
        this.setState({
            currentChart: e.target.value,
        });
    }

    // 右侧参数栏生成
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
                        handleChangeGroupLabel={this.handleChangeGroupLabel}
                        handleAddSummarize={this.handleAddSummarize}
                        handleDeleteSummarize={this.handleDeleteSummarize}
                        summarize={this.state.summarize}
                        groupLabel={this.state.groupLabel}
                        labelArray={this.state.labelArray} />
                )
            case 'settings':
                return (
                    <Settings
                        currentChart={this.state.currentChart}
                        handleAddFilter={this.handleAddFilter}
                        handleDeleteFilter={this.handleDeleteFilter}
                        filter={this.state.filter}
                        labelArray={this.state.labelArray}
                    />
                )
        }
    }

    // 右侧参数栏变化
    handleChangeRightCol = (value) => {
        this.setState({ rightCol: value })
    }

    render() {
        return (
            <div style={{ height: 'calc(100vh - 105px)' }} >
                <Row className={styles.header}>
                    <Col span={6}><h2>DataSource</h2></Col>
                    <Col span={18}>
                        <div style={{ float: "right", marginRight: 20 }} >
                            <DataSource></DataSource>
                            <Button onClick={this.handleChangeRightCol.bind(this, "filter")} >Filter</Button>
                            <Button onClick={this.handleChangeRightCol.bind(this, "summarize")} >Summarize</Button>
                            <Button onClick={this.handleChangeRightCol.bind(this, "settings")} >Settings</Button>
                            <Button>Save</Button>
                            <Button>Download</Button>
                        </div>
                    </Col>
                </Row>
                <Row className={styles.visualized}>
                    <Col span={19} >
                        <VisualChart
                            currentChart={this.state.currentChart}
                            dataSet={this.state.dataSet}
                        />
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
            </div >
        );
    }
}

export default VisualizedPanel;