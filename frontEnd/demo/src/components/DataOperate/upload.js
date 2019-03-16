import React, {Component} from 'react';
import { Button, Input ,Upload,Icon} from 'antd'
import Papa from 'papaparse'
import { withPropsAPI } from '@src';
import store from '../../store';
import {UpL} from '../../store/actionCreate';
import styles from './inputStyle.less'
import {fillNa} from './DataProcess/fillNa';
// import { SeprtbyFeat } from './DataProcess/SeprtbyFeat';
var stat = new Array();
class Uploadfile extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    
    makeFile = ()=>{
      var allData = this.state.dataSet[0]
  
      var fieldNameArray = this.state.labelArray[0]
  
      var vectorlength = this.state.length[0]
      
      var newData = new Array();
  
      for(let indexOfRows = 0;indexOfRows < vectorlength; indexOfRows++){
        var row = new Array();
        for(let indexOfCols = 0; indexOfCols < fieldNameArray.length; indexOfCols++ ){
            row.push(allData[fieldNameArray[indexOfCols]][indexOfRows])
        }
        newData.push(row);
      }
      var csv = Papa.unparse({
        "fields": fieldNameArray,
        "data": newData
      });
  
      this.setState({
        finalData:csv
      })
      }
    readFile = (e)=>{
      var files = e.target.files;
      //var files = e; // FileList object
      console.log(files)
      var reader = new FileReader();
      const { propsAPI } = this.props;
      const { getSelected, update } = propsAPI;
      reader.readAsText(files[0],'gbk');
      reader.onload = function(e) {
        var fieldNameArray = [];
        let vectorLength;

        var results = Papa.parse(e.target.result,{header:true,dynamicTyping: true});
        fieldNameArray.push(results.meta.fields);
        vectorLength = results.data.length - 1
        var n = new Array();

        for(let indexOfCols = 0; indexOfCols < fieldNameArray[0].length; indexOfCols++){
            var colName = fieldNameArray[0][indexOfCols];
            var colValue = new Array();
            for (let indexOfRows = 0; indexOfRows < results.data.length - 1; indexOfRows++){
            colValue.push(results.data[indexOfRows][colName])
            }
            n.push({label:colName,value:colValue})
        }
        // console.log(n)
        // console.log(fieldNameArray)
        // console.log(vectorLength)
        
        // SeprtbyFeat();

        var temp = null;
        var max,min,media,total,tep;
        var c = 0;
        for(let i = 0;i < n.length; i++){   
          for(let j = 0; j < n[i].value.length;j++){
              if(n[i].value[j] != null && typeof(n[i].value[j]) == "number"){
                max=min=n[i].value[j];
                temp = 1;
                break;
              }
          }
          if(temp != 1){
            stat[c] = new Array();
            stat[c]['label'] = fieldNameArray[0][i];
            stat[c]['value'] = new Array();
            var w;
            for(let j = 0; j < n[i].value.length;j++){
              tep = 0;
              for(w =0; w < stat[c]['value'].length; w++){
                if(stat[c]['value'][w].name == n[i].value[j]){
                  tep = 1;
                  break;
                }
              }
              if(tep == 1){
                stat[c]['value'][w].count++;
              }
              else{
                stat[c]['value'][w] = new Array();
                stat[c]['value'][w]['name'] = n[i].value[j];
                stat[c]['value'][w]['count'] = 1;
              }
            }
            stat[c]['type'] = 'string';
            c++;
            temp = null;
            continue;
          }
          total=0;
          for(let j = 0; j < n[i].value.length;j++){
            if(n[i].value[j] > max) max = n[i].value[j];
            if(n[i].value[j] != null && n[i].value[j] < min) min = n[i].value[j];
            total+=n[i].value[j];
          }
          let med = new Array;
          for(let j = 0; j < n[i].value.length;j++){
            med[j] = n[i].value[j];
          }
          for(let j = 0; j < n[i].value.length;j++){
            for(let k = j+1; k < n[i].value.length;k++){
              if(med[j] > med[k]){
                tep = med[j];
                med[j] = med[k];
                med[k] = tep;
              }
            }
          }
          tep = Math.floor(n[i].value.length/2);
          stat[c] = new Array();
          stat[c]['label'] = fieldNameArray[0][i];
          stat[c]['max']  = max;
          stat[c]['min'] = min;
          stat[c]['average'] = total/n[i].value.length;
          stat[c]['media'] = med[tep];
          stat[c]['type'] = 'number';
          c++;
        }
        // console.log(stat)
          
          let m = fieldNameArray[0].map((item)=>{
            return [item, false];
          })
          n['stat'] = new Array();
          n['stat'] = stat;
          const values = {
              Dataset:n,
              labelArray:{public:m}, 
              length:vectorLength
          }
          console.log(values);
          const item = getSelected()[0];
          update(item, {...values});
        }
    }
    setTest = (allData,fieldNameArray,vectorLength) =>{
        this.setState({
          dataSet:allData,
          labelArray:fieldNameArray,
          length:vectorLength
        })
      }

    render(){
        return (
            <div>
                
                <input type="file" style={{position:"absolute" ,opacity:0}} onChange={(e)=>this.readFile(e)}></input>
                {/* <Button>本地文件</Button> */}
               
                  <Icon type="upload"/> 上传本地文件
                
                {/* <button className="btn btn-primary" style={{width:"150px",height:"30px"}}></button> */}
                
                {/* <label for="file">Choose a file</label> */}
                {/* <Button type="primary" onClick={()=>this.makeFile()}>makeFile</Button> */}
                 {/* <Upload onChange={(e)=>this.readFile(e)} >
                <Button>
                  <Icon type="upload" /> 上传本地数据
                </Button>
                </Upload> */}
            </div>
        );
    }
}

export default withPropsAPI(Uploadfile);
