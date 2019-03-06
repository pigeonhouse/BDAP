import ReactEcharts from 'echarts-for-react';
import Select from './Select';
import { withPropsAPI } from '@src';

var React = require('react');
var createReactClass = require('create-react-class');
var ind = [];
var rex = {
    renew: function(indx){
        if(indx.hasOwnProperty('length')){}
        else{
            indx = ["-1", "-1", "-1"];
        }
        ind = indx;
        console.log("ind");
        console.log(ind);
        return indx;
    }
};
const LineMarkerEcharts = createReactClass({
    getOtion: function(props, index) {
        // console.log("index");
        // console.log(index);
        // for(let i in index){
        //     index[i] = Number(index[i]);
        // }
        // console.log(index);
        if(index[0] == undefined){v0 =[]}
        else{var v0 = props[index[0]][0].value;}
        if(index[1] == undefined){v1 = [], l1 = ""}
        else{var l1 = props[index[1]][0].label; var v1 = props[index[1]][0].value;}
        if(index[2] == undefined){v2 = [], l2 = ""}
        else{var l2 = props[index[2]][0].label;  var v2 = props[index[2]][0].value;}
        
        let option = {
            title: {
                text: '数据折线/柱状图',

            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[l1, l2]
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
                data: v0
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name:l1,
                    type:'line',
                    data:v1,
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
                    name:l2,
                    type:'line',
                    data:v2,
                    markPoint: {
                        data: [
                            {name: 'TotalMin', value: -2, xAxis: 1, yAxis: -1.5}
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
        const { propsAPI } = this.props;
        const { getSelected } = propsAPI;
        const item = getSelected()[0];
        let code = "<ReactEcharts " +
            "    option={this.getOtion()} " +
            // "    style={{height: '350px', width: '1000px'}}  " +
            "    className='react_for_echarts' />";
        return (    
                    <div>
                        <Select re = {rex} data = {item.model.Dataset} amount = {3}/>
                        <ReactEcharts
                            option={this.getOtion(item.model.Dataset, ind)}
                            // style={{height: '350px', width: '1000px'}}
                            className='react_for_echarts' /> 
                    </div>
        );
    }
});

export default withPropsAPI(LineMarkerEcharts);