import React from 'react';
import styles from './index.less';
import VisualTable from './VisualTable';

import { createBarChart } from './BarChart';
import { createLineChart } from './LineChart';
import { createPieChart } from './PieChart';
import { createFunnelChart } from './FunnelChart';
import { createScatterChart } from './ScatterChart';

var echarts = require('echarts');

var chartBox = null, myChartSize = null, myChart = null;

function chartssize(container, charts) {
    function getStyle(el, name) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(el, null);
        } else {
            return el.currentStyle;
        }
    }
    var wi = getStyle(container, 'width').width;
    var hi = getStyle(container, 'height').height;

    if (charts.style.width === wi && charts.style.height === hi) return;
    charts.style.width = wi;
    charts.style.height = hi;

    myChart.resize();
}

window.onresize = function () {
    if (chartBox === null || myChartSize === null || myChart === null) return;
    chartssize(chartBox, myChartSize)
}

class VisualChart extends React.Component {

    componentDidMount() {
        chartBox = document.getElementById('chartBox');
        myChartSize = document.getElementById('main');
        myChart = echarts.init(document.getElementById('main'));
    }

    componentDidUpdate = () => {
        myChart = echarts.init(document.getElementById('main'));
        myChart.clear();

        if (this.props.currentChart !== "table") {
            chartssize(chartBox, myChartSize);
        }
        switch (this.props.currentChart) {
            case "table": myChart.dispose(); myChart = null; return;
            case "line": return createLineChart(myChart, this.props);
            case "bar": return createBarChart(myChart, this.props);
            case "pie": return createPieChart(myChart, this.props);
            case "scatter": return createScatterChart(myChart, this.props);
            case "funnel": return createFunnelChart(myChart, this.props);
        }
    }

    render() {
        const { currentChart, dataSet, labelArray } = this.props;
        return (
            <div className={styles.charter} id="chartBox" >
                <div id="main" className={currentChart === 'table' ? styles.chartHidden : styles.chartVisual}></div>
                <div className={currentChart !== 'table' ? styles.tableHidden : styles.tableVisual}>
                    <VisualTable
                        dataSet={dataSet}
                        loading={this.props.loading}
                        labelArray={labelArray} />
                </div>
            </div>
        );
    }
}

export default VisualChart;
