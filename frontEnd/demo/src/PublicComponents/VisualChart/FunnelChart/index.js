import { getValueFromDataSet } from '../getValueFromDataSet';

export function createFunnelChart(myChart, props) {
    const { dataSet, chartStyle } = props;
    const { xLabel, yLabel, color } = chartStyle;
    if(xLabel === undefined || yLabel === undefined) return;
    var option = {
        title: {
            text: '漏斗图',
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        // toolbox: {
        //     feature: {
        //         dataView: { readOnly: false },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        legend: {
            data: getValueFromDataSet(xLabel, dataSet),
        },
        calculable: true,
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: getData(xLabel, yLabel, dataSet)
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