import ReactEcharts from 'echarts-for-react';

var React = require('react');
var createReactClass = require('create-react-class');

const LineMarkerEcharts = createReactClass({
    getOtion: function(props) {
        // console.log(props.id);
        console.log(props.d1);
        console.log(props.d2);
        const option = {
            title: {
                text: '数据折线/柱状图',
                // subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[props.col[1].dataIndex,props.col[2].dataIndex]
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: props.id
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name:props.col[1].dataIndex,
                    type:'line',
                    data:props.d1,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:props.col[2].dataIndex,
                    type:'line',
                    data:props.d2,
                    markPoint: {
                        data: [
                            {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                }
            ]
        };
        window.onresize = LineMarkerEcharts.onresize;  
        return option;
    },

    render: function() {
        let code = "<ReactEcharts " +
            "    option={this.getOtion()} " +
            // "    style={{height: '350px', width: '1000px'}}  " +
            "    className='react_for_echarts' />";
        return (
                    <ReactEcharts
                        option={this.getOtion(this.props)}
                        // style={{height: '350px', width: '1000px'}}
                        className='react_for_echarts' />  
        );
    }
});

export default LineMarkerEcharts;