//获取Roc结果数据的函数



export function RocSet(myChart, props){
    const {  loading, data } = props;
    var style={
        xLabel:"FP",
        yLabel:"TP",
        color:"#509ee3"
    };
    const { xLabel, yLabel, color } = style;
    var Rocdata=[];
//测试用数据
data.map(
    r=>{
        Rocdata.push([r.FPR,r.TPR])
    }
)
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
            nameLocation:'middle',
            nameGap:20
        },
        yAxis: {
            name: yLabel,
            type: 'value',
            nameLocation:'end',
            nameGap:20
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