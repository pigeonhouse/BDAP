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
            case "table": myChart.dispose(); return;
            case "line":
                createLineChart(myChart, this.props.dataSet);
                window.onresize = function () {
                    myChart.resize();
                }
            case "bar": return createBarChart(myChart, this.props.dataSet);
            case "pie": return createPieChart(myChart, this.props.dataSet);
            case "scatter": return createScatterChart(myChart, this.props.dataSet);
            case "funnel": return createFunnelChart(myChart, this.props.dataSet);
        }
    }


    render() {
        const { currentChart } = this.props;
        return (
            <div className={styles.charter}>
                <div id="main" className={currentChart === 'table' ? styles.chartHidden : styles.chartVisual}></div>
                <div className={currentChart !== 'table' ? styles.tableHidden : styles.tableVisual}>
                    <VisualTable dataSet={this.props.dataSet || []} labelArray={this.props.labelArray || []} />
                </div>
            </div>
        );
    }
}

export default VisualChart;