import ReactEcharts from 'echarts-for-react';

var React = require('react');
var createReactClass = require('create-react-class');

const DistributeScatter = createReactClass({

    getOtion: function(props) {
        console.log(props);
        const option = {
            title : {
                text: '数据散点分布图',
            },
            grid: {
                left: '3%',
                right: '7%',
                bottom: '3%',
                containLabel: true
            },
            tooltip : {
                // trigger: 'axis',
                
                showDelay : 0,
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName + ' :<br/>'
                        + params.value[0] +' '
                        + params.value[1] ;
                    }
                    else {
                        return params.seriesName + ' :<br/>'
                        + params.name + ' : '
                        + params.value;
                    }
                },
                axisPointer:{
                    show: true,
                    type : 'cross',
                    lineStyle: {
                        type : 'dashed',
                        width : 1
                    }
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {},
                    brush: {
                        type: ['rect', 'polygon', 'clear']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            brush: {
            },
            legend: {
                data: [props.col[1].dataIndex,props.col[2].dataIndex],
                left: 'center'
            },
            xAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale:true,
                    axisLabel : {
                        formatter: '{value}'
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series : [
                {
                    name: props.col[1].dataIndex,
                    type:'scatter',
                    data: [[161.2, 51.6],
                    ],
                    markArea: {
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: 'transparent',
                                borderWidth: 1,
                                borderType: 'dashed'
                            }
                        },
                        data: [[{
                            name: props.col[1].dataIndex,
                            xAxis: 'min',
                            yAxis: 'min'
                        }, {
                            xAxis: 'max',
                            yAxis: 'max'
                        }]]
                    },
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        lineStyle: {
                            normal: {
                                type: 'solid'
                            }
                        },
                        data : [
                            {type : 'average', name: '平均值'},
                            { xAxis: 160 }
                        ]
                    }
                },
                {
                    name: props.col[2].dataIndex,
                    type:'scatter',
                    data: [[174.0, 65.6], 
                    ],
                    markArea: {
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: 'transparent',
                                borderWidth: 1,
                                borderType: 'dashed'
                            }
                        },
                        data: [[{
                            name: props.col[2].dataIndex,
                            xAxis: 'min',
                            yAxis: 'min'
                        }, {
                            xAxis: 'max',
                            yAxis: 'max'
                        }]]
                    },
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        lineStyle: {
                            normal: {
                                type: 'solid'
                            }
                        },
                        data : [
                            {type : 'average', name: '平均值'},
                            { xAxis: 170 }
                        ]
                    }
                }
            ]
        };
        window.onresize = DistributeScatter.onresize;  
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

export default DistributeScatter;