import { getValueFromDataSet } from '../getValueFromDataSet';

export function createLineChart(myChart, props) {
    const { dataSet, chartStyle, loading, titleText } = props;
    const { xLabel, yLabel, color } = chartStyle;
    if (loading === true) {
        myChart.showLoading();
        return;
    } else {
        myChart.hideLoading();
    }
    if (xLabel === undefined || yLabel === undefined) return;

    var option = {
        title: {
            text: titleText,
            x: 'center'
        },
        xAxis: {
            name: xLabel,
            type: 'category',
            data: getValueFromDataSet(xLabel, dataSet)
        },
        yAxis: {
            name: yLabel,
            type: 'value'
        },
        series: [{
            data: getValueFromDataSet(yLabel, dataSet),
            type: 'line',
            smooth: true
        }],
        color
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
