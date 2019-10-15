import { getValueFromDataSet } from '../getValueFromDataSet';
export function createBarChart(myChart, props) {
    const { dataSet, chartStyle } = props;
    const { xLabel, yLabel, color } = chartStyle;
    if(xLabel === undefined || yLabel === undefined) return;
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '饼图'
        },
        tooltip: {},
        xAxis: {
            name:xLabel,
            data: getValueFromDataSet(xLabel, dataSet)
        },
        yAxis: {
            name:yLabel,
        },
        series: [{
            name: yLabel,
            type: 'bar',
            data: getValueFromDataSet(yLabel, dataSet)
        }],

        color
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}