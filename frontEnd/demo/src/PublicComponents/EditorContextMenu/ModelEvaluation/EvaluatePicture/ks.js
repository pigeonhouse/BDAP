export function KSSet(myChart, props){
    const { chartStyle, loading, titleText } = props;
    const { xLabel, yLabel, color } = chartStyle;
    var KSdata1=[];
    var KSdata2=[];
//测试用数据
for(var i=0;i<1;i+=0.05)
{
    KSdata1.push([i,Math.sqrt(i)]);
    KSdata2.push([i,i*i]);
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
            data:KSdata1,
            type: 'line',
            smooth: true,
            itemStyle:{
                normal:{
                    color:"#1eb2b5"
                }
        }
        },
        {
            data:KSdata2,
            type: 'line',
            smooth: true,
            itemStyle:{
                normal:{
                    color:"#9F79EE"
                }
        }
        }],
    };

    // 使用刚指定的配置项和数据显示图表。
    return myChart.setOption(option);
}