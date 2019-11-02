import React from 'react';
import { Row, Col, Radio, Button } from 'antd';

import Filter from '../../PublicComponents/VisualFilter';
import Summarize from '../../PublicComponents/VisualSummarize';
import VisualChart from '../../PublicComponents/VisualChart';
import Settings from '../../PublicComponents/VisualChartSettings';
import { chartSettings } from '../../PublicComponents/VisualChart/chartSettings';

import styles from './index.less';
import Papa from 'papaparse';

import { fetchTool } from '../../FetchTool';

class VisualizedPanel extends React.Component {

    state = {
        currentChart: "table",
        rightCol: "filter",
        dataSourceName: 'data',
        fileName: null,
        fileColumns: [],
        filter: [],
        summarize: [],
        dataSet: [],
        labelArray: [],
        labelType: [],
        groupLabel: undefined,
        chartStyle: {
            // color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
            color: "#509ee3",
        },
        titleText: '',
        loading: false,
    }

    async componentWillMount() {
        const { filePath } = this.props;
        if (filePath === undefined) return;
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        }
        const url = `/experiment-service/query/readyForData?filePath=${filePath}`;
        const response = await fetchTool(url, init);

        if (response.status === 200) {
            const res = await response.text();
            console.log(res)

            // 通过papa转化
            const results = Papa.parse(res, { header: true, dynamicTyping: true });
            let labelType = {};
            const fieldNameArray = results.meta.fields;

            const result = results.data[0];
            for (let i in result) {
                if (typeof (result[i]) === "number") {
                    labelType[i] = "int";
                } else {
                    labelType[i] = "string";
                }
            }

            this.initLabelArray(fieldNameArray, labelType);
            this.initDataSet(results.data, fieldNameArray.length);
        }
    }

    initLabelArray = (labelArray, labelType) => {
        this.setState({ labelArray, labelType, fileColumns: labelArray });
    }

    initDataSet = (dataSet, length) => {
        this.setState({ dataSet })
    }

    changeLabelArray = (labelArray, labelType) => {
        this.setState({ labelArray, labelType });
    }

    changeDataSet = (dataSet, length) => {
        this.setState({ dataSet })
    }

    handleChangeChartStyle = (chartStyle, obj = {}) => {
        this.setState({ chartStyle, ...obj })
    }

    //group by的label修改
    handleChangeGroupLabel = (value) => {
        const { dataSourceName, filter, summarize } = this.state;
        this.setState({ groupLabel: value });

        this.getDataSetByOperate(dataSourceName, filter, summarize, value);
    }

    //增加分组方式
    handleAddSummarize = (label, operator) => {
        const { dataSourceName, filter, groupLabel } = this.state;

        let summarize = this.state.summarize;
        summarize.push({
            label, operator
        })
        this.setState({ summarize });

        this.getDataSetByOperate(dataSourceName, filter, summarize, groupLabel);
    }

    // 删除分组方式
    handleDeleteSummarize = (summarize) => {
        const { dataSourceName, filter, groupLabel } = this.state;

        this.setState({ summarize });

        this.getDataSetByOperate(dataSourceName, filter, summarize, groupLabel);
    }

    // 增加过滤器方式
    handleAddFilter = (label, operator, value) => {
        const { dataSourceName, summarize, groupLabel } = this.state;

        let filter = this.state.filter;
        filter.push({
            label, operator, value
        })
        this.setState({ filter });

        this.getDataSetByOperate(dataSourceName, filter, summarize, groupLabel);
    }

    // 删除过滤器方式
    handleDeleteFilter = (filter) => {
        const { dataSourceName, summarize, groupLabel } = this.state;

        this.setState({ filter });

        this.getDataSetByOperate(dataSourceName, filter, summarize, groupLabel);
    }

    // 向后端发送请求，参数为sql语句，返回值为Dataset
    getDataSetByOperate = async (dataSourceName, filter, summarize, groupLabel) => {
        this.setState({ loading: false });

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
                let filterString = '';
                if (this.state.labelType[item.label] === 'int') {
                    filterString = `${item.label}${item.operator}${item.value}`;
                }
                else if (this.state.labelType[item.label] === 'string') {
                    filterString = `${item.label}${item.operator}'${item.value}'`;
                }
                where += index === 0 ? ' WHERE ' : ' AND ';
                where += filterString;
            })
        }

        sqlCode = `SELECT ${label} FROM ${dataSourceName}${where}${group}`;

        console.log(sqlCode);

        const init = {
            method: 'POST',
            mode: 'cors',
            body: 'sql=' + sqlCode,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            credentials: 'include'
        }

        const response = await fetchTool("/experiment-service/query/sql", init);

        if (response.status === 200) {
            const res = await response.text();

            // 通过papa转化
            const results = Papa.parse(res, { header: true, dynamicTyping: true });
            let labelType = {};
            const fieldNameArray = results.meta.fields;

            const result = results.data[0];
            for (let i in result) {
                if (typeof (result[i]) === "number") {
                    labelType[i] = "int";
                } else {
                    labelType[i] = "string";
                }
            }

            this.changeLabelArray(fieldNameArray, labelType);
            this.changeDataSet(results.data, fieldNameArray.length);
            this.setState({ loading: false });
        }
    }

    // currentChart类型修改
    handlechangeCurrentChart = (e) => {
        // if(e.target.value !== 'table'){
        //     this.setState({
        //         chartStyle: {
        //             color: "#509ee3",
        //         },
        //     })
        // }
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
                        loading={this.state.loading}
                        labelArray={this.state.fileColumns} />
                )
            case 'summarize':
                return (
                    <Summarize
                        handleChangeGroupLabel={this.handleChangeGroupLabel}
                        handleAddSummarize={this.handleAddSummarize}
                        handleDeleteSummarize={this.handleDeleteSummarize}
                        summarize={this.state.summarize}
                        groupLabel={this.state.groupLabel}
                        loading={this.state.loading}
                        labelArray={this.state.fileColumns} />
                )
            case 'settings':
                return (
                    <Settings
                        currentChart={this.state.currentChart}
                        handleChangeChartStyle={this.handleChangeChartStyle}
                        chartSettings={chartSettings}
                        chartStyle={this.state.chartStyle}
                        labelArray={this.state.labelArray}
                        loading={this.state.loading}
                        labelType={this.state.labelType}
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
                <Row type="flex" className={styles.header}>
                    <Col span={6} style={{ paddingLeft: "30px" }} ><h2>DataSource</h2></Col>
                    <Col span={18}>
                        <div style={{ float: "right", marginRight: 20 }} >
                            <Button onClick={this.handleChangeRightCol.bind(this, "filter")} >Filter</Button>
                            <Button onClick={this.handleChangeRightCol.bind(this, "summarize")} >Summarize</Button>
                            <Button onClick={this.handleChangeRightCol.bind(this, "settings")} >Settings</Button>
                            {/* <Button>Save</Button>
                            <Button>Download</Button> */}
                        </div>
                    </Col>
                </Row>
                <Row type="flex" className={styles.visualized}>
                    <Col span={19} >
                        <VisualChart
                            currentChart={this.state.currentChart}
                            chartStyle={this.state.chartStyle}
                            titleText={this.state.titleText}
                            dataSet={this.state.dataSet}
                            loading={this.state.loading}
                            labelArray={this.state.labelArray}
                        />
                        <div className={styles.footer}
                            style={{ textAlign: "center", borderTop: "1px solid #ececec", paddingTop: 10 }}
                        >
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
