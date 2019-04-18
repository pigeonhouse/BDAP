import ReactEcharts from 'echarts-for-react';
import Select from './Select';
import { withPropsAPI } from '@src';
import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ind = [];
var rex = {
    renew: function(indx){
        if(indx.hasOwnProperty('length')){}
        else{
            indx = [];
        }
        ind = indx;
        // console.log("ind");
        // console.log(ind);
        return indx;
    }
};
const LineMarkerEcharts = createReactClass({
    
    getOtion: function(props, index) {
        if(index[0] == undefined){v0 =[]}
        else{var v0 = props[index[0]].value;}
        if(index[1] == undefined){v1 = [], l1 = ""}
        else{var l1 = props[index[1]].label; var v1 = props[index[1]].value;}
        if(index[2] == undefined){v2 = [], l2 = ""}
        else{var l2 = props[index[2]].label;  var v2 = props[index[2]].value;}
        if(index[3] == undefined){v3 = [], l3 = ""}
        else{var l3 = props[index[3]].label;  var v3 = props[index[3]].value;}
        if(index[4] == undefined){v4 = [], l4 = ""}
        else{var l4 = props[index[4]].label;  var v4 = props[index[4]].value;}
        // console.log(props);

        var pi1 = [];
        var name1 = [];
        if(props.hasOwnProperty('length')){
            for(let k = 1; k < ind.length; k++){
                let s = 0;
                for(let p = 0; p < props[index[k]].value.length; p++){
                    s+= props[index[k]].value[p];
                }
                pi1.push({'name':props[index[k]].label,'value':s});
                name1.push(props[index[k]].label);
            }
        }
        var pieData = [pi1,name1];
        
        let option = {
            title: {
                text: '数据折线/柱状图',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[l1, l2, l3, l4]
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar', 'stack','tiled']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            grid: [
                {x: '6%', y: '15%', width: '50%', height: '75%'},
            ],
            xAxis:  {
                type: 'category',
                gridIndex: 0,
                boundaryGap: false,
                data: v0
            },
            yAxis: {
                type: 'value',
                gridIndex: 0,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name:l1,
                    type:'line',
                    data:v1,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
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
                    xAxisIndex: 0,
                    yAxisIndex: 0,
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
                    name:l3,
                    type:'line',
                    data:v3,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
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
                    name:l4,
                    type:'line',
                    data:v4,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
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
                    name: '饼状图',
                    type: 'pie',
                    radius: [10, 80],
                    center: ['75%', '50%'],
                    data: pieData[0]
                }
            ]
        };
        window.onresize = LineMarkerEcharts.onresize;  
        return option;
    },
    trans:function() {
        // this.props.trans();
        this.props.trans();
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
                        <Select trans={()=>this.trans()} re = {rex} data = {item.model.Dataset} amount_min ={2} amount_max = {5}/>
                        
                        <ReactEcharts
                            option={this.getOtion(item.model.Dataset, ind)}
                            // style={{height: '350px', width: '1000px'}}
                            className='react_for_echarts' /> 
                        {/* <button onClick = {this.getOtion(item.model.Dataset, ind)}>renew</button> */}
                    </div>
        );
    }
});

export default withPropsAPI(LineMarkerEcharts);