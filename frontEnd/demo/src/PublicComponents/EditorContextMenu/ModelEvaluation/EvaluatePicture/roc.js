//获取Roc结果数据的函数

export function RocSet(myChart, props) {
    const { chartStyle, loading, titleText } = props;
    const { xLabel, yLabel, color } = chartStyle;
    var Rocdata = [];

    //测试用数据
    for (var i = 0; i < 1; i += 0.05) {
        Rocdata.push([i, Math.sqrt(i)]);
    }

    if (loading === true) {
        myChart.showLoading();
        return;
    } else {
        myChart.hideLoading();
    }

    if (xLabel === undefined || yLabel === undefined) return;

    var option = {
        xAxis: {
            name: xLabel,
            type: 'value',

        },
        yAxis: {
            name: yLabel,
            type: 'value'
        },
        series: [{
            data: Rocdata,
            type: 'line',
            smooth: true
        }],
        color
    };

    // 使用刚指定的配置项和数据显示图表。
    return myChart.setOption(option);
}