import React from 'react';
import styles from './index.less';
import VisualTable from './VisualTable';

var echarts = require('echarts');

class VisualChart extends React.Component {

    componentDidUpdate = () => {
        switch (this.props.currentChart) {
            case "table":
                var myChart = echarts.init(document.getElementById('main'));
                myChart.clear();
                return;
            case "line": case "bar": case "pie":
            case "scatter": case "funnel":
                this.changeCurrentChart();
        }

    }

    selectVisibleChart = () => {
        if (this.props.currentChart === "table") {
            return (
                <div><VisualTable /></div>
            );
        }
    }

    changeCurrentChart = () => {
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    render() {
        return (
            <div className={styles.charter}>
                <div id="main" style={this.props.currentChart === 'table' ? { width: 0, height: 0 } : { width: "1100px", height: 'calc(100vh - 235px)' }}></div>
                {this.selectVisibleChart()}
            </div>
        );
    }
}

export default VisualChart;