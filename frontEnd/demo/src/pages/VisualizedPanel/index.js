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

/**
 * 数据可视化界面，对上传的数据进行处理和可视化展示
 */
class VisualizedPanel extends React.Component {

    /**
     * rightCol：string 右侧参数栏的状态，包括：filter，summarize和settings
     * currentChart：string 当前图表的类型，包括table和各种图
     * dataSourceName：string 向后端请求时，使用的dataName
     * fileName：string 当前数据所在的文件名
     * fileColumns：array 当前数据的元数据
     * dataSet：array 当前数据
     * filter：array 过滤有关的配置
     * summarize：array 聚集有关的配置
     * groupLabel：string  summarize中分组设置
     * 
     * labelArray：array  settings中可供选取的列的列名数组
     * labelType：array  settings中可供选取的列的类型数组
     * 
     * chartStyle：图中颜色取值
     * titleText：展示为图时，图的标题
     */

    state = {
        rightCol: "filter",
        currentChart: "table",

        dataSourceName: 'data',
        fileName: null,
        fileColumns: [],
        dataSet: [],

        filter: [],
        summarize: [],
        groupLabel: undefined,

        labelArray: [],
        labelType: [],

        chartStyle: {
            // color: ['#c23531', '#2f4554', '#61a0a8', '#d48265',
            //  '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
            color: "#509ee3",
        },
        titleText: '',
        loading: false,
    }

    // 初始化，从后端拿到父组件url属性确定的数据
    async componentWillMount() {
        const { url } = this.props;
        
        if (url === null || url === undefined) return;
        const init = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            credentials: 'include'
        }
        const response = await fetchTool(url, init);

        if (response.status === 200) {
            const res = await response.text();

            // 将后端返回的字符串，通过papa转化为可供前端展示的数组
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

            // 初始化元数据，每列的名字，类型
            this.initLabelArray(fieldNameArray, labelType);
            // 初始化数据
            this.initDataSet(results.data, fieldNameArray.length);
        }
    }

    // 初始化labelArray, labelType, fileColumns参数
    initLabelArray = (labelArray, labelType) => {
        this.setState({ labelArray, labelType, fileColumns: labelArray });
    }

    // 初始化dataSet
    initDataSet = (dataSet, length) => {
        this.setState({ dataSet })
    }

    // 修改settings可选择的列名数组及列名类型
    changeLabelArray = (labelArray, labelType) => {
        this.setState({ labelArray, labelType });
    }

    // 更新过滤或聚集后的数据dataset
    changeDataSet = (dataSet, length) => {
        this.setState({ dataSet })
    }

    // 更换图的样式
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

    /**
     * 根据rightCol的值生成右侧参数栏
     * 包括filter（过滤），summarize（聚类），settings（图可视化配置信息）三类
     */
    rightColGenerate = () => {
        const { height } = this.props;
        const { rightCol, filter, loading, fileColumns,
            summarize, groupLabel, chartStyle, labelArray, labelType } = this.state;
        switch (rightCol) {
            case 'filter':
                return (
                    <Filter
                        handleAddFilter={this.handleAddFilter}
                        handleDeleteFilter={this.handleDeleteFilter}
                        filter={filter}
                        loading={loading}
                        height={height}
                        labelArray={fileColumns} />
                )
            case 'summarize':
                return (
                    <Summarize
                        handleChangeGroupLabel={this.handleChangeGroupLabel}
                        handleAddSummarize={this.handleAddSummarize}
                        handleDeleteSummarize={this.handleDeleteSummarize}
                        summarize={summarize}
                        groupLabel={groupLabel}
                        height={height}
                        loading={loading}
                        labelArray={fileColumns} />
                )
            case 'settings':
                return (
                    <Settings
                        currentChart={this.state.currentChart}
                        handleChangeChartStyle={this.handleChangeChartStyle}
                        chartSettings={chartSettings}
                        chartStyle={chartStyle}
                        labelArray={labelArray}
                        height={height}
                        loading={loading}
                        labelType={labelType}
                    />
                )
        }
    }

    // 根据value选择展示的右侧参数栏
    handleChangeRightCol = (value) => {
        this.setState({ rightCol: value })
    }

    render() {
        const { height } = this.props;
        const { currentChart, chartStyle, titleText, dataSet, loading, labelArray } = this.state;
        return (
            <div style={{ height: `calc(100vh - ${height}px)` }} >
                <Row type="flex" className={styles.header}>
                    <Col span={6} style={{ paddingLeft: "30px" }} ><h2>DataSource</h2></Col>

                    {/* 变换右侧参数栏 */}
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
                <Row type="flex" style={{ height: `calc(100vh - ${height + 40}px)` }} >
                    <Col span={19} >
                        
                        {/* 展示图或表格 */}
                        <VisualChart
                            currentChart={currentChart}
                            chartStyle={chartStyle}
                            titleText={titleText}
                            dataSet={dataSet}
                            loading={loading}
                            labelArray={labelArray}
                            height={height}
                        />
                        <div className={styles.footer}
                            style={{ textAlign: "center", borderTop: "1px solid #ececec", paddingTop: 10 }}
                        >
                            {/* 转换图表 */}
                            <Radio.Group
                                value={currentChart}
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
                    <Col span={5} className={styles.righter} style={{ height: `calc(100vh - ${height + 40}px)` }} >
                        {this.rightColGenerate()}
                    </Col>
                </Row>
            </div >
        );
    }
}

export default VisualizedPanel;
