import React from"react";
import {   RocSet     }from "./roc";
var echarts=require("echarts");
var loading=false;
var style={
	xLabel:"TP",
	yLabel:"FP",
	color:"#509ee3"
};
var myChart=null;
var titleText="title";
var prop={
	chartStyle:style,
	loading:loading,
	titleText:titleText
};
class EvaluatePicture extends React.Component{
    constructor(props){
        super();
        this.state = {
          visible:props.visible
        }
      }
    componentDidMount(){
        
        myChart=echarts.init(document.getElementById('pic'));
        return RocSet(myChart,prop);
    }
    
    componentDidUpdate(){
    if(this.props.visible==true)
    {
        myChart.clear();
        console.log(document.getElementById('pic'));
        myChart=echarts.init(document.getElementById('pic'));
        return RocSet(myChart,prop);
    }
    }
    render(){
        return(
            <div id="pic" style={{height:"200px",width:"200px"}}>
			</div>		
        )
    }
}
export default EvaluatePicture;