import React, {Component} from 'react';
import { Button, Input } from 'antd'
import Papa from 'papaparse'
import { withPropsAPI } from '@src';
import store from '../../store';
import {UpL} from '../../store/actionCreate';

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
        var files = e.target.files; // FileList object
        var reader = new FileReader();
        const { propsAPI } = this.props;
        const { getSelected, update, executeCommand } = propsAPI;
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
              n.push([{label:colName,value:colValue}])
          }
          let m = fieldNameArray[0].map((item)=>{
            return [item, false];
          })
          const values = {
              Dataset:n,
              labelArray:m, 
              length:vectorLength
          }
          const item = getSelected()[0];
          update(item, {...values});
        }
        // this.setTest(allData,fieldNameArray,vectorLength);

        // const action = UpL(item.id, allData,fieldNameArray,vectorLength);
        
        // store.dispatch(action);

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
                <Input
                    type="file" 
                    id='files' 
                    name='files[]' 
                    onChange={(e)=>this.readFile(e)} 
                    multiple
                >
                </Input>
                <Button type="primary" onClick={()=>this.makeFile()}>makeFile</Button>
            </div>
        );
    }
}

export default withPropsAPI(Uploadfile);
