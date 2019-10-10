import React from 'react';
import styles from './index.less';
import VisualTable from './VisualTable';

import { createBarChart } from './BarChart';
import { createLineChart } from './LineChart';
import { createPieChart } from './PieChart';
import { createFunnelChart } from './FunnelChart';
import { createScatterChart } from './ScatterChart';

var echarts = require('echarts');

class VisualChart extends React.Component {

    componentDidUpdate = () => {
        var myChart = echarts.init(document.getElementById('main'));
        myChart.clear();
        switch (this.props.currentChart) {
            case "table": return;
            case "line": return createLineChart(myChart, this.props.dataSet);
            case "bar": return createBarChart(myChart, this.props.dataSet);
            case "pie": return createPieChart(myChart, this.props.dataSet);
            case "scatter": return createScatterChart(myChart, this.props.dataSet);
            case "funnel": return createFunnelChart(myChart, this.props.dataSet);
        }
    }

    selectVisibleChart = () => {
        if (this.props.currentChart === "table") {
            return (
                <VisualTable />
            );
        }
    }

    render() {
        return (
            <div className={styles.charter}>
                <div id="main" style={this.props.currentChart === 'table' ? { width: 0, height: 0 } : { width: "1100px", height: '470px' }}></div>
                {this.selectVisibleChart()}
            </div>
        );
    }
}

export default VisualChart;