import React, {Component} from 'react';
import { Button, Input } from 'antd'
import Papa from 'papaparse'
import { withPropsAPI } from '@src';
import { dispatch } from 'd3';
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
    
        console.log(csv)
        this.setState({
          finalData:csv
        })
    
      }
    readFile = (e)=>{
        var files = e.target.files; // FileList object
        var reader = new FileReader();
        var fieldNameArray = new Array();
        var allData = new Array();
        var vectorLength = new Array();

        reader.readAsText(files[0],'gbk');
        reader.onload = function(e) {
        
            var results = Papa.parse(e.target.result,{header:true,dynamicTyping: true});
            fieldNameArray.push(results.meta.fields);
            vectorLength.push(results.data.length - 1)

            var n = new Array();
            //  console.log(results)
            for(let indexOfCols = 0; indexOfCols < fieldNameArray[0].length; indexOfCols++){
                var colName = fieldNameArray[0][indexOfCols];
                var colValue = new Array();
                for (let indexOfRows = 0; indexOfRows < results.data.length - 1; indexOfRows++){
                colValue.push(results.data[indexOfRows][colName])
                }
                n[colName] = colValue
        }
        allData.push(n)

        }
<<<<<<< HEAD
        this.setTest(allData,fieldNameArray,vectorLength);

        const { propsAPI } = this.props;
        const { getSelected } = propsAPI;
    
        const item = getSelected()[0];

        const action = UpL(item.id, allData,fieldNameArray,vectorLength);
        store.dispatch(action);
=======
        console.log(allData)
        this.setTest(allData,fieldNameArray,vectorLength)
        
>>>>>>> e559b7762cd0c3568be4fb25804cd25fc97ca81a
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
