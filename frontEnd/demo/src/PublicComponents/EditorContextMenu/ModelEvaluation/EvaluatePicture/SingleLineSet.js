export function SingleLineSet(myChart, evaluationInfo, loading) {
    if (loading === true) {
        myChart.showLoading();
        return;
    } else {
        myChart.hideLoading();
    }

    const labels = Object.keys(evaluationInfo[0]);
    console.log(evaluationInfo)
    console.log(labels)

    var option = {
        xAxis: {
            name: labels[0],
            type: 'value',
            nameLocation: 'middle',
            nameGap: 20
        },
        yAxis: {
            name: labels[1],
            type: 'value',
            nameLocation: 'end',
            nameGap: 20
        },
        series: [{
            data: evaluationInfo,
            type: 'line',
            smooth: true
        }],
        color:"#509ee3",
    };

    return myChart.setOption(option);
}