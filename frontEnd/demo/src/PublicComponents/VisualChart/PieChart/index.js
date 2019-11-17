import { getValueFromDataSet } from '../getValueFromDataSet';

export function createPieChart(myChart, props) {
    const { dataSet, chartStyle, loading,titleText } = props;
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
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: getValueFromDataSet(xLabel, dataSet)
        },
        series: [
            {
                name: xLabel,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: getData(xLabel, yLabel, dataSet),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        color
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function getData(xLabel, yLabel, dataSet) {
    let value = new Array();
    dataSet.map((data) => {
        value.push({
            value: data[yLabel],
            name: data[xLabel]
        })
    })

    return value;
}
