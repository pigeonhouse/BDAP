import { getValueFromDataSet } from '../getValueFromDataSet';
export function createBarChart(myChart, props) {
    const { dataSet, chartStyle, loading } = props;
    const { xLabel, yLabel, color } = chartStyle;
    if (loading === true) {
        myChart.showLoading();
        return;
    } else {
        myChart.hideLoading();
    }
    
    if (xLabel === undefined || yLabel === undefined) return;
    // 指定图表的配置项和数据
    var option = {

        xAxis: {
            name: xLabel,
            data: getValueFromDataSet(xLabel, dataSet)
        },
        yAxis: {
            name: yLabel,
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