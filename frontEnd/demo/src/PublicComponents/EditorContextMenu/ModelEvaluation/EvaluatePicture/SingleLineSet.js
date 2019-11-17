export function SingleLineSet(myChart, evaluationInfo, loading) {
    if (loading === true) {
        myChart.showLoading();
        return;
    } else {
        myChart.hideLoading();
    }

    var option = {
        xAxis: {
            name: evaluationInfo.xlabel,
            type: 'value',
            nameLocation: 'middle',
            nameGap: 20,
        },
        yAxis: {
            name: evaluationInfo.ylabel,
            type: 'value',
            nameLocation: 'end',
            nameGap: 20
        },
        series: [{
            data: evaluationInfo.value,
            type: 'line',
            smooth: true,
            symbol: 'none'
        }],
        color:"#509ee3",
    };

    return myChart.setOption(option);
}